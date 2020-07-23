import React, { useState } from "react";
import { withRouter } from "react-router";
import { auth } from "../firebase";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidator, setEmailValidator] = useState("");
  const [passwordValidator, setPasswordValidator] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [emailDisable, setEmailDisable] = useState(false);
  const [passwordDisable, setPasswordDisable] = useState(false);

  const onChange = (key, value) => {
    let obj = {
      [key]: value,
    };
    if (key === "email") {
      let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      if (obj.email.length === 0) {
        setEmailValidator("*Required");
      } else if (!obj.email.match(emailRegex)) {
        setEmailValidator("*Please type valid email (test@email.com).");
      } else {
        setEmailDisable(true);
        setEmailValidator("");
      }
    }
    if (key == "password") {
      if (!obj.password) {
        setPasswordValidator("*Please create your password.");
      } else if (obj.password.length < 6) {
        setPasswordValidator("*Password should contain at least 6 characters");
      } else {
        setPasswordDisable(true);
        setPasswordValidator("");
      }
    }

    if (key === "email") {
      setEmail(obj.email);
    }
    if (key === "password") {
      setPassword(obj.password);
    }
    if (emailDisable && passwordDisable) {
      setDisabled(false);
    }
  };

  const onSubmit = () => {
    // console.log("on submit");
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        props.history.push("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="conatainer mt-5">
      <div className="row">
        <div className="col-sm-4 ml-auto mr-auto mt- mb-auto">
          <div className="card sign__card">
            <div className="card-body">
              <div className="Sign__heding">Sign in</div>
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                <div>
                  <div className="form-group">
                    <label htmlfor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => onChange("email", e.target.value)}
                    />
                    {emailValidator ? <small>{emailValidator}</small> : null}
                  </div>
                  <div className="form-group">
                    <label htmlfor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="********"
                      value={password}
                      onChange={(e) => onChange("password", e.target.value)}
                    />
                    {passwordValidator ? (
                      <small>{passwordValidator}</small>
                    ) : null}
                  </div>
                  <div className="form-group form-check"></div>
                  <button
                    type="submit"
                    disabled={disabled}
                    className="sign__button"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <div className="sign__links">
                <span>You are new here please</span>
                <a
                  className="ml-5 link"
                  onClick={(e) => {
                    props.history.push("/signup");
                  }}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignIn);
