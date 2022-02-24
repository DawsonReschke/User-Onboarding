import './App.css';
import axios from 'axios'
import UserForm from './components/CreateNewUserForm'
import UserList from './components/UserList';
import validate from './validation/userFormSchema'
import { useEffect, useState } from 'react';

const API_URL = 'https://reqres.in/api/users'

function App() {
  const [userArray,setUserArray] = useState([]); 

  useEffect(()=>{console.log(userArray)},[userArray])

  const postUser = (user) =>{
    axios.post(API_URL,user).then(res=>setUserArray([...userArray,res.data]))
  }



  return (
    <div className="App">
      <UserForm addUser={postUser} validateUserForm={validate}/>
      
      {userArray && <UserList userList={userArray} />}

    </div>
  );
}

export default App;
