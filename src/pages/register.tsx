import './register.css';
import { getTableData } from './AWSfunctions';
import { getUsers } from './AWSfunctions';
import { useRef, useState, useEffect} from 'react';
import Home from './home';
import { Link } from 'react-router-dom';


const Register: React.FC = () => {

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

    useEffect(() => {
        console.log('use effect is triggered.')
        users = getUsers();
        console.log(users);
        users.then(data => setUserData(data));
    }, [])

    async function checkUser(){
        for(let i=0; i<userData.length; i++){
            if(userData[i].username === usernameInput && userData[i].password === passwordInput){
                return true;
            }
        } 
    }

    return(
        <>
        <div id='container-login'>
            <div id='reg'>
                <form id='register'>
                    <h2 id='loginTitle'>Register</h2>
                    <input type='text' id='username' placeholder='Username' onInput={(e: any) => setUsername(e.target.value)}></input><br></br><br></br>
                    <input type='password' id='password' placeholder='Password' onInput={(e: any) => setPassword(e.target.value)}></input><br></br><br></br>
                    <button type='submit' id='loginButton' value='Submit' onClick={() => checkUser()}>Submit</button> <br></br>
                    <Link to="/loginPersonal" className="btn btn-primary">Already Registered?</Link>
                </form>
            </div>
        </div>  
        </>
    );
};

export default Register;