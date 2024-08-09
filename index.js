const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // Suponiendo que usas EJS como motor de plantillas

// Ruta para la función "excel"
app.get('/', async (req, res) => {
    const tempFilePath = "https://docs.google.com/spreadsheets/d/1P1nPtXT8c2SL8m8SF3c9Jx9D-1jt2BOe/export?format=xlsx";

    try {
        // Descargar el archivo y guardarlo en un archivo temporal
        const response = await axios({
            url: tempFilePath,
            method: 'GET',
            responseType: 'arraybuffer',
        });
        fs.writeFileSync(tempFilePath, response.data);

        // Leer el archivo Excel
        const workbook = XLSX.readFile(tempFilePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = [];

        // Recorrer las filas del archivo Excel
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        rows.forEach((row, index) => {
            if (index !== 1) {
                data.push({
                    'A': row[0],
                    'B': row[1],
                    'C': row[2]
                });
            }
        });

        // Eliminar el archivo temporal
        fs.unlinkSync(tempFilePath);

        // Renderizar la vista con los datos
        res.render('index', { data });
    } catch (error) {
        console.error('Error al cargar el archivo:', error.message);
        res.status(500).send('Error al cargar el archivo.');
    }
});

// Ruta para la función "resultados"
app.get('/quienes-somos', async (req, res) => {
    const tempFilePath = "https://docs.google.com/spreadsheets/d/1P1nPtXT8c2SL8m8SF3c9Jx9D-1jt2BOe/export?format=xlsx";

    try {
        const response = await axios({
            url: tempFilePath,
            method: 'GET',
            responseType: 'arraybuffer',
        });
        fs.writeFileSync(tempFilePath, response.data);

        const workbook = XLSX.readFile(tempFilePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const datas = [];

        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        rows.forEach((row, index) => {
            if (row && row.length > 0) {
                datas.push({
                    'D': row[3],
                    'E': row[4],
                    'F': row[5],
                    'G': row[6]
                });
            }
        });

        fs.unlinkSync(tempFilePath);
        res.render('quienes_somos', { datas });
    } catch (error) {
        console.error('Error al cargar el archivo:', error.message);
        res.status(500).json({ error: 'Error al cargar el archivo: ' + error.message });
    }
});

// Ruta para la función "mensual"
app.get('/mensual', async (req, res) => {
    const tempFilePath = "https://docs.google.com/spreadsheets/d/1P1nPtXT8c2SL8m8SF3c9Jx9D-1jt2BOe/export?format=xlsx";

    try {
        const response = await axios({
            url: inputFileName,
            method: 'GET',
            responseType: 'arraybuffer',
        });
        fs.writeFileSync(tempFilePath, response.data);

        const workbook = XLSX.readFile(tempFilePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const datasm = [];

        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        rows.forEach((row, index) => {
            if (index !== 1) {
                datasm.push({
                    'I': row[8],
                    'J': row[9]
                });
            }
        });

        fs.unlinkSync(tempFilePath);
        res.render('mensual', { datasm });
    } catch (error) {
        console.error('Error al cargar el archivo:', error.message);
        res.status(500).send('Error al cargar el archivo.');
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
