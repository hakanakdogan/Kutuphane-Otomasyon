import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from './../actions/auth';
import { client } from "../helpers/httpHelpers";
import Axios from "axios"

const LoginPage = () => {
  Axios.defaults.withCredentials = true;
  const loginReducer = useSelector((state) => state.loginReducer);
  const { isLogged } = loginReducer;
  const dispatch = useDispatch();

  const [eposta, setEmail] = useState("");
  const [sifre, setPassword] = useState("");
  const [wrongInfo, setWrongInfo] = useState(false);

  if (isLogged) {
    return (
      <Redirect to="/dashboard" />
    )
  }


  const loginFunc = async (e) => {
    e.preventDefault()
    const body = {
      eposta,
      sifre
    }
    try {
      // client(`api/users/login`, { body })
      // .then(response => {
      //   setWrongInfo(false);
      //   if (response.success) {
      //     dispatch(login(response))
      //   }
      //   else {
      //     setWrongInfo(true);
      //   }

      //   })
      Axios.post("http://localhost:5000/api/users/login",
        {
          eposta, sifre
        }
      ).then((response) => {
        console.log("AXİOSDAN GELEN RESPONSE")
        console.log(response.data)
        setWrongInfo(false);
        if (response.data.success) {
          dispatch(login(response.data.user))
        }
        else {
          setWrongInfo(true);
        }
      });

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="login">
      <div className="login-form">
        <h1>Kütüphane Uygulaması</h1>
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email Adresiniz"
              value={eposta}
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Şifreniz"
              value={sifre}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>

          <button onClick={e => loginFunc(e)} type="submit" className="btn-block btn btn-primary">
            Giriş Yap
          </button>
        </form>

        {
          wrongInfo ?
            <div className="alert alert-danger">
              Hatalı Bilgi Girdiniz
            </div>
            : null
        }
      </div>
    </div>
  );
};
export default LoginPage;
