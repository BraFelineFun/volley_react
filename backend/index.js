require('dotenv').config()
const cors = require('cors');
const fileUpload = require('express-fileupload');
const express = require("express");
const path = require('path');

const seq = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');



const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);


// Последний middleware - возвращает ответ
app.use(errorHandler);

const start = async () => {
    try {
        await seq.authenticate();
        await seq.sync();

        app.listen(PORT,
            () => console.log(`Server started on ${PORT}`)
        )
    }
    catch (e) {
        console.log(e);
    }
}

start();