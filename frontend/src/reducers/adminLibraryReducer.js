const INITIAL_STATE= {
    isim: "",
    il: "",
    ilce: "",
    tam_adres: "",
    ID: ""
}

const adminLibraryReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOAD_ADMINS_LIBRARY":
            console.log('a');
            const obje = {
                ...state,
                ...action.payload,
            }
            console.log(obje);
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

export default adminLibraryReducer;