import React, { useEffect, useState } from "react";
import {
  WrapperHeader,
  WrapperContentProfle,
  WrapperLabel,
  WrapperInput,
  WrapperEditIcon,
  WrapperUploadImage,
  WrapperUploadFile,
} from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
const dateFormat = "YYYY-MM-DD";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, DatePicker, Upload } from "antd";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { message } from "antd";
import { validateProfileForm } from "../../utils/FormValidation";
import { updateUser } from "../../redux/slides/usersSlide";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getBase64 } from "../../utils/FileUtils";

dayjs.extend(customParseFormat);

const ProfilePage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [birthday, setBirthday] = useState(user.birthday);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isFrontendError, setIsFrontendError] = useState(false);
  const dispatch = useDispatch();

  const mutation = useMutationHook((payload) =>
    UserService.updateUser(payload.id, payload.data)
  );

  const { data, isLoading, isError, isSuccess } = mutation;
  console.log("mutation", mutation);

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setBirthday(user?.birthday);
    setAvatar(user?.avatar);
  }, [user]);

  const handleGetDetailsUser = async (email, token) => {
    const res = await UserService.getUserProfile(email, token);

    dispatch(updateUser({ ...res, token }));
  };

  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Success",
      });
      handleGetDetailsUser(user?.email, user?.access_token);
    } else if (isError || isFrontendError) {
      messageApi.error({
        type: "error",
        content: "Try again",
      });
    }
  }, [isSuccess, isError, isFrontendError]);

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };
  const handleOnChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleOnChangeBirthday = (value) => {
    if (!value) {
      setBirthday(null);
      return;
    }
    setBirthday(value.format(dateFormat));
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);

  };

  const handleUpdate = async () => {
    const validation = validateProfileForm(email, name, phone, birthday);
    if (validation !== null) {
      setIsFrontendError(true);
      return;
    }
    setIsFrontendError(false);

    mutation.mutate({
      id: user?.id,
      data: {
        email: email,
        fullName: name,
        phone: phone,
        birthday: birthday,
        avatar:
          avatar === undefined || avatar == null || avatar.length == 0
            ? null
            : avatar,
      },
    });
  };

  return (
    <>
      {contextHolder}
      <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
        <WrapperHeader>YOUR PROFILE</WrapperHeader>
        <LoadingComponent isLoading={isLoading}>
          <WrapperContentProfle>
            <WrapperInput>
              <WrapperLabel htmlFor="email">Email</WrapperLabel>

              <InputFormComponent
                value={email}
                style={{
                  width: "450px",
                }}
                id="email"
                onChange={handleOnChangeEmail}
              />
              <WrapperEditIcon onClick={handleUpdate} />
            </WrapperInput>
            <WrapperInput>
              <WrapperLabel htmlFor="name">Full Name</WrapperLabel>
              <InputFormComponent
                value={name}
                style={{
                  width: "450px",
                }}
                id="name"
                onChange={handleOnChangeName}
              />
              <WrapperEditIcon onClick={handleUpdate} />
            </WrapperInput>
            <WrapperInput>
              <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
              <InputFormComponent
                value={phone}
                style={{
                  width: "450px",
                }}
                id="phone"
                onChange={handleOnChangePhone}
              />
              <WrapperEditIcon onClick={handleUpdate} />
            </WrapperInput>
            <WrapperInput>
              <WrapperLabel htmlFor="birthday">Birthday</WrapperLabel>
              <DatePicker
                id="birthday"
                value={dayjs(birthday, dateFormat)}
                minDate={dayjs("1900-06-01", dateFormat)}
                maxDate={dayjs()}
                style={{
                  marginBottom: "10px",
                }}
                onChange={handleOnChangeBirthday}
              />
              <WrapperEditIcon onClick={handleUpdate} />
            </WrapperInput>
            <WrapperInput>
              <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
              <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                <Button>Select File</Button>
                {avatar && (
                  <img
                    src={avatar}
                    id="avatar"
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>

              <WrapperEditIcon onClick={handleUpdate} />
            </WrapperInput>
          </WrapperContentProfle>
        </LoadingComponent>
      </div>
    </>
  );
};

export default ProfilePage;
