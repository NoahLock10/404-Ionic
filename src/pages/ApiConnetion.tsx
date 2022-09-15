import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class DbDataPageStack extends cdk.Stack {
  public readonly handler!: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dbDataTable = new dynamodb.Table(this, 'Team12TestDyno', {
      partitionKey: { name: 'UserID', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const myLambda = new lambda.Function(this, 'ASWfunctions', {
      code: lambda.Code.fromAsset('src/lambda'),
      handler: 'awsHandler.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      environment: {
        TABLE_NAME: dbDataTable.tableName,
      },
    });

    dbDataTable.grantReadWriteData(myLambda);

    new apigateway.LambdaRestApi(this, 'DragonsEndpoint', {
      handler: myLambda,
    });
  }
}