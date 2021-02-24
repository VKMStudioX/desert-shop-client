import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { UnlockFilled } from '@ant-design/icons';
import Loader from "../../components/Loader"

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        // console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };

  return (
    <>
    <div className="full-columns full-columns__heading heading-unziale u-margin-top-big">
    Reset forgotten password</div>
    
        <div className="center-cards">
          {loading ? (
           <Loader/>
          ) : (
            <div className="grid__flex grid__flex--col grid__flex--white">
             <form>     
        <input
          type="email"
          className="input-holder input-3 u-margin-bottom-small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />
        <Button
        onClick={handleSubmit}
        type="warning"
        className="u-margin-bottom-small bg-primary"
        block
        shape="square"
        icon={<UnlockFilled />}
        size="large"
        disabled={!email}
      >
        Submit
      </Button>
      </form>
      
     
      </div>
      )}

    
    </div>
    </>
  );
};

export default ForgotPassword;
