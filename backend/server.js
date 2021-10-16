const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");


const app = express();
const userRouter = require("./src/api/users/userRouter");
const libraryRouter = require("./src/api/libraries/libraryRouter");
const authorRouter = require("./src/api/authors/authorRouter");
const bookRouter = require("./src/api/books/bookRouter");
const categoryRouter = require("./src/api/category/categoryRouter");
const depositRouter = require("./src/api/deposit/depositRouter");

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express.json()); //! GELEN VERILERIN JSON OLARAK ALINMASI
app.use(cookieParser("vtys2021"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        key: "ID",
        secret: "vtys2021",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);


app.use("/api/users", userRouter);
app.use("/api/libraries", libraryRouter);
app.use("/api/author", authorRouter);
app.use("/api/book", bookRouter);
app.use("/api/category", categoryRouter);
app.use("/api/deposit", depositRouter);

app.listen(5000, () => console.log('5000 portu dinleniyor'));