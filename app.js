const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname';
mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'yourdbname'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});


app.get('/', (req, res) => {
    res.send('Welcome to iReader Server');
});

app.get('/api/data', (req, res) => {
    mysqlConnection.query('SELECT * FROM your_table', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
