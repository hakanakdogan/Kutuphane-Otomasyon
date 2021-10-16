import React,{useState} from "react";
import { client } from "../../helpers/httpHelpers";
import { useHistory } from "react-router-dom";

export const YazarEkle = () => {
    const [yazarAdı, setYazarAdı] = useState("");
    const [yazarSoyadı, setYazarSoyadı] = useState("");
    let history = useHistory();

    const submitFunc = (e)=> {
        e.preventDefault();

        const body = {
            ad: yazarAdı,
            soyad: yazarSoyadı
        }
        try {
            client(`api/author/registerAuthor`, { body })
            .then(response => {
                console.log(response)
                if(response.success) {
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
    <div className="container mt-5">
      <h3>Yazar Ekle</h3>

      <form onSubmit={e=>submitFunc(e)}>
        <div className="form-group">
            <input type="text" 
                className="form-control" 
                placeholder="Yazar Adı Giriniz"
                value={yazarAdı}
                onChange={(e)=>{setYazarAdı(e.target.value)}}
                />
        </div>
        <div class="form-group">
        <input type="text" 
                className="form-control" 
                placeholder="Yazar Soyadı Giriniz"
                value={yazarSoyadı}
                onChange={(e)=>{setYazarSoyadı(e.target.value)}}
                />
        </div>
        <button type="submit" className="btn btn-primary">
          YAZAR EKLE
        </button>
      </form>
    </div>
  );
};
