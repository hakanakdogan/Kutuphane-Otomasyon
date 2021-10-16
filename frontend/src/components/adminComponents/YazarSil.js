import React, { useEffect, useState } from "react";
import { client } from "../../helpers/httpHelpers";
import { useHistory } from "react-router-dom";

export const YazarSil = () => {
  const [yazarListesi, setYazarListesi] = useState(null);
  let history = useHistory();

  useEffect(() => {
    try {
      client(`api/author/all-authors`).then((response) => {
        if (response.success) {
            console.log(response.data)
            setYazarListesi(response.data);
        } else {
          console.log(response.message);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);


  const submitFunc = (e)=> {
    e.preventDefault();
    let alan = document.querySelector('.yazar-sec');
    let author = yazarListesi.filter(yazar=> (`${yazar.ad} ${yazar.soyad}`) == alan.value);
    try {
        client(`api/author/deleteAuthor/${author[0].ID}`)
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
      <h3>Yazar Sil</h3>

      <form onSubmit={e=>submitFunc(e)}>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Lütfen Yazarı Seçiniz</label>
          <select className="form-control yazar-sec">
            {
                yazarListesi && yazarListesi.map(yazar=>(
                    <option id={yazar.ID} key={yazar.ID}>{yazar.ad} {yazar.soyad}</option>
                ))
            }
        </select>
        </div>

        <button type="submit" className="btn btn-primary">
          YAZAR SİL
        </button>
      </form>
    </div>
  );
};
