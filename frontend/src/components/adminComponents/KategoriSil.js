import React, { useEffect, useState } from "react";
import { client } from "../../helpers/httpHelpers";
import { useHistory } from "react-router-dom";

export const KategoriSil = () => {
  const [kategoriListesi, setKategoriListesi] = useState(null);
  let history = useHistory();

  useEffect(() => {
    try {
      client(`api/category/get-all-categories`).then((response) => {
        if (response.success) {
          console.log(response.data);
          setKategoriListesi(response.data);
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
    let alan = document.querySelector(".kategori-sec");
    let category = kategoriListesi.filter(
      (kategori) => `${kategori.tur}` == alan.value
    );
    try {
      client(`api/category/delete-category/${category[0].ID}`).then(
        (response) => {
          console.log(response);
          if (response.success) {
            history.push("/dashboard");
          } else {
            console.log(response.message);
          }
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3>Kategori Sil</h3>

      <form onSubmit={(e) => submitFunc(e)}>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Lütfen Kategori Seçiniz</label>
          <select className="form-control kategori-sec">
            {kategoriListesi &&
              kategoriListesi.map((kategori) => (
                <option id={kategori.ID} key={kategori.ID}>
                  {kategori.tur}
                </option>
              ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          KATEGORİ SİL
        </button>
      </form>
    </div>
  );
};
