import React, { useEffect, useState } from "react";
import { client } from "../../helpers/httpHelpers";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const KutuphanedekiKullanicilar = () => {
    const [uyeListesi, setUyeListesi] = useState(null);
    const [errMess, setErrMess] = useState("");
    let history = useHistory();

    const adminLibraryReducer = useSelector((state) => state.adminLibraryReducer);
    const kutuphaneBilgileri = adminLibraryReducer;

    useEffect(() => {
        try {
            client(`api/libraries/getLibsUsers/${kutuphaneBilgileri.ID}`).then(
                (response) => {
                    if (response.success) {
                        setUyeListesi(response.data);
                    } else {
                        setErrMess(response.message);
                    }
                }
            );
        } catch (err) {
            setErrMess(err.message);
        }
    }, []);

    return (
        <div className="container mt-5">
            <h3>Kütüphanenize Kayıtlı Üyeler</h3>
            {errMess ? (
                <div className="alert alert-danger mt-2">{errMess}</div>
            ) : null}

            {uyeListesi ? (
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Ad</th>
                            <th scope="col">Soyad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uyeListesi.map((uye) => (
                            <tr key={uye.ID}>
                                <td>{uye.ad}</td>
                                <td>{uye.soyad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};