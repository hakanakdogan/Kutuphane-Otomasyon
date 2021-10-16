import React, { useState, useEffect } from 'react'
import { client } from "../../helpers/httpHelpers";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const KutuphaneSil = () => {
    const [kutuphaneListesi, setKutuphaneListesi] = useState([]);
    const [errMess, setErrMess] = useState("");
    let history = useHistory();
    useEffect(() => {
        try {
            client(`api/libraries/all-libraries`)
                .then(response => {
                    if (response.success) {
                        setKutuphaneListesi(response.data)
                    }
                    else {
                        // başarısız dönüş olursa
                    }

                })
        } catch (err) {
            console.log(err.message)
        }
    }, [])

    const submitFunc = (e) => {
        e.preventDefault();
        let alan = document.querySelector('.kutuphane-sec');
        let kutuphane = kutuphaneListesi.filter(kutuphane => (`${kutuphane.isim}`) == alan.value);


        try {
            client(`api/libraries/removeLib/${kutuphane[0].ID}`)
                .then(response => {


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
                        console.log("buraya düştü")
                    }

                })
        } catch (err) {
            console.log(err)
            setErrMess(err.message)
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <h3>Kütüphane Sil</h3>

            <form onSubmit={(e) => submitFunc(e)}>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Lütfen  Silmek İstediğiniz Kütüphaneyi Seçiniz</label>
                    <select className="form-control kutuphane-sec">
                        {kutuphaneListesi &&
                            kutuphaneListesi.map((kutuphane) => (
                                <option id={kutuphane.ID} key={kutuphane.ID}>
                                    {kutuphane.isim}
                                </option>
                            ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    KÜTÜPHANE SİL
                </button>
            </form>

            {
                errMess ?
                    <div className="alert alert-danger mt-2">{errMess}</div>
                    : null
            }
        </div>
    )
}
