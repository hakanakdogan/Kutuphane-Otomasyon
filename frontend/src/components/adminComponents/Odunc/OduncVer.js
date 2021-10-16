import React, { useState, useEffect } from 'react'
import { client } from "../../../helpers/httpHelpers";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const OduncVer = ({ ID }) => {

    const [uyeler, setUyeler] = useState([]);
    const [kitapList, setKitapList] = useState([]);
    const [errMess, setErrMess] = useState("");


    useEffect(() => {
        try {
            client(`api/libraries/getLibsBooks/${ID}`).then((response) => {
                if (response.success) {
                    console.log(response.data);
                    setKitapList(response.data);
                    client(`api/libraries/getLibsUsers/${ID}`).then((response) => {
                        if (response.success) {
                            console.log(response.data);
                            setUyeler(response.data);
                        } else {
                            console.log(response.message);
                        }
                    });
                } else {
                    console.log(response.message);
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }, [])

    const submitFunc = (e) => {
        e.preventDefault(e);
        let kitapAlan = document.querySelector('.kitap-sec');
        let kitap = kitapList.filter(kitap => (`${kitap.kitap_ad}`) == kitapAlan.value);

        let uyeAlan = document.querySelector('.uye-sec');
        let uye = uyeler.filter(uye => (`${uye.ad} ${uye.soyad}`) == uyeAlan.value);

        console.log(kitap[0])
        console.log(uye[0])
        const body = {
            isbn: kitap[0].ISBN,
            kutuphaneID: ID,
            uyeID: uye[0].ID
        }

        try {
            client(`api/deposit/givedeposit`, { body })
                .then(response => {
                    console.log(response)
                    if (response.success) {
                        if (response?.data?.message) {
                            setErrMess(response.data.message);
                        }
                        else {
                            setErrMess("");

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
        <div className="container mt-5 mb-5">
            <h3>Ödünç Ver</h3>

            <form onSubmit={(e) => submitFunc(e)}>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Lütfen Ödünç Vermek İstediğiniz Kitabı Ve Ödünç Vermek İstediğiniz Kullanıcıyı Seçiniz </label>
                    <select className="form-control kitap-sec">
                        {kitapList &&
                            kitapList.map((kitap) => (
                                <option id={kitap.ID} key={kitap.ID}>
                                    {kitap.kitap_ad}
                                </option>
                            ))}
                    </select>
                    <select className="form-control uye-sec">
                        {uyeler &&
                            uyeler.map((uye) => (
                                <option id={uye.ID} key={uye.ID}>{uye.ad} {uye.soyad}</option>
                            ))}
                    </select>

                </div>

                <button type="submit" className="btn btn-primary">
                    ÖDÜNÇ VER
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
