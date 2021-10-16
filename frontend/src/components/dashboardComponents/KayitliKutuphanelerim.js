import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { client } from "../../helpers/httpHelpers";

const KayitliKutuphanelerim = () => {
  const [kutuphaneListesi, setKutuphaneListesi] = useState(null);
  const loginReducer = useSelector((state) => state.loginReducer);
  const { user } = loginReducer;
  let history = useHistory();

  const showDetail = (id) => {
    history.push(`libs/${id}`);
  }

  useEffect(() => {
    try {
      client(`api/libraries/getAllRegisterLib/${user.ID}`)
        .then(response => {
          if (response.success) {
            console.log(response.data)
            setKutuphaneListesi(response.data)
          }
          else {
            // başarısız dönüş olursa
          }

        })
    } catch (err) {
      console.log(err.message)
    }
  }, [])

  return (
    <div>
      {kutuphaneListesi && kutuphaneListesi.map((kutuphane) => (
        <div key={kutuphane.ID} className="lib-card card mb-4 shadow-sm bg-white rounded" onClick={() => showDetail(kutuphane.ID)}>
          <div className="row">
            <div className="col-md-9">
              <div className="card-body">
                <h5 className="card-title">{kutuphane.isim}</h5>
                <hr />
                <p className="card-text">
                  Adres: {kutuphane.il} {kutuphane.ilce} {kutuphane.tam_adres}</p>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};
export default KayitliKutuphanelerim;

