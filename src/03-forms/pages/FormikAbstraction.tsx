import { Formik, Form } from "formik";
import * as Yup from "yup";
import "../styles/styles.css";
import { MyTextInput, MyCheckbox, MySelect } from "../components/";

export const FormikAbstractation = () => {
  return (
    <div>
      <h1>Formik Abstractation</h1>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          terms: false,
          jobType: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("First name is required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Last name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          terms: Yup.boolean().oneOf([true], "You must accept the terms"),
          jobType: Yup.string()
            .notOneOf(["it-jr"], "Option not allowed")
            .required("Job type is required"),
        })}
      >
        {(formik) => (
          <Form>
            <MyTextInput
              label="First Name"
              name="firstName"
              placeholder="Luis"
            />

            <MyTextInput
              label="Last Name"
              name="lastName"
              placeholder="Leger"
            />

            <MyTextInput
              label="Email"
              name="email"
              placeholder="luis@gmail.com"
              type="email"
            />

            <MySelect label="Job Type" name="jobType">
              <option value="">Please select</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="it-sr">It Senior</option>
              <option value="it-jr">It Junior</option>
            </MySelect>

            <MyCheckbox label="Terms & conditions" name="terms" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
