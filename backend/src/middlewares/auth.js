const { verify } = require("jsonwebtoken");

const checkJwt = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (token) {
        verify(token, "myjwtsecret", (err, decoded) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Please Authenticate"
                })
            } else {
                next();
            }
        })
    } else {
        res.json({
            success: 0,
            message: "Please Authenticate!"
        })
    }
}



module.exports = {
    checkJwt
}