import { Formik, Form } from "formik";
import formJson from "../data/custom-form.json";
import { MyTextInput } from "../components/MyTextInput";
import { MySelect } from "../components";
import * as Yup from "yup";

console.log(formJson);

const initialValues: { [key: string]: any } = {};
const validatedFields: { [key: string]: any } = {};

for (const input of formJson) {
  initialValues[input.name] = input.value;

  if (!input.validations) continue;

  let schema = Yup.string();

  for (const rule of input.validations) {
    if (rule.type === "required") {
      schema = schema.required(rule.message);
    }

    if (rule.type === "minLength") {
      schema = schema.min((rule as any).value || 1, rule.message);
    }

    if (rule.type === "email") {
      schema = schema.email(rule.message);
    }
  }
  validatedFields[input.name] = schema;
}
console.log(validatedFields);
const validationSchema = Yup.object({ ...validatedFields });

export const DynamicForm = () => {
  return (
    <div>
      <h1>Dynamic Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form noValidate>
            {formJson.map(({ type, name, Placeholder, label, option }) => {
              if (type === "input" || type === "password" || type === "email") {
                return (
                  <MyTextInput
                    key={name}
                    type={type as any}
                    label={label}
                    name={name}
                    placeholder={Placeholder}
                  />
                );
              } else if (type === "select") {
                return (
                  <MySelect key={name} label={label} name={name}>
                    <option>Select an option</option>
                    {option?.map(({ id, label }) => {
                      return (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      );
                    })}
                  </MySelect>
                );
              }

              throw new Error(`Unsupported type: ${type}`);
            })}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
