import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const LandingPage = () => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const { isLogged } = loginReducer;

  if (isLogged) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="landing">
        <div className="landing-box">
            <h1> Kütüphanem </h1>
            <p>Tüm Kütüphaneler Tek Tık Uzağında</p>
            <div className="buttons">
                <Link to="/register" >
                    <button type="button" className="btn btn-secondary">Kayıt Ol</button>

                </Link>
                <Link to="/login"  >
                    <button type="button" className="btn btn-secondary">Giriş Yap</button>
                </Link>
            </div>

        </div>
    </div>
  );
};
