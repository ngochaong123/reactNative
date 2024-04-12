const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456789', //adjust as needed
    database: 'thongtin', //adjust as needed
    connectionLimit: 10 // Adjust as needed
});

//remember to adjust the links
//api get
app.get('/sinhvien', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM sinhvien');
        connection.release();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Error fetching items' });
    }
});

//find with id
app.get('/sinhvien/:ID', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM sinhvien WHERE id = ?', [id]);
        connection.release();
        if (rows.length === 0) {
            // If no item found with the specified ID
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.status(200).json(rows[0]); // Return the first item (should be unique)
        }
    } catch (error) {
        console.error('Error fetching item by ID:', error);
        res.status(500).json({ error: 'Error fetching item by ID' });
    }
});

app.post('/sinhvien', async (req, res) => {
    const {Name, Diem, Khoa} = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO sinhvien (Name, Diem, Khoa) VALUES (?, ?, ?)', [Name, Diem, Khoa]);
        connection.release();
        res.status(201).end();
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Error adding item' });
    }
});

//api put
app.put('/sinhvien/:ID', async (req, res) => {
    const { ID } = req.params;
    const { name, Diem, Khoa } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.query('UPDATE sinhvien SET ID = ?, name = ?, Diem = ? ,Khoa = ? WHERE ID = ?', [ID, name, Diem, Khoa]);
        connection.release();
        res.status(200).end();
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Error updating item' });
    }
});

//api delete
app.delete('/sinhvien/:ID', async (req, res) => {
    const { ID } = req.params;
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM sinhvien WHERE ID = ?', [ID]);
        connection.release();
        res.status(200).end();
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Error deleting item' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});