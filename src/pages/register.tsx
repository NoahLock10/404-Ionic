import './register.css';
import { registerUser } from './AWSfunctions';
import { getUsers } from './AWSfunctions';
import { useRef, useState, useEffect, MouseEvent} from 'react';
import Home from './home';
import { Link } from 'react-router-dom';
import { stringify } from 'querystring';

const Register: React.FC = () => {

    let users : Promise<any>;

    interface ApiDataUserInfo {
      firstName: string;
      lastName: string;
      password: string;
      username: string;
    }

    const [userData, setUserData] = useState<ApiDataUserInfo[]>([]);
    const [usernameInput, setUsername] = useState("");
    const [passwordInput, setPassword] = useState("");
    const [fnameInput, setFname] = useState("");
    const [lnameInput, setLname] = useState("");

    useEffect(() => {
        console.log('use effect is triggered.')
        users = getUsers();
        console.log(users);
        users.then(data => setUserData(data));
    }, [])

    let idNum = 0;

    function resetUsers() {
        users = getUsers();
        users.then(data => setUserData(data));
        idNum = Number(userData.length);
    }

    function registerUserInfo(e: any){
        e.preventDefault();
        resetUsers();
        console.log(idNum); //change idNum passed on database list, right now lagging behind
        registerUser({
            id: idNum,
            uname: usernameInput,
            pword: passwordInput,
            fname: fnameInput,
            lname: lnameInput
        });
    }

    return(
        <>
        <div id='container-login'>
            <div id='reg'>
                <form id='register'>
                    <h2 id='loginTitle'>Register</h2>
                    <input type='text' id='username' placeholder='Username' onInput={(e: any) => setUsername(e.target.value)}></input><br></br><br></br>
                    <input type='password' id='password' placeholder='Password' onInput={(e: any) => setPassword(e.target.value)}></input><br></br><br></br>
                    <input type='text' id='fname' placeholder='First Name' onInput={(e: any) => setFname(e.target.value)}></input><br></br><br></br>
                    <input type='text' id='lname' placeholder='Last Name' onInput={(e: any) => setLname(e.target.value)}></input><br></br><br></br>
                    <button id='loginButton' onClick={(e) => registerUserInfo(e)}>Submit</button> <br></br>
                    <Link to="/page/loginPersonal" className="btn btn-primary">Already Registered?</Link>
                </form>
            </div>
        </div>  
        </>
    );
};

export default Register;