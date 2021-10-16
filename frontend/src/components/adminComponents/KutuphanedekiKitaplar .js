import React, { useEffect, useState } from "react";
import { client } from "../../helpers/httpHelpers";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const KutuphanedekiKitaplar = () => {
    const [kitapListesi, setKitapListesi] = useState(null);
    const [errMess, setErrMess] = useState("");
    let history = useHistory();

    const adminLibraryReducer = useSelector((state) => state.adminLibraryReducer);
    const kutuphaneBilgileri = adminLibraryReducer;

    useEffect(() => {
        try {
            client(`api/libraries/getLibsBooks/${kutuphaneBilgileri.ID}`).then(
                (response) => {
                    if (response.success) {
                        setKitapListesi(response.data);
                        console.log(response.data);
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
            <h3>Kütüphanenize Kayıtlı Kitaplar</h3>
            {errMess ? (
                <div className="alert alert-danger mt-2">{errMess}</div>
            ) : null}

            {kitapListesi ? (
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">ISBN</th>
                            <th scope="col">Kitap Adı</th>
                            <th scope="col">Yayınevi</th>
                            <th scope="col">Yazar</th>
                            <th scope="col">Miktar</th>
                            <th scope="col">Uygun Miktar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kitapListesi.map((kitap) => (
                            <tr key={kitap.ISBN}>
                                <td>{kitap.ISBN}</td>
                                <td>{kitap.kitap_ad}</td>
                                <td>{kitap.yayin_bilgileri}</td>
                                <td>{kitap.ad} {kitap.soyad}</td>
                                <td>{kitap.miktar}</td>
                                <td>{kitap.uygun_miktar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};