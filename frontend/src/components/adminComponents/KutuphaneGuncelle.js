import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import adminLibraryReducer from "./../../reducers/adminLibraryReducer";
import { client } from "../../helpers/httpHelpers";

export const KutuphaneGuncelle = () => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const { user } = loginReducer;

  const adminLibraryReducer = useSelector((state) => state.adminLibraryReducer);
  const kutuphaneBilgileri = adminLibraryReducer;
  const dispatch = useDispatch();

  const [ID, setID] = useState(kutuphaneBilgileri.ID);
  const [isim, setIsim] = useState(kutuphaneBilgileri.isim);
  const [il, setIl] = useState(kutuphaneBilgileri.il);
  const [ilce, setIlce] = useState(kutuphaneBilgileri.ilce);
  const [tam_adres, setTamAdres] = useState(kutuphaneBilgileri.tam_adres);
  const [adres_id, setAdresId] = useState(kutuphaneBilgileri.adres_id);
  let history = useHistory();

  const submitFunc = (e) => {
    e.preventDefault();
    // let ID = user.ID;
    // let sifre = {user};
    const body = {
      ID,
      isim,
      il,
      ilce,
      tam_adres,
      adres_id
    };
    // console.log(body)
    try {
        client(`api/libraries/update`, { body })
        .then(response => {
            if(response.success) {
                console.log(response)
                history.push('/dashboard');
            }
            else {
                console.log(response.message)
            }

        })
    } catch (err) {
        console.log(err.message)
    }
  };

  return (
    <div className="profile mt-5 container">
      <div className="profile-form">
        <h1>Kütüphane Bilgilerini Güncelle</h1>
        <form onSubmit={(e) => submitFunc(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Kütüphane ismi"
              value={isim}
              onChange={(e) => {
                setIsim(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="İl"
              value={il}
              onChange={(e) => {
                setIl(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="İlçe"
              value={ilce}
              onChange={(e) => {
                setIlce(e.target.value);
              }}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <textarea
                class="form-control"
                aria-label="With textarea"
                placeholder="Tam Adres *"
                cols="50"
                value={tam_adres}
                onChange={(e) => {
                  setTamAdres(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="form-group">
            <p classname="register-alert-p">"*" İşaretleri Opsiyoneldir</p>
          </div>

          <button type="submit" className="btn-block btn btn-primary">
            GÜNCELLE
          </button>
        </form>
      </div>
    </div>
  );
};
