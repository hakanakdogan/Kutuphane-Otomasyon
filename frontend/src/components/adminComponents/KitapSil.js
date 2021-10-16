import React, { useState, useEffect } from 'react'
import { client } from "../../helpers/httpHelpers";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const KitapSil = () => {
    const [kitapList, setKitapList] = useState([]);
    const [miktar, setMiktar] = useState(0);
    const [errMess, setErrMess] = useState("");
    const adminLibraryReducer = useSelector((state) => state.adminLibraryReducer)
    const { ID } = adminLibraryReducer;
    let history = useHistory();
    useEffect(() => {
        try {
            client(`api/libraries/getLibsBooks/${ID}`).then((response) => {
                if (response.success) {
                    console.log(response.data);
                    setKitapList(response.data);
                } else {
                    console.log(response.message);
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }, [])

    const submitFunc = (e) => {
        e.preventDefault();
        let alan = document.querySelector('.kitap-sec');
        let kitap = kitapList.filter(kitap => (`${kitap.kitap_ad}`) == alan.value);

        console.log(kitap[0]);

        const body = {
            isbn: kitap[0].ISBN,
            miktar: miktar,
            kutuphaneID: ID
        }
        try {
            client(`api/book/deleteBook`, { body })
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
    console.log(kitapList)
    return (
        <div className="container mt-5 mb-5">
            <h3>Kitap Sil</h3>

            <form onSubmit={(e) => submitFunc(e)}>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Lütfen Kitabı ve Silmek İstediğiniz Miktarı Seçiniz</label>
                    <select className="form-control kitap-sec">
                        {kitapList &&
                            kitapList.map((kitap) => (
                                <option id={kitap.ID} key={kitap.ID}>
                                    {kitap.kitap_ad}
                                </option>
                            ))}
                    </select>
                    <input className="form-control" type="number" name="miktar" id="miktar" placeholder="Miktar" value={miktar} onChange={(e) => { setMiktar(e.target.value) }} />
                </div>

                <button type="submit" className="btn btn-primary">
                    KİTAP SİL
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
