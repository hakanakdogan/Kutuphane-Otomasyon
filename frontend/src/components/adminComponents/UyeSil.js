
import React, { useEffect, useState } from "react";
import { client } from "../../helpers/httpHelpers";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const UyeSil = () => {
    const [uyeListesi, setUyeListesi] = useState(null);
    const [errMess, setErrMess] = useState("");
    let history = useHistory();

    const adminLibraryReducer = useSelector((state) => state.adminLibraryReducer);
    const kutuphaneBilgileri = adminLibraryReducer;

    useEffect(() => {
        try {
            client(`api/libraries/getLibsUsers/${kutuphaneBilgileri.ID}`).then((response) => {
                if (response.success) {
                    console.log(response.data)
                    setUyeListesi(response.data);
                } else {
                    console.log(response.message);
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }, []);


    const submitFunc = (e) => {
        e.preventDefault();
        let alan = document.querySelector('.uye-sec');
        let uye = uyeListesi.filter(uye => (`${uye.ad} ${uye.soyad}`) == alan.value);

        const body = {
            kutuphaneID: kutuphaneBilgileri.ID,
            uyeID: uye[0].ID
        }
        try {
            client(`api/libraries/deleteUserFromLib`, { body })
                .then(response => {
                    console.log(response)
                    if (response.success) {
                        if (response?.data?.message) {
                            setErrMess(response.data.message);
                        }
                        else {
                            setErrMess("");
                            history.push('/dashboard');
                        }
                    }
                    else {
                        setErrMess(response.message)
                    }

                })
        } catch (err) {
            console.log(err.message)
        }

    }

    return (
        <div className="container mt-5">
            <h3>Üye Sil</h3>

            <form onSubmit={e => submitFunc(e)}>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Lütfen Üyeyi Seçiniz</label>
                    <select className="form-control uye-sec">
                        {
                            uyeListesi && uyeListesi.map(uye => (
                                <option id={uye.ID} key={uye.ID}>{uye.ad} {uye.soyad}</option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    ÜYE SİL
                </button>
            </form>
            {
                errMess ?
                    <div className="alert alert-danger mt-2">{errMess}</div>
                    : null
            }
        </div>
    );
};