import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { client } from "../../helpers/httpHelpers";
import { uploadDepositedBooks } from "../../actions/depositedBooks";
import depositedBooksReducer from './../../reducers/depositedBooksReducer';

export const AlinanKitaplar = () => {
  const [hata, setHata] = useState("");
  const loginReducer = useSelector((state) => state.loginReducer);
  const { user } = loginReducer;
  let history = useHistory();
  const dispatch = useDispatch();

  const depositedBooksReducer = useSelector((state) => state.depositedBooksReducer);
  const bookR = depositedBooksReducer;
  const [books, setBooks] = useState(bookR);

  useEffect(() => {
    try {
      client(`api/deposit/getUsersDepositedBooks/${user.ID}`).then(
        (response) => {
          if (response.success) {
            if (response?.data?.message) {
              setHata(response.data.message);
            }
            else {
              setHata("");
              dispatch(uploadDepositedBooks(response.data));
              setBooks({ data: response.data });
            }
          } else {
            setHata("Bir hata oluştu");
          }
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div className="alinan-kitaplar">
      <h1>
        <center>
          <FontAwesomeIcon
            icon={faBook}
            style={{ fontSize: "2rem", marginRight: "0.5rem" }}
          />
          Elinizdeki Kitaplar
        </center>
      </h1>
      <div className="elinizdeki-kitaplar">
        <br />
        {hata ? (
          <div className="alert alert-info w-100">
            <center>{hata}</center>
          </div>
        ) : null}

        {
          books?.data.length > 0 && books.data.map((kitap) => (
            <div class="elinizdeki-kitaplar-card-container">
              <div class="card elinizdeki-kitaplar-card shadow-sm bg-white rounded">
                <div class="card-body">
                  <h5 class="card-title">
                    {kitap.kitap_ad} | {kitap.yazar_ad} {kitap.yazar_soyad}
                  </h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><strong>ISBN </strong>{kitap.ISBN}</li>
                  <li class="list-group-item"><strong>Kategori </strong>{kitap.tur}</li>
                  <li class="list-group-item"><strong>Alınma Zamanı </strong>{kitap.alinma_tarihi.slice(0, 10)}</li>
                  <li class="list-group-item">
                    <div className="row">
                      <div className="col-md-6 last-date">
                        <FontAwesomeIcon
                          icon={faHistory}
                          style={{ fontSize: "1rem", marginRight: "0.5rem" }}
                        />
                        Son Teslim
                      </div>
                      <div className="col-md-6">{kitap.teslim_tarihi.slice(0, 10)}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
