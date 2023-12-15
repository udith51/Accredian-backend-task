const express = require("express")
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql");
const authRoute = require("./routes/auth");
const setupRoute = require("./routes/setup.js")
const db = require("./config/database");

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(helmet());
app.use(morgan('common'));
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database is running");
    }
})
app.use(cors());

app.use("/", setupRoute);
app.use('/auth', authRoute);



app.listen(process.env.APP_PORT, () => {
    try {
        console.log('Backend server is running');
    } catch (e) {
        console.log(e);
    }
})