import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { client } from "../../helpers/httpHelpers";
import loginReducer from './../../reducers/loginReducer';
import { useHistory } from "react-router-dom";

export const Detail = () => {
  let { id } = useParams();
  const [kutuphane, setKutuphane] = useState(null);
  const [kitaplari, setKitaplari] = useState([]);
  const [uyeleri, setUyeleri] = useState([]);
  const [kayitliMi, setKayitliMi] = useState(true);

  let history = useHistory();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { user } = loginReducer;
  useEffect(() => {
    try {
      client(`api/libraries/${id}`).then((response) => {
        if (response.success) {
          setKutuphane(response.data[0]);
          client(`api/libraries/getLibsBooks/${id}`).then((response) => {
            if (response.success) {
              setKitaplari(response.data);
              client(`api/libraries/getLibsUsers/${id}`).then((response) => {
                if (response.success) {
                  setUyeleri(response.data);
                  let isKayitli = uyeleri.filter(uyeler => user.ID === uyeler.ID);
                  console.log(uyeleri);
                  setKayitliMi(isKayitli.length > 0);
                  // console.log(kayitliMi);
                }
              });
            }
          });
        } else {
          // başarısız dönüş olursa
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }, [id, kayitliMi]);


  const registerFunction = (e) => {
    e.preventDefault();
    const body = {
      id,
      userId: user.ID
    };
    client(`api/libraries/registerLib/${id}/${user.ID}`, { body }).then((response) => {
      console.log(response)
      if (response.success) {
        history.push('/dashboard');
      }
    });
  }


  const getBooks = () => (
    <table className="mt-4 table table-striped">
      <thead>
        <tr>
          <th scope="col">Kitap</th>
          <th scope="col">Yazar</th>
          <th scope="col">Yayınevi</th>
        </tr>
      </thead>
      <tbody>
        {kitaplari.map((kitap) => (
          <tr key={kitap.id}>
            <td>{kitap.kitap_ad}</td>
            <td>
              {kitap.ad} {kitap.soyad}
            </td>
            <td>{kitap.yayin_bilgileri}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return kutuphane ? (
    <div className="card detail">
      <div className="card-header">
        <FontAwesomeIcon
          icon={faBook}
          style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
        />
        {kutuphane.isim}
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <img
              class="card-img-top"
              src="https://nebosan.com.tr/wp-content/uploads/2018/06/no-image.jpg"
              alt="Card image cap"
            />

            {
              kayitliMi ? null
                : <button onClick={e => registerFunction(e)} className="btn btn-success w-100">Kayıt Ol</button>
            }


          </div>
          <div className="col-md-9">
            <div className="mb-3 row">
              <div className="col-md-6 books-count">
                <b>Kayıtlı Kitap Sayısı</b>
                <h3>
                  <span class="badge bg-secondary">{kitaplari.length}</span>
                </h3>
              </div>
              <div className="col-md-6 members-count">
                <b>Kayıtlı Üye Sayısı</b>
                <h3>
                  <span class="badge bg-secondary">{uyeleri.length}</span>
                </h3>
              </div>
            </div>

            <p>
              {kutuphane.il} {kutuphane.ilce} {kutuphane.tam_adres}
            </p>
          </div>
        </div>

        {getBooks()}
      </div>
    </div>
  ) : null;
};
