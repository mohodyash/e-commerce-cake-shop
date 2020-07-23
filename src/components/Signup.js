import React, { useState } from "react";
import { withRouter } from "react-router";
import { db, auth } from "../firebase";
import { v4 as uuidv4 } from 'uuid';


function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [emailValidator, setEmailValidator] = useState("");
  const [passwordValidator, setPasswordValidator] = useState("");
  const [usernameValidetor, setUsernameValidator] = useState("");
  const [phoneValidator, setPhoneValidator] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [emailDisable, setEmailDisable] = useState(false);
  const [passwordDisable, setPasswordDisable] = useState(false);
  const [usernameDisable, setUsernameDisable] = useState(false);
  const [phoneDisable, setPhoneDisable] = useState(false);

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

    if (key === "username") {
      const nameRegex = /^[A-Za-z ]+$/;
      if (obj.username.length === 0) {
        setUsernameValidator("*Required");
      } else if (obj.username.length < 2) {
        setUsernameValidator("*Please type valid name.");
      } else if (!obj.username.match(nameRegex)) {
        setUsernameValidator("*Please type valid name.");
      } else {
        setUsernameDisable(true);
        setUsernameValidator("");
      }
    }

    if (key == "phone") {
      obj.phone = parseFloat(obj.phone || 0);
      const regex = /^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/;
      if (!regex.test(obj.phone)) {
        setPhoneValidator("*Please enter valid mobile no.");
      } else if (obj.phone.toString().length != 10) {
        setPhoneValidator("*Please enter valid mobile no.");
      } else {
        setPhoneDisable(true);
        setPhoneValidator("");
      }
    }

    if (key === "email") {
      setEmail(obj.email);
    }
    if (key === "password") {
      setPassword(obj.password);
    }
    if (key === "username") {
      setUsername(obj.username);
    }
    if (key === "phone") {
      setPhone(obj.phone);
    }
    if (emailDisable && passwordDisable && usernameDisable && phoneDisable) {
      setDisabled(false);
    }
  };

  const onSubmit = () => {
    // console.log(" on submit");
    // console.log(username, phone, email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authuser) => {
        authuser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    db.collection("users")
      .add({
        uid : uuidv4(),
        email: email,
        username: username,
        phone: phone,
        type: 0,
      })
      .catch((error) => console.log(error));
     props.history.push("/signin");
  };

  return (
    <div className="conatainer mt-5">
      <div className="row">
        <div className="col-sm-4 ml-auto mr-auto mt- mb-auto">
          <div className="card sign__card">
            <div className="card-body">
              <div className="Sign__heding">Sign Up</div>
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                <div>
                  <div className="form-group">
                    <label htmlfor="exampleInputEmail1">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      aria-describedby="emailHelp"
                      placeholder="User Name"
                      value={username}
                      onChange={(e) => onChange("username", e.target.value)}
                    />
                    {usernameValidetor ? (
                      <small>{usernameValidetor}</small>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlfor="exampleInputEmail1">Phone No</label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone"
                      aria-describedby="emailHelp"
                      placeholder="Phone No"
                      value={phone}
                      onChange={(e) => onChange("phone", e.target.value)}
                    />
                    {phoneValidator ? <small>{phoneValidator}</small> : null}
                  </div>

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
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
