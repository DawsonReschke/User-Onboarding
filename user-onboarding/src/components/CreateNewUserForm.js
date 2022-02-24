import { useEffect, useState } from "react"
import {ErrorMessages,ContainerDiv} from "../StyledComponents/StyledDiv"
import {ErrorMessage,EmptySpace,TosError} from "../StyledComponents/StyledP"
/*
- [X] Name
- [X] Email
- [X] Password
- [X] Terms of Service (checkbox)
- [X] A Submit button to send our form data to the server.
*/


const defaultFriendForm = {name:'',email:'',password:'',tos:false}
const defaultFriendErrors={name:'',email:'',password:'',tos:''}

const isFilled = (obj)=>{
    for(let i of Object.keys(obj)){
        if(obj[i]) return true; 
    }
    return false; 
}

const NewUserForm = (props)=>{
    const [newUser, setUser] = useState(defaultFriendForm);
    const [formErrors, setFormErrors] = useState({}); 
    const [addingUser,setAddingUser] = useState(false); 
    useEffect(()=>{
        if(addingUser){
            if(isFilled(formErrors)){
                setAddingUser(false); 
            }else{
                props.addUser(newUser); 
                setUser(defaultFriendForm)
            }
        }else{
            setAddingUser(false); 
        }
    },[formErrors])

    const updateUser = (evt) => {
        let val = evt.target.type ==='checkbox' ? evt.target.checked : evt.target.value
        setUser({...newUser, [evt.target.name]:val})
        console.log(newUser)
    }
    const updateFormErrors=(err)=>{
        setFormErrors(err)
    }

    

    const onChange = (evt) => {
        updateUser(evt);
    }

    return(
        <ContainerDiv>
            <ErrorMessages>
            {formErrors['name'] ? <ErrorMessage>{formErrors['name']}</ErrorMessage>:<EmptySpace>0</EmptySpace>}
            {formErrors['email'] ? <ErrorMessage>{formErrors['email']}</ErrorMessage>:<EmptySpace>0</EmptySpace>}
            {formErrors['password'] ? <ErrorMessage>{formErrors['password']}</ErrorMessage>:<EmptySpace>0</EmptySpace>}
            </ErrorMessages>
            <form>
                <label for="name">
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={newUser.name}
                        onChange={(evt)=>{updateUser(evt)}}
                    />
                </label>
                <br/>
                <label for="email">
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={newUser.email}
                        onChange={(evt)=>{updateUser(evt)}}
                    />
                </label>
                <br/>
                <label for="password">
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={newUser.password}
                        onChange={(evt)=>{updateUser(evt)}}
                    />
                </label>
                <br/>
                <p>{formErrors['tos'] && <TosError>Must agree to Terms of service</TosError>} I have read the 
                    <a onClick={(evt)=>evt.preventDefault()} href="">terms of service</a>
                    <input
                        type="checkbox"
                        name="tos"
                        checked={newUser.tos}
                        onChange={(evt)=>{updateUser(evt)}}
                    />
                    </p>
                    <input
                        type="submit"
                        value="Create New Friend"
                        onClick={(evt)=>{
                            setAddingUser(true); 
                            evt.preventDefault();
                            console.log('checking user',newUser)
                            // check if there are errors and render them if so, otherwise post create a new user
                            updateFormErrors(props.validateUserForm(newUser))
                            console.log(formErrors)
                        }}
                />
            </form>
        </ContainerDiv>
    )
}

export default NewUserForm