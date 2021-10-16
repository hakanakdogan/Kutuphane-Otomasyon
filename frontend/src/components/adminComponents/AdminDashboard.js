import React, { useEffect, useState } from "react";
import { client } from "../../helpers/httpHelpers";
import { useSelector, useDispatch } from "react-redux";
import { loadAdminLibrary } from "../../actions/adminLibrary";

export const AdminDashboard = () => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const adminLibraryReducer = useSelector((state) => state.adminLibraryReducer);
  const { user } = loginReducer;
  const kutuphaneBilgileri = adminLibraryReducer;
  console.log(kutuphaneBilgileri);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      client(`api/libraries/admin-library/${user.ID}`).then((response) => {
        if (response.success) {
          dispatch(loadAdminLibrary(response.data[0]));
        } else {
          console.log(response.message);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div className="container mt-5 mb-5">
      {kutuphaneBilgileri && (
        <div className="card">
          <div className="card-header">
            <b>
              <center>Sorumlusu Olduğunuz Kütüphanenin Bilgileri</center>
            </b>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>İSİM</b> - {kutuphaneBilgileri.isim}
            </li>
            <li className="list-group-item">
              <b>İL</b> - {kutuphaneBilgileri.il}
            </li>
            <li className="list-group-item">
              <b>İLÇE</b> - {kutuphaneBilgileri.ilce}
            </li>
            <li className="list-group-item">
              <b>TAM ADRES</b> - {kutuphaneBilgileri.tam_adres}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
