const INITIAL_STATE = {
    isLogged: false,
    loading: true,
    user: null
}

const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log("reducerden gelen payload")
            console.log(action.payload)
            return {
                ...state,
                user: action.payload,
                isLogged: true,
                loading: false
            }

        case "UPDATE_USER":
            console.log(action.payload)
            return {
                ...state,
                user: action.payload,
            }
            break;
        case "LOGOUT":
            return {
                ...state,
                isLogged: false,
                loading: false,
                user: null
            }
        default:
            return state;
    }
}

export default loginReducer;