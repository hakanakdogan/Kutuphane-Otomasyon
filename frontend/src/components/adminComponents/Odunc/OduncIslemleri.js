import React, { useState, useEffect } from 'react'
import { client } from "../../../helpers/httpHelpers";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { OduncVer } from './OduncVer';
import { OduncGeriAl } from './OduncGeriAl';




export const OduncIslemleri = () => {
    const adminLibraryReducer = useSelector((state) => state.adminLibraryReducer)
    const { ID } = adminLibraryReducer;
    return (
        <div>
            <OduncVer ID={ID} />
            <hr />
            <OduncGeriAl ID={ID} />
        </div>
    )
}
