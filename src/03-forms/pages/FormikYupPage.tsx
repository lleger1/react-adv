import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/styles.css";

export const FormikYupPage = () => {
  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("First name is required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
  });

  return (
    <div>
      <h1>Formik Yup</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="firstName">FirstName</label>
        <input type="text" {...getFieldProps("firstName")} />

        {touched.firstName && errors.firstName && (
          <span>{errors.firstName}</span>
        )}

        <label htmlFor="lastName">LastName</label>
        <input type="text" {...getFieldProps("lastName")} />

        {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}

        <label htmlFor="email">Email</label>
        <input type="email" {...getFieldProps("email")} />

        {touched.email && errors.email && <span>{errors.email}</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
