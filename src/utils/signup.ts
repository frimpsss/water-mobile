import * as Y from "yup";

export const signupvalidator = Y.object().shape({
  email: Y.string().email("Invalid email").required("Email is required"),
  password: Y.string().required("Password is required"),
  name: Y.string().required("Name is required"),
  phoneNumber: Y.string().required("Phone number is required"),
  confirmPassword: Y.string()
    .oneOf([Y.ref("password")], "Passwords dont match")
    .required("Password is required"),
});

export const signinvalidator = Y.object().shape({
  email: Y.string().email("Invalid email").required("Email is required"),
  password: Y.string().required("Password is required"),
});
