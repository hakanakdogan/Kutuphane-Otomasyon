import React,{useState} from 'react'
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { client } from './../helpers/httpHelpers';
import { useHistory } from "react-router-dom";

export const RegisterPage = () => {
    const loginReducer = useSelector((state) => state.loginReducer);
    const { isLogged } = loginReducer;

    const [ad, setAd] = useState("");
    const [soyad, setSoyad] = useState("");
    const [eposta, setEposta] = useState("");
    const [telefon, setTelefon] = useState("");
    const [sifre, setSifre] = useState("");

    let history = useHistory();
    

    if (isLogged) {
        return (
            <Redirect to="/dashboard" />
        )
    }

    const submitFunc = (e)=> {
        e.preventDefault()
        const body = {
            ad,
            soyad,
            eposta,
            telefon,
            sifre
        }
        console.log(body)
        try {
            client(`api/users/register`, { body })
            .then(response => {
                if(response.success) {
                    history.push('/');
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
        <div className="login">
            <div className="login-form">
                <h1>Kütüphane Uygulaması</h1>
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
                            type="password"
                            className="form-control"
                            placeholder="Şifreniz"
                            value={sifre}
                            onChange={(e)=>{setSifre(e.target.value)}}
                        />
                    </div>
                    {/* <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="İl"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="İlçe"
                        />
                    </div> */}

                    {/* <div className="form-row">
                        <div className="form-group col-md-12">
                            <textarea class="form-control" aria-label="With textarea" placeholder="Tam Adres *" cols="50"></textarea>
                        </div>

                    </div> */}
                    <div className="form-group">
                        <p classname="register-alert-p" >"*" İşaretleri Opsiyoneldir</p>
                    </div>



                    <button type="submit" className="btn-block btn btn-primary">
                        Kayıt Ol!
          </button>
                </form>
            </div>
        </div>
    )
}
