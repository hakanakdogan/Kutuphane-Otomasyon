import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import Axios from "axios";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRouter";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { LandingPage } from "./components/layout/LandingPage";
import TumKutuphaneler from "./components/dashboardComponents/TumKutuphaneler";
import Footer from "./components/Footer";
import { RegisterPage } from "./components/RegisterPage";
import { Detail } from "./components/libraryDetailComponent/Detail";
import { Sidebar } from "./components/LeftSidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { Profil } from "./components/Profil";
import KayitliKutuphanelerim from "./components/dashboardComponents/KayitliKutuphanelerim";
import { YazarEkle } from "./components/adminComponents/YazarEkle";
import { YazarSil } from "./components/adminComponents/YazarSil";
import { KutuphaneEkle } from "./components/superAdminComponents/KutuphaneEkle";
import SuperAdminRoute from './components/routing/SuperAdminRouter';
import { KategoriEkle } from "./components/adminComponents/KategoriEkle";
import { KategoriSil } from "./components/adminComponents/KategoriSil";
import { KitapEkle } from "./components/adminComponents/KitapEkle";
import { KutuphaneGuncelle } from "./components/adminComponents/KutuphaneGuncelle";
import { KitapSil } from "./components/adminComponents/KitapSil";
import { UyeSil } from "./components/adminComponents/UyeSil";
import { KutuphanedekiKullanicilar } from "./components/adminComponents/KutuphanedekiKullanicilar";
import { KutuphanedekiKitaplar } from "./components/adminComponents/KutuphanedekiKitaplar ";
import { OduncIslemleri } from "./components/adminComponents/Odunc/OduncIslemleri";
import { login } from "./actions/auth";
import { EmanetAlanlar } from "./components/adminComponents/EmanetAlanlar";
import { KutuphaneSil } from "./components/adminComponents/KutuphaneSil";


function App() {
  const loginReducer = useSelector((state) => state.loginReducer);
  const { isLogged, user } = loginReducer;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  Axios.defaults.withCredentials = true;
  useEffect(() => {



    console.log("USEEFFECT ÇALIŞTI")
    Axios.get("http://localhost:5000/api/users/login").then((response) => {
      console.log("LOGEEDIN APPJS:");
      console.log(response.data.loggedIn);
      if (response.data.loggedIn === true) {

        console.log(response.data.user[0]);
        dispatch(login(response.data.user));
        console.log("DİSPATCH ÇALIŞTI")

      }
    });
  }, []);

  return (
    <div className="main">
      <BrowserRouter>
        <Fragment>
          <div className="main-content">
            {isLogged ? <Sidebar isMenuOpen={isMenuOpen} /> : null}

            <div className="content">
              <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
              <Route exact path="/" component={isLogged ? Dashboard : LandingPage}></Route>
              <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <PrivateRoute exact path="/libs/:id" component={Detail} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/profile" component={Profil} />
                <PrivateRoute
                  exact
                  path="/tum-kutuphaneler"
                  component={TumKutuphaneler}
                />
                <PrivateRoute exact path="/kutuphanelerim" component={KayitliKutuphanelerim} />
                {/* <AdminRoute exact path="/kitap-ekle" component={} /> */}
                <PrivateRoute exact path="/yazar-ekle" component={YazarEkle} />
                <PrivateRoute exact path="/yazar-sil" component={YazarSil} />
                <PrivateRoute exact path="/kategori-ekle" component={KategoriEkle} />
                <PrivateRoute exact path="/kategori-sil" component={KategoriSil} />
                <PrivateRoute exact path="/kitap-ekle" component={KitapEkle} />
                <PrivateRoute exact path="/kitap-sil" component={KitapSil} />
                <PrivateRoute exact path="/uye-sil" component={UyeSil} />
                <PrivateRoute exact path="/kutuphane-uyeler" component={KutuphanedekiKullanicilar} />
                <PrivateRoute exact path="/kutuphane-kitaplar" component={KutuphanedekiKitaplar} />
                <PrivateRoute exact path="/kutuphane-guncelle" component={KutuphaneGuncelle} />
                <PrivateRoute exact path="/oduncislemleri" component={OduncIslemleri} />
                <PrivateRoute exact path="/emanetalanlar" component={EmanetAlanlar} />
                <SuperAdminRoute exact path="/kutuphane-ekle" component={KutuphaneEkle} />
                <SuperAdminRoute exact path="/kutuphane-sil" component={KutuphaneSil} />
              </Switch>
            </div>
          </div>

          <Footer />
        </Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
