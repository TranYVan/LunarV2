import React, { useState } from "react";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import { WrapperNormalText, WrapperSignInContainer } from "./style";
import InputPasswordComponent from "../../components/InputFormComponent/InputPasswordComponent";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";


const SignInPage = () => {
  const navigate = useNavigate();

  const handleNavigateSignUp = () =>{
    navigate("/sign-up");
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeEmail = (value) => {
    setEmail(value.target.value);
  }

  const handleOnChangePassword = (value) => {
    setPassword(value.target.value);
  }
  const mutation = useMutationHook(
    data => UserService.signInUser(data)
  )
  console.log('mutation: ', mutation);
  
  const {data, isLoading, isError} = mutation;

  const handleSignIn = () => {

    console.log(email, password);
    mutation.mutate({
      email,
      password
    });
    
  }


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        height: "100vh",
      }}>
      <WrapperSignInContainer
        style={{
          width: "800px",
          height: "450px",
          borderRadius: "6px",
          background: "#F5F7F8",
        }}>
        <h4
          style={{
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "1px",
            marginBottom: "10px",
            marginTop: "0",
            textTransform: "uppercase",
          }}>
          Hello World
        </h4>
        <p
          style={{
            fontSize: "14px",
            color: "rgb(85, 85, 85)",
            marginBottom: "30px",
          }}>
          Sign In and Sign Up New Account
        </p>
        <InputFormComponent placeholder={"abc@gmail.com"} value={email} onChange={handleOnChangeEmail}/>
        <InputPasswordComponent placeholder={"Password"} value={password} onChange={handleOnChangePassword}/>
        {isError && <span style={{color: "red", fontSize: "15px", fontStyle: "italic"}}>Wrong Email or Password</span>}
        <LoadingComponent isLoading={isLoading}>
          <ButtonComponent
            disabled={!email.length || !password.length}
            onClick={handleSignIn}
            bordered={"false"}
            size={40}
            styleButton={{
              backgroundColor: "rgb(37, 92, 69)",
              borderRadius: "0",
              width: "220px",
              height: "50px",
              marginBottom: "5px",
            }}
            styleTextButton={{
              color: "#F5F7F8",
              fontWeight: "700",
              fontSize: "17px",
            }}
            textButton={"Sign In"}></ButtonComponent>
          </LoadingComponent>
        <WrapperNormalText>Forgot password</WrapperNormalText>

        <WrapperNormalText onClick={handleNavigateSignUp} style={{cursor: "pointer"}}>Sign up new account</WrapperNormalText>
      </WrapperSignInContainer>
    </div>
  );
};

export default SignInPage;
