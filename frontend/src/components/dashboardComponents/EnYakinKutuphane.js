import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapSigns } from "@fortawesome/free-solid-svg-icons";
import { client } from "../../helpers/httpHelpers";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EnYakinKutuphane = () => {
  const [yakinKutuphane, setYakinKutuphane] = useState(null);
  const loginReducer = useSelector((state) => state.loginReducer);
  const { user } = loginReducer;

  useEffect(() => {
    try {
      client(`api/libraries/get-nearest-library/${user.ID}`).then(
        (response) => {
          if (response.success) {
            setYakinKutuphane(response.data[0]);
            console.log(yakinKutuphane);
          } else {
            // başarısız dönüş olursa
          }
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div class="card text-center mb-4 en-yakin-kutuphane">
      {yakinKutuphane ? (
        <div>
          <h1>
            <center>
              <FontAwesomeIcon
                icon={faMapSigns}
                style={{ fontSize: "2rem", marginRight: "0.5rem" }}
              />
              Size En Yakın Kütüphane
            </center>
          </h1>
          <div class="card-body">
            <h5 class="card-title">{yakinKutuphane?.isim}</h5>
            <p class="card-text">
              {yakinKutuphane?.il}, {yakinKutuphane?.ilce},{" "}
              {yakinKutuphane?.tam_adres}
            </p>

            <Link to={`libs/${yakinKutuphane?.ID}`}>
              <button class="btn btn-success">Kütüphane Bilgileri</button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default EnYakinKutuphane;
