import React, { useState,useEffect } from "react";
import { withRouter } from "react-router";
import { db, auth } from "../firebase";
import { useStateValue } from "../StateProvider";

function Shipping(props) {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address1Validator, setAddress1Validator] = useState("");
  const [address2Validator, setAddress2Validator] = useState("");
  const [cityValidetor, setCityValidator] = useState("");
  const [pincodeValidator, setPincodeValidator] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [address1Disable, setAddress1Disable] = useState(false);
  const [address2Disable, setAddress2Disable] = useState(false);
  const [cityDisable, setCityDisable] = useState(false);
  const [pincodeDisable, setPincodeDisable] = useState(false);
  const [{shipping, user}, dispatch] = useStateValue();

  useEffect(() => {
      if(!user){props.history.push('/signin')}
  }, [])
  const onChange = (key, value) => {
    let obj = {
      [key]: value,
    };

    if (key === "address1") {
      const nameRegex = /^[a-zA-Z0-9\s\,\''\-]*$/;
      if (obj.address1.length === 0) {
        setAddress1Validator("*Required");
      } else if (obj.address1.length < 2) {
        setAddress1Validator("*Please type valid Address.");
      } else if (!obj.address1.match(nameRegex)) {
        setAddress1Validator("*Please type valid Address.");
      } else {
        setAddress1Disable(true);
        setAddress1Validator("");
      }
    }
    if (key === "address2") {
      const nameRegex = /^[a-zA-Z0-9\s\,\''\-]*$/;
      if (obj.address2.length === 0) {
        setAddress2Validator("*Required");
      } else if (obj.address2.length < 2) {
        setAddress2Validator("*Please type valid Address.");
      } else if (!obj.address2.match(nameRegex)) {
        setAddress2Validator("*Please type valid Address.");
      } else {
        setAddress2Disable(true);
        setAddress2Validator("");
      }
    }

    if (key === "city") {
      const nameRegex = /^[A-Za-z ]+$/;
      if (obj.city.length === 0) {
        setCityValidator("*Required");
      } else if (obj.city.length < 2) {
        setCityValidator("*Please type valid city name.");
      } else if (!obj.city.match(nameRegex)) {
        setCityValidator("*Please type valid city name.");
      } else {
        setCityDisable(true);
        setCityValidator("");
      }
    }

    if (key === "pincode") {
      const nameRegex = /^[1-9]{6}/;
      if (obj.pincode.length === 0) {
        setPincodeValidator("*Required");
      } else if (obj.pincode.length < 2) {
        setPincodeValidator("*Please type valid pincode.");
      } else {
        console.log("set");
        setPincodeDisable(true);
        setPincodeValidator("");
      }
    }

    if (key === "address1") {
      setAddress1(obj.address1);
    }
    if (key === "address2") {
      setAddress2(obj.address2);
    }
    if (key === "city") {
      setCity(obj.city);
    }
    if (key === "pincode") {
      setPincode(obj.pincode);
    }
    if (address1Disable && address2Disable && cityDisable && pincodeDisable) {
      console.log("1");
      setDisabled(false);
    }
  };

  const onSubmit = () => {
    // console.log(" on submit");
    console.log(address1, address2, city, pincode);

    props.history.push("/payment");

    dispatch({
      type: "ADD_SHIPPING_ADDRESS",
      payload: {
        address1,
        address2,
        city,
        pincode,
      },
    });
    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((authuser) => {
    //     authuser.user.updateProfile({
    //       displayName: username,
    //     });
    //   })
    //   .catch((error) => alert(error.message));
    // db.collection("users")
    //   .add({
    //     email : email,
    //     username: username,
    //     phone: phone,
    //     type : 0
    //   })
    //   .catch((error) => console.log(error));
    //   props.history.push('/signin')
  };

  return (
    <div className="conatainer mt-5">
      <div className="row">
        <div className="col-sm-4 ml-auto mr-auto mt- mb-auto">
          <div className="card sign__card mt-5">
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
                    <label htmlfor="exampleInputEmail1">Address1</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Address1"
                      aria-describedby="emailHelp"
                      placeholder="Address 1"
                      value={address1}
                      onChange={(e) => onChange("address1", e.target.value)}
                    />
                    {address1Validator ? (
                      <small>{address1Validator}</small>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlfor="exampleInputEmail1">Address2</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      aria-describedby="emailHelp"
                      placeholder="Address2"
                      value={address2}
                      onChange={(e) => onChange("address2", e.target.value)}
                    />
                    {address2Validator ? (
                      <small>{address2Validator}</small>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlfor="exampleInputEmail1">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="City"
                      value={city}
                      onChange={(e) => onChange("city", e.target.value)}
                    />
                    {cityValidetor ? <small>{cityValidetor}</small> : null}
                  </div>
                  <div className="form-group">
                    <label htmlfor="exampleInputPassword1">Pincode</label>
                    <input
                      type="number"
                      className="form-control"
                      id="pincode"
                      placeholder="pincode"
                      value={pincode}
                      onChange={(e) => onChange("pincode", e.target.value)}
                    />
                    {setPincodeValidator ? (
                      <small>{pincodeValidator}</small>
                    ) : null}
                  </div>
                  <div className="form-group form-check"></div>
                  <button
                    type="submit"
                    disabled={disabled}
                    className="sign__button"
                  >
                    Process to payment
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

export default withRouter(Shipping);
