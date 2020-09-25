import React from "react";
import './app.scss';
import Facebook from "./facebook";


class RegisterBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {    //state for user auth
        username: "",
        email: "",
        password: "",
        errors: [],
        pwdState: null,
        display:""
      };
    }
    
    showValidationErr(elm, msg) {
      this.setState((prevState) => ({
        errors: [
          ...prevState.errors, {
            elm,
            msg
          }
        ]
      }));
    }
  
    clearValidationErr(elm) {
      this.setState((prevState) => {
        let newArr = [];
        for (let err of prevState.errors) {
          if (elm != err.elm) {
            newArr.push(err);
          }
        }
        return {errors: newArr};
      });
    }
    //declaration of value in respective fields
    onfirstnameChange(e) {
      this.setState({firstname: e.target.value});
      this.clearValidationErr("firstname");
    }
    onlastnameChange(e) {
      this.setState({lastname: e.target.value});
      this.clearValidationErr("lastname");
    }
    
  
    onEmailChange(e) {
      this.setState({email: e.target.value});
      this.clearValidationErr("email");
    }
    //password types of declaring strength
    onPasswordChange(e) {
      this.setState({password: e.target.value});
      this.clearValidationErr("password");
  
      this.setState({pwdState: "weak"});
      if (e.target.value.length > 8) {
        this.setState({pwdState: "medium"});
      } else if (e.target.value.length > 12) {
        this.setState({pwdState: "strong"});
      }
  
    }
  //send post request to api for further
    openPopup(e) {
      let info={
        fn:this.firstname,
        ln:this.lastname,
        email:this.email,
        password:this.password
  
      };
      fetch("https://reqres.in",{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(info)
      }).then(r=>r.json()).then(res=>{
        if(res){
          this.setState({display:"New Id Created"});
        }
      })
    }
  
    submitRegister(e) {
  
      console.log(this.state);
  
      if (this.state.firstname == "") {
        this.showValidationErr("firstname", "firstname Cannot be empty!");
      }
      if (this.state.lastname == "") {
        this.showValidationErr("lastname", "lastname Cannot be empty!");
      }
      if (this.state.email == "") {
        this.showValidationErr("email", "Email Cannot be empty!");
      }
      if (this.state.password == "") {
        this.showValidationErr("password", "Password Cannot be empty!");
      }
  
    }
  
    render() {
  
      let firstnameErr = null,
          lastnameErr =null,
        passwordErr = null,
        emailErr = null;
  
      for (let err of this.state.errors) {
        if (err.elm == "firstname") {
          firstnameErr = err.msg;
        }
        if (err.elm == "lastname") {
          firstnameErr = err.msg;
        }
        if (err.elm == "password") {
          passwordErr = err.msg;
        }
        if (err.elm == "email") {
          emailErr = err.msg;
        }
      }
  
      let pwdWeak = false,
        pwdMedium = false,
        pwdStrong = false;
      //password state assignment
      if (this.state.pwdState == "weak") {
        pwdWeak = true;
      } else if (this.state.pwdState == "medium") {
        pwdWeak = true;
        pwdMedium = true;
      } else if (this.state.pwdState == "strong") {
        pwdWeak = true;
        pwdMedium = true;
        pwdStrong = true;
      }
  
      return (
        <div className="inner-container">
          <div style={{textAlign: 'center'}}>SIGN UP</div>
          <div className="header">
            Create your account
            <span><Facebook/></span>
                
        </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="firstname"></label>
              <input
                type="text"
                name="firstname"
                className="login-input"
                placeholder="Firstname"
                onChange={this
                .onfirstnameChange
                .bind(this)}/>
              <small className="danger-error">{firstnameErr
                  ? firstnameErr
                  : ""}</small>
            </div>
            <div className="input-group">
              <label htmlFor="lastname"></label>
            <input
                type="text"
                name="lastname"
                className="login-input"
                placeholder="Lastname"
                onChange={this
                .onlastnameChange
                .bind(this)}/>
              <small className="danger-error">{lastnameErr
                  ? lastnameErr
                  : ""}</small>
            </div>
  
            <div className="input-group">
              <label htmlFor="email"></label>
              <input
                type="text"
                name="email"
                className="login-input"
                placeholder="Email"
                onChange={this
                .onEmailChange
                .bind(this)}/>
              <small className="danger-error">{emailErr
                  ? emailErr
                  : ""}</small>
            </div>
  
            <div className="input-group">
              <label htmlFor="password"></label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                onChange={this
                .onPasswordChange
                .bind(this)}/>
              <small className="danger-error">{passwordErr
                  ? passwordErr
                  : ""}</small>
  
              {this.state.password && <div className="password-state">
                <div
                  className={"pwd pwd-weak " + (pwdWeak
                  ? "show"
                  : "")}></div>
                <div
                  className={"pwd pwd-medium " + (pwdMedium
                  ? "show"
                  : "")}></div>
                <div
                  className={"pwd pwd-strong " + (pwdStrong
                  ? "show"
                  : "")}></div>
              </div>}
  
            </div>
  
            <button
              type="button"
              className="login-btn"
              onHover={this
              .openPopup
              .bind(this)}
              onClick={this
              .openPopup
              .bind(this)}>SIGN UP</button>
          <p>{this.state.display}</p>
          </div>
        </div>
  
      );
  
    }
  
  }

  export default RegisterBox;