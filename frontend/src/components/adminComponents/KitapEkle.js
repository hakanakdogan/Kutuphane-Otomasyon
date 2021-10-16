import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { client } from "../../helpers/httpHelpers";
import { useHistory } from "react-router-dom";

export const KitapEkle = () => {
  const [kitapISBN, setKitapISBN] = useState("");
  const [ad, setAd] = useState("");
  const [yayin_bilgileri, setYayinBilgileri] = useState("");
  const [miktar, setMiktar] = useState(1);
  const [kategoriListesi, setKategoriListesi] = useState(null);
  const [yazarListesi, setYazarListesi] = useState(null);
  const adminLibRed = useSelector((state) => state.adminLibraryReducer)
  const { ID: kutupID } = adminLibRed;
  let history = useHistory();

  useEffect(() => {
    try {
      client(`api/author/all-authors`).then((response) => {
        if (response.success) {
          console.log(response.data);
          setYazarListesi(response.data);
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

    let kategoriTag = document.querySelector(".kategori-sec");
    let category = kategoriListesi.filter(
      (kategori) => `${kategori.tur}` == kategoriTag.value
    );

    let yazarTag = document.querySelector(".yazar-sec");
    let author = yazarListesi.filter(
      (yazar) => `${yazar.ad} ${yazar.soyad}` == yazarTag.value
    );

    const body = {
      ISBN: kitapISBN,
      ad,
      yayin_bilgileri,
      miktar,
      kategori_id: category[0].ID,
      yazar_id: author[0].ID,
      kutuphaneID: kutupID
    };
    try {
      client(`api/book/addBook`, { body }).then((response) => {
        console.log("abijim burası çalıştı")
        console.log(response);
        if (response.success) {
          history.push("/dashboard");
        } else {
          console.log(response.message);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3>Kitap Ekle</h3>

      <form onSubmit={(e) => submitFunc(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="ISBN Giriniz"
            value={kitapISBN}
            onChange={(e) => {
              setKitapISBN(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Kitap Adı Giriniz"
            value={ad}
            onChange={(e) => {
              setAd(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Yayınevi Giriniz"
            value={yayin_bilgileri}
            onChange={(e) => {
              setYayinBilgileri(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Miktar Giriniz"
            value={miktar}
            onChange={(e) => {
              setMiktar(e.target.value);
            }}
          />
        </div>

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

        <div class="form-group">
          <label for="exampleFormControlSelect1">Lütfen Yazarı Seçiniz</label>
          <select className="form-control yazar-sec">
            {yazarListesi &&
              yazarListesi.map((yazar) => (
                <option id={yazar.ID} key={yazar.ID}>
                  {yazar.ad} {yazar.soyad}
                </option>
              ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          KİTAP EKLE
        </button>
      </form>
    </div>
  );
};
