import React from "react";
import {FlexDiv , SplitDiv} from "../StyledComponents/StyledDiv"

const User = (props)=>{
    return(
        <FlexDiv>
            <SplitDiv>{props.name}</SplitDiv>
            <SplitDiv>{props.email}</SplitDiv>
        </FlexDiv>
    )
}

export default User