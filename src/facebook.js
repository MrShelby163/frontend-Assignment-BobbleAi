import React ,{ Component } from "react";
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component{
    state = {
        isLoggedIn : false,
        userId:"",
        name:"",
        email:"",
        picture:""
    }
    responseFacebook = response => {
        console.log(response);
    }
    ComponentClicked = ()=> console.log("clicked");

    render(){
        let fbContent;
        if(this.state.isLoggedIn){

        }else{
            fbContent =(<FacebookLogin
            appId="1088597931155576"
            autoLoad = {true}
            fields="name,email,picture"
            onclick={this.ComponentClicked}
            callback={this.responseFacebook}
            />
            );
        }
        return(
            <div>
                {fbContent}
            </div>
        );


        }
}