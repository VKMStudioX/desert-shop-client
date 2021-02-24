import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
import { Button } from "antd";
import { UserAddOutlined } from '@ant-design/icons';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        // console.log("user", user, "idTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch();

        // redirect
        history.push("/");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    
    <form>
      <input type="email" className="input-holder input-3 u-margin-bottom-small" value={email} disabled />
      <input
        type="password"
        className="input-holder input-3 u-margin-bottom-small"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <Button
        onClick={handleSubmit}
        // type="default"
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
    Register Step 2 (complete)</div>
    
        <div className="center-cards">
            <div className="grid__flex grid__flex--col grid__flex--white">
         
          {completeRegistrationForm()}
        </div>
      </div>
    </>
  );
};

export default RegisterComplete;
