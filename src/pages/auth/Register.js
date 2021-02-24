import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { UserAddOutlined } from '@ant-design/icons';

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    
    <form>
      <div className='input-holder'>
      <input
        type="email"
        className="input-3 u-margin-bottom-small"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Type your e-mail address to registration"
      />
      </div>
      <Button
        onClick={handleSubmit}
        type="default"
        className="u-margin-bottom-small bg-primary"
        block
        shape="square"
        icon={<UserAddOutlined />}
        size="large"
        disabled={!email}
      >
        Submit
      </Button>
    </form>
  );

  return (
    <>
    <div className="full-columns full-columns__heading heading-unziale u-margin-top-big">
    Register</div>
    
        <div className="center-cards">
            <div className="grid__flex grid__flex--col grid__flex--white">
          {registerForm()}
        </div>
      </div>
    </>
  );
};

export default Register;
