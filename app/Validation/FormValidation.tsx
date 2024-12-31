import * as Yup from "yup";

export const FormValidation = Yup.object({
  firstName: Yup.string()
    .min(3, "Must be 3 Characters")
    .max(20, "Too Long")
    .required("Please Enter First Name"),
  lastName: Yup.string()
    .min(3, "Must be 3 Characters")
    .max(20, "Too Long")
    .required("Please Enter Last Name"),
  email: Yup.string()
    .email("Please Enter a valid email")
    .required("Please Enter Email"),
  // remember: Yup.bool().oneOf(
  //   [true],
  //   "You need to accept the terms and conditions"
  // ),
  password: Yup.string().min(8).required("Please Enter Password"),
});

export const LognFormValidation = Yup.object({
  email: Yup.string()
    .email("Please Enter a valid email")
    .required("Please Enter Email"),
  password: Yup.string().min(8).required("Please Enter Password"),
});
