import React, { useState } from "react";
import "./button.scss";

const Button = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  const renderEmailInput = () => {
    return (
      <input
        type="email"
        className="login-button__email"
        placeholder="email"
        onChange={evt => {
          setEmail(evt.target.value.trim());
        }}
        onKeyUp={evt => {
          evt.preventDefault();
          if (email.length !== 0 && evt.key === "Enter") {
            evt.target.value = "";
            setStep(2);
          }
        }}
      />
    );
  };
  const renderPasswordInput = () => {
    return (
      <input
        type="password"
        className="login-button__password"
        placeholder="password"
        onChange={evt => {
          setPassword(evt.target.value);
        }}
        onKeyUp={evt => {
          evt.preventDefault();
          if (password.length !== 0 && evt.key === "Enter") {
            evt.target.value = "";
            setStep(3);
          }
        }}
      />
    );
  };
  const renderSubmitButton = () => {
    return (
      <button
        title="Login"
        type="button"
        className="login-button__btn"
        onClick={evt => {
          evt.preventDefault();
          onSubmit({ email, password });
        }}
      >
        LOGIN&nbsp;
        <i className="zmdi zmdi-long-arrow-right" />
      </button>
    );
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return renderEmailInput();
      case 2:
        return renderPasswordInput();
      case 3:
        return renderSubmitButton();
      default:
        return <div />;
    }
  };
  return <div className="login-button">{renderContent()}</div>;
};

export default Button;
