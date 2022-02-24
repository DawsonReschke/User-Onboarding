import React from "react";
import User from "./User"
const UserList = (props)=>{
    
    return(
        <div>
            {props.userList.map(user=><User name={user.name} email={user.email} />)}
        </div>
    )
}

export default UserList; 