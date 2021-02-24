import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import Loader from "../../components/Loader"
import HeadingFull from "../../components/HeadingFull";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="input-holder">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
        
        <div className="grid__flex u-margin-bottom-small">
      <label className="btn-text">
          Submit
          <input
            name="newPass"
            type="submit"
            hidden
            disabled={!password || password.length < 6 || loading}
          />
        </label></div>
      </div>
    </form>
  );

  return (
    <>
    <HeadingFull headingMarginTop={true}>Change Password</HeadingFull>
  
    
        <div className="center-cards grid__shop">
          <UserNav />
        
    
          {loading ? (
             <Loader/>
          ) : (
            <div className="grid__flex grid__flex--col grid__flex--white">
         {passwordUpdateForm()}
         </div>
          )}
      </div>
    </>
  );
};

export default Password;
