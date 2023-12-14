const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(helmet());
app.use(morgan('common'));

app.listen(8000, () => {
    try {
        console.log('Backend server is running');
    } catch (e) {
        console.log(e);
    }
})