import React, { useState } from 'react';
import './button.scss';

const Button = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);

  const onEmailChange = evt => {
    setEmail(evt.target.value.trim());
  };

  const onPasswordChange = evt => {
    setPassword(evt.target.value.trim());
  };

  const onEmailKeyUp = evt => {
    evt.preventDefault();
    if (email.length !== 0 && evt.key === 'Enter') {
      evt.target.value = '';
      setStep(2);
    }
  };

  const onPasswordKeyUp = evt => {
    evt.preventDefault();
    if (password.length !== 0 && evt.key === 'Enter') {
      evt.target.value = '';
      setStep(3);
    }
  };

  const onSubmitButton = evt => {
    evt.preventDefault();
    onSubmit({ email, password });
  };

  const renderEmailInput = () => {
    return (
      <input
        type="email"
        className="login-button__email"
        placeholder="Email"
        onChange={evt => onEmailChange(evt)}
        onKeyUp={evt => onEmailKeyUp(evt)}
      />
    );
  };

  const renderPasswordInput = () => {
    return (
      <input
        type="password"
        className="login-button__password"
        placeholder="Password"
        onChange={evt => onPasswordChange(evt)}
        onKeyUp={evt => onPasswordKeyUp(evt)}
      />
    );
  };

  const renderSubmitButton = () => {
    return (
      <button
        title="Login"
        type="button"
        className="login-button__btn"
        onClick={evt => onSubmitButton(evt)}
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
