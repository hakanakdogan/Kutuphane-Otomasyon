import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../actions/auth";
import Axios from "axios"


const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const { isLogged } = loginReducer;
  const history = useHistory();

  const openOrCloseMenu = () => {
    console.log(isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  };

  const cikisYap = (e) => {
    e.preventDefault(e);

    try {
      Axios.get("http://localhost:5000/api/users/logout").then((response) => {
        dispatch(logout())
        history.push("/");
      })
    } catch (error) {
      console.log("error");
    }


  }

  const authLinks = (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">

        <button className="btn menu-button" onClick={openOrCloseMenu}>
          <FontAwesomeIcon icon={faBars} style={{ fontSize: "1.8rem" }} />
        </button>

        <Link className="navbar-brand" to="/">
          Kütüphanem
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="profile">
                Profil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={e => cikisYap(e)}>
                Çıkış Yap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  const guestLinks = (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Kütüphanem
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/register"
              >
                Kayıt Ol
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Giriş Yap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  return isLogged ? authLinks : guestLinks;
};

export default Header;
