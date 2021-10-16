import React, { useState } from "react";
import { client } from "../../helpers/httpHelpers";
import { useHistory } from "react-router-dom";

export const KategoriEkle = () => {
  const [tur, setTur] = useState("");
  let history = useHistory();

  const submitFunc = (e) => {
    e.preventDefault();

    const body = {
      tur,
    };
    try {
      client(`api/category/add-category`, { body }).then((response) => {
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
    <div className="mt-5 mb-5 container">
      <h3>Kategori Ekle</h3>
      <form onSubmit={(e) => submitFunc(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Kitap Kategorisi İsmi Giriniz"
            value={tur}
            onChange={(e) => {
              setTur(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          KATEGORİ EKLE
        </button>
      </form>
    </div>
  );
};
