const INITIAL_STATE = {
    data: []
};

const depositedBooksReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {

        case 'UPLOAD_DEPOSIT_BOOKS':
            return {
                ...state,
                data: {...action.payload}
            };
            
        default:
            return state;
    }
}

export default depositedBooksReducer;