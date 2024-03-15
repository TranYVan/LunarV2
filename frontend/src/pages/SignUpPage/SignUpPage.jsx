import React from 'react'

import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import { WrapperNormalText, WrapperSignInContainer } from "./style";
import { Input } from "antd";
import InputPasswordComponent from "../../components/InputFormComponent/InputPasswordComponent";

const SignUpPage = () => {
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
        <InputFormComponent placeholder={"Username"} />
        <InputPasswordComponent placeholder={"Password"} />
        <InputPasswordComponent placeholder={"Confirm your password"} />
        <ButtonComponent
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
        {/* <WrapperNormalText>Forgot password</WrapperNormalText> */}
        <WrapperNormalText>Sign in with your signed in account</WrapperNormalText>
      </WrapperSignInContainer>
    </div>
  );
}

export default SignUpPage