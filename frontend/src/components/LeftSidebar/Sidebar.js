import React from "react";
import { useSelector } from "react-redux";
import { List } from "reactstrap";
import { Link } from "react-router-dom";

export const Sidebar = ({ isMenuOpen }) => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const { user } = loginReducer;
  console.log("SİDEBARDAK USER:")
  console.log(user);
  return (
    <div
      className="card sidebar"
      style={{ display: isMenuOpen ? "block" : "none" }}
    >
      <div className="card-body mt-5">
        <h2>
          {user?.ad} {user?.soyad}
        </h2>
      </div>

      <div className="sidebar-menu">
        {user?.admin === 1 ? (
          <List type="circle">
            <Link to="yazar-ekle">
              <li>Yazar Ekle</li>
            </Link>
            <Link to="yazar-sil">
              <li>Yazar Sil</li>
            </Link>
            <Link to="kategori-ekle">
              <li>Kategori Ekle</li>
            </Link>
            <Link to="kategori-sil">
              <li>Kategori Sil</li>
            </Link>
            <Link to="kitap-ekle">
              <li>Kitap Ekle</li>
            </Link>
            <Link to="kitap-sil">
              <li>Kitap Sil</li>
            </Link>
            <Link to="uye-sil">
              <li>Üye Sil</li>
            </Link>
            <Link to="kutuphane-guncelle">
              <li>Kütüphane Bilgisi Düzenle</li>
            </Link>
            <Link to="/oduncislemleri">
              <li>Ödünç İşlemleri</li>
            </Link>
            <Link to="kutuphane-uyeler">
              <li>Kütüphanedeki Üyeler</li>
            </Link>
            <Link to="kutuphane-kitaplar">
              <li>Kütüphanedeki Kitaplar</li>
            </Link>
            <Link to="emanetalanlar">
              <li>Emanet Kitap Alanlar</li>
            </Link>
          </List>
        ) : null}

        {user?.admin === 2 ? (
          <List type="circle">
            <Link to="/kutuphane-ekle">
              <li>Kütüphane Ekle</li>
            </Link>
            <Link to="/kutuphane-sil">
              <li>Kütüphane Sil</li>
            </Link>
          </List>
        ) : null}
      </div>
    </div>
  );
};



