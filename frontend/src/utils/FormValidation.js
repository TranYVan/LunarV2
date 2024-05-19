import validator from "validator";

export const validateSignUpForm = (
  email,
  fullName,
  phone,
  birthday,
  password,
  confirmPassword
) => {
  if (!validator.isEmail(email)) {
    return "Invalid Email";
  }
  if (!validator.isMobilePhone(phone, "vi-VN")) {
    return "Invalid Mobile Phone Number";
  }
  if (!validator.equals(password, confirmPassword)) {
    return "Password and Confirm Password must be equal";
  }
  return null;
};

export const validateProfileForm = (email, fullName, phone, birthday) => {
  if (!validator.isMobilePhone(phone, "vi-VN")) {
    return "Invalid Mobile Phone Number";
  }
  return null;
};
