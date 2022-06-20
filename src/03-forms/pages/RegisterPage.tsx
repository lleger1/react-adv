import "../styles/styles.css";
import { FormEvent } from "react";
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    formData: registerData,
    handleChange,
    resetForm,
    isValidEmail,
  } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerData);
  };

  return (
    <div>
      <h1>Register Page</h1>

      <form noValidate onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          name="name"
          onChange={handleChange}
          className={`${name.trim().length <= 0 && "has-error"}`}
        />
        {name.trim().length <= 0 && <span>Este campo es necesario</span>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleChange}
          className={`${!isValidEmail(email) && "has-error"}`}
        />
        {!isValidEmail(email) && <span>Email invalido</span>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        {password.trim().length <= 0 && <span>Este campo es necesario</span>}
        {password.trim().length < 6 && (
          <span>la clave tiene que tener 6 caracteres</span>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
        />
        {confirmPassword.trim().length <= 0 && (
          <span>Este campo es necesario</span>
        )}
        {confirmPassword.trim().length > 0 && password !== confirmPassword && (
          <span>las claves deben ser iguales</span>
        )}

        <button type="submit">Create</button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>
    </div>
  );
};
