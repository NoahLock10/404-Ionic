import './login.css';
import { getTableData } from './AWSfunctions';
import { getUsers } from './AWSfunctions';
import { useRef, useState, useEffect, MouseEvent } from 'react';
import Home from './home';
import { Link, Redirect} from 'react-router-dom';

export var someID: string;

const Login: React.FC = () => {

    let users : Promise<any>;

    interface ApiDataUserInfo {
      userID: number;
      firstName: string;
      lastName: string;
      password: string;
      username: string;
    } 

    const [userData, setUserData] = useState<ApiDataUserInfo[]>([]);
    const [usernameInput, setUsername] = useState("");
    const [passwordInput, setPassword] = useState("");
    const [goHome, setgoHome] = useState(false);
    const [submitBtn, setSubmitBtn] = useState(true);


    useEffect(() => {
        console.log('use effect is triggered.')
        users = getUsers();
        console.log(users);
        users.then(data => setUserData(data));
    }, [])

    async function checkUser(e: any){
        e.preventDefault();
        for(let i=0; i<userData.length; i++){
            if(userData[i].username === usernameInput && userData[i].password === passwordInput){
                console.log("Logged IN");
                someID = userData[i].username;
                console.log("UserID: ", someID)
                setgoHome(true);
                setSubmitBtn(false);
            }
        } 
    }

    return(
        <>
        <div id='container-login'>
            <div id='reg'>
                <form id='register'>
                    <h2 id='loginTitle'>Log In</h2>
                    <input type='text' id='username' placeholder='Username' onInput={(e: any) => setUsername(e.target.value)}></input><br></br><br></br>
                    <input type='password' id='password' placeholder='Password' onInput={(e: any) => setPassword(e.target.value)}></input><br></br><br></br>
                    {submitBtn ? <><button type='submit' id='loginButton' onClick={(e) => checkUser(e)}>Submit</button> <br></br></> : null}
                    {goHome ? <LoggedIn/> : null}
                    <br></br>
                    <Link to="/page/register" className="btn btn-primary">Not Registered?</Link>
                </form>
            </div>
        </div>  
        </>
    );
};

const LoggedIn: React.FC = () => {
    const linkStyle = {
        color: 'white',
        textDecoration: 'none'
    };

    return(
        <button id='loginButton'>
        <Link to="/page/home" style={linkStyle}>Logged In Click Here!</Link>
        </button>
    )
}

export default Login;


