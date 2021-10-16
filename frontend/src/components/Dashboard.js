import React from "react";
import { useHistory } from "react-router-dom";
import { AlinanKitaplar } from "./dashboardComponents/AlinanKitaplar";
import { useSelector } from "react-redux";
import EnYakinKutuphane from "./dashboardComponents/EnYakinKutuphane";
import { AdminDashboard } from "./adminComponents/AdminDashboard";
import { SuperAdminDashboard } from "./superAdminComponents/SuperAdminDashboard";

const Dashboard = () => {
  let history = useHistory();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { user } = loginReducer;

    const push = (address) => {
        history.push(`${address}`);
    }

    const UserDashboard = ()=> {
      return (
        <div>
          <EnYakinKutuphane />
          <AlinanKitaplar />
    
          <div class="btn-group w-100" role="group">
            <button onClick={ ()=>push('/kutuphanelerim') } type="button" class="btn btn-info">
              KAYITLI OLDUĞUM KÜTÜPHANELERİ GÖSTER
            </button>
            <button onClick={ ()=>push('/tum-kutuphaneler') } type="button" class="btn btn-secondary">
              TÜM KÜTÜPHANELERİ GÖSTER
            </button>
          </div>
    
        </div>
      );
    }

    return user.admin==0 ? UserDashboard() : user.admin==1 ? <AdminDashboard /> : <SuperAdminDashboard />
  
};
export default Dashboard;
