import React, { useEffect, useState } from 'react'

import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import { WrapperNormalText, WrapperSignInContainer } from "./style";
import InputPasswordComponent from "../../components/InputFormComponent/InputPasswordComponent";
import { useNavigate } from 'react-router-dom';
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
const dateFormat = 'YYYY-MM-DD';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker } from 'antd';
import { validateSignUpForm } from '../../utils/FormValidation';
dayjs.extend(customParseFormat);
import * as message from '../../components/MessageComponent/Message'

const SignUpPage = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState(dayjs('2019-09-03', dateFormat));
  const [errMessage, setErrMessage] = useState('');
  const [isErr, setIsError] = useState(false);

  const mutation = useMutationHook(
    data => UserService.signUpUser(data)
  )
  console.log('mutation: ', mutation);
  
  const {data, isLoading, isError, isSuccess} = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleNavigateSignIn();
    } else if (isError || isErr) {
      message.error();
    }
  }, [isSuccess, isError, isErr]);


  const handleNavigateSignIn = () => {
    navigate("/sign-in");  
  }

  const handleOnChangeEmail = (value) => {
    setEmail(value.target.value);
  } 
  const handleOnChangeFullName = (value) => {
    setFullName(value.target.value);
  } 
  const handleOnChangePhone = (value) => {
    setPhone(value.target.value);
  } 
  const handleOnChangeBirthday = (value) => {
    console.log(value);
    if (!value) { 
      // setBirthday(dayjs('2019-09-03', dateFormat)); 
      setBirthday(null);
      return;
    }
    setBirthday(value);
  } 

  const handleOnChangePassword = (value) => {
    setPassword(value.target.value);
  }

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmedPassword(value.target.value);
  }

  const handleSignUp = () => {
    const validationMessage = validateSignUpForm(email, fullName, phone, birthday, password, confirmedPassword);

    if (validationMessage !== null) {
      setIsError(true);
      console.log(validationMessage);
      setErrMessage(validationMessage);
      return
    }
    try {
      setIsError(false);
      mutation.mutate({email, fullName, birthday, password, phone})
    } catch (error) {
      setErrMessage('An error occurred during signup');
    }
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
        <InputFormComponent placeholder={"Your Full Name"} value={fullName} onChange={handleOnChangeFullName}/>
        <InputFormComponent placeholder={"abc123@gmail.com"} value={email} onChange={handleOnChangeEmail}/>
        <InputFormComponent placeholder={"Your phone number"} value={phone} onChange={handleOnChangePhone}/>
        <DatePicker
          defaultValue={dayjs('2019-09-03', dateFormat)}
          minDate={dayjs('1900-06-01', dateFormat)}
          maxDate={dayjs()}
          style={{
            marginBottom: "10px",
          }}
          onChange={handleOnChangeBirthday}
        />
        <InputPasswordComponent placeholder={"Password"} value={password} onChange={handleOnChangePassword}/>
        <InputPasswordComponent placeholder={"Confirm your password"} value={confirmedPassword} onChange={handleOnChangeConfirmPassword}/>
  
        {(isErr || isError) && <span style={{color: "red", fontSize: "15px", fontStyle: "italic"}}>{errMessage}</span>}
        
        <LoadingComponent isLoading={isLoading}>
          <ButtonComponent
            disabled={!email.length || !password.length || !confirmedPassword.length}
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
            textButton={"Sign Up"}
            onClick={handleSignUp}
            ></ButtonComponent>
          </LoadingComponent>
        {/* <WrapperNormalText>Forgot password</WrapperNormalText> */}
        <WrapperNormalText onClick={handleNavigateSignIn} style={{cursor: "pointer"}}>Sign in with your created account</WrapperNormalText>
      </WrapperSignInContainer>
    </div>
  );
}

export default SignUpPage