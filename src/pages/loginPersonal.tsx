import './login.css';

const Login: React.FC = () => {
    return(
        <>
        <div id='container-login'>
            <div id='reg'>
                <form action='login' method='POST' id='register'>
                    <h2 id='loginTitle'>Log In</h2>
                    <input type='text' id='username' name='username' placeholder='Username'></input><br></br><br></br>
                    <input type='text' id='password' name='pass' placeholder='Password'></input><br></br><br></br>
                    <input type='submit' id='loginButton' value='Submit'></input>
                    <p id="messageRegister">Not registered? <a href="/register.html">Create an account</a></p>
                </form>
            </div>
        </div>  
        </>
    );
};

export default Login;