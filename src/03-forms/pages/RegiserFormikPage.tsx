import { Form, Formik } from "formik";
import { MyTextInput } from "../components";
import * as Yup from "yup";

import "../styles/styles.css";

export const RegisterFormikPage = () => {
  return (
    <div>
      <h1>Register Formik Page</h1>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Must be at least 2 characters")
            .max(15, "Must be 15 characters or less")
            .required("Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
        })}
      >
        {({ handleReset }) => (
          <Form>
            <MyTextInput label="Name" name="name" placeholder="Luis" />
            <MyTextInput
              label="Email"
              name="email"
              placeholder="test@algo.com"
              type="email"
            />
            <MyTextInput
              label="Password"
              name="password"
              placeholder="password"
              type="password"
            />
            <MyTextInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="confirm password"
              type="password"
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
