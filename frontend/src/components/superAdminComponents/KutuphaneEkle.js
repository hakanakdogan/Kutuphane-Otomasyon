import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { client } from "../../helpers/httpHelpers";
import { useHistory } from "react-router-dom";


export const KutuphaneEkle = () => {
    let history = useHistory();

    const [formData, setFormData] = useState({
        il: "",
        ilce: "",
        tam_adres: "",
        isim: ""

    })
    const [uyeler, setUyeler] = useState(null);
    const { il, ilce, tam_adres, isim } = formData;
    useEffect(() => {
        try {
            client(`api/users/get-all-users`).then((response) => {
                if (response.success) {

                    setUyeler(response.data);
                } else {
                    console.log(response.message);
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }, []);
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const submitFunc = (e) => {
        e.preventDefault();
        let alan = document.querySelector('.uye-sec');
        let uye = uyeler.filter(uye => (`${uye.ad} ${uye.soyad}`) == alan.value);
        console.log(uye[0].ID);

        const body = {
            il,
            ilce,
            tam_adres,
            isim,
            admin_id: uye[0].ID
        }
        console.log(body);
        try {
            client(`api/libraries/createLibrary`, { body })
                .then(response => {
                    console.log(response)
                    if (response.success) {
                        history.push('/dashboard');
                    }
                    else {
                        console.log(response.message)
                    }

                })
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="profile mt-5 container">
            <div className="profile-form">
                <h1>Kutuphane Ekle</h1>
                <form onSubmit={e => submitFunc(e)}>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="İsim"
                            id="isim"
                            value={isim}
                            onChange={(e) => onChange(e)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="İl"
                            id="il"
                            value={il}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="İlçe"
                            id="ilce"
                            value={ilce}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <textarea
                                class="form-control"
                                aria-label="With textarea"
                                placeholder="Tam Adres *"
                                cols="50"
                                id="tam_adres"
                                value={tam_adres}
                                onChange={(e) => onChange(e)}
                            ></textarea>
                        </div>

                    </div>
                    <select className="form-control uye-sec">
                        {
                            uyeler && uyeler.map(uye => (
                                <option id={uye.ID} key={uye.ID}>{uye.ad} {uye.soyad}</option>
                            ))
                        }
                    </select>


                    <div className="form-group">
                        <p classname="register-alert-p" >"*" İşaretleri Opsiyoneldir</p>
                    </div>



                    <button type="submit" className="btn-block btn btn-primary">
                        Kütüphane Ekle
          </button>
                </form>
            </div>
        </div>
    )
}
