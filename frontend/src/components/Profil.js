import React,{useState, useEffect} from 'react'
import { client } from '../helpers/httpHelpers';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update } from '../actions/auth';

export const Profil = () => {
    const loginReducer = useSelector((state) => state.loginReducer);
    const { user } = loginReducer;
    const dispatch = useDispatch();
    console.log(user);
    const [ad, setAd] = useState(user.ad);
    const [soyad, setSoyad] = useState(user.soyad);
    const [eposta, setEposta] = useState(user.eposta);
    const [telefon, setTelefon] = useState(user.telefon);
    const [il, setIl] = useState(user.il);
    const [ilce, setIlce] = useState(user.ilce);
    const [tam_adres, setTamAdres] = useState(user.tamAdres);

    let history = useHistory();


    const submitFunc = (e)=> {
        e.preventDefault();
        let ID = user.ID;
        let sifre = {user};
        const body = {
            ad,
            soyad,
            telefon,
            eposta,
            sifre,
            ID,
            il,
            ilce,
            tam_adres,
            admin: user.admin
        }
        console.log(body)
        try {
            client(`api/users/update`, { body })
            .then(response => {
                if(response.success) {
                    dispatch(update(body))
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
                <h1>Bilgilerimi Güncelle</h1>
                <form onSubmit={e=>submitFunc(e)}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ad"
                                value={ad}
                                onChange={(e)=>{setAd(e.target.value)}}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Soyad"
                                value={soyad}
                                onChange={(e)=>{setSoyad(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email Adresiniz"
                            value={eposta}
                            onChange={(e)=>{setEposta(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Telefon Numaranız"
                            value={telefon}
                            onChange={(e)=>{setTelefon(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="İl"
                            value={il}
                            onChange={(e)=>{setIl(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="İlçe"
                            value={ilce}
                            onChange={(e)=>{setIlce(e.target.value)}}
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
                            onChange={(e)=>{setTamAdres(e.target.value)}}
                            ></textarea>
                        </div>

                    </div>
                    <div className="form-group">
                        <p classname="register-alert-p" >"*" İşaretleri Opsiyoneldir</p>
                    </div>



                    <button type="submit" className="btn-block btn btn-primary">
                        GÜNCELLE
          </button>
                </form>
            </div>
        </div>
    )
}
