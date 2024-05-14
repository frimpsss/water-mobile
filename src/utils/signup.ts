import * as Y from "yup";

export const signupvalidator = Y.object().shape({
  email: Y.string().email("Invalid email").required("Email is required"),
});

export const signinvalidator = Y.object().shape({
  email: Y.string().email("Invalid email").required("Email is required"),
});
