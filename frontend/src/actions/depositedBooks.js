export const uploadDepositedBooks = (data) => {
    return {
        type: 'UPLOAD_DEPOSIT_BOOKS',
        payload: {...data}
    }
}