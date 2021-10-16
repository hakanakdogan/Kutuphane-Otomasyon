import React, { useEffect, useState } from "react";
import { client } from "../../helpers/httpHelpers";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const EmanetAlanlar = () => {
    const [uyeListesi, setUyeListesi] = useState(null);
    const [errMess, setErrMess] = useState("");
    let history = useHistory();

    const adminLibraryReducer = useSelector((state) => state.adminLibraryReducer);
    const kutuphaneBilgileri = adminLibraryReducer;

    useEffect(() => {
        try {
            client(`api/deposit/getLibrariesDeposits/${kutuphaneBilgileri.ID}`).then(
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
            <h3>Kütüphanenizden Emanet Alan Üyeler</h3>
            {errMess ? (
                <div className="alert alert-danger mt-2">{errMess}</div>
            ) : null}

            {uyeListesi ? (
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Kitap Adı</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Üye Adı</th>
                            <th scope="col">Üye Soyadı</th>
                            <th scope="col">Telefonu</th>
                            <th scope="col">Alınma Tarihi</th>
                            <th scope="col">Teslim Tarihi</th>

                        </tr>
                    </thead>
                    <tbody>
                        {uyeListesi.map((uye) => (
                            <tr key={uye.emanet_no}>
                                <td>{uye.kitap_ad}</td>
                                <td>{uye.ISBN}</td>
                                <td>{uye.uye_ad}</td>
                                <td>{uye.uye_soyad}</td>
                                <td>{uye.telefon}</td>
                                <td>{uye.alinma_tarihi.slice(0, 10)}</td>
                                <td>{uye.teslim_tarihi.slice(0, 10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};