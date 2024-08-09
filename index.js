const express = require('express');
const axios = require('axios');
const XLSX = require('xlsx');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // Suponiendo que usas EJS como motor de plantillas

// Función para descargar y procesar el archivo Excel
const processExcelFile = async (url) => {
    try {
        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'arraybuffer',
        });

        // Leer el archivo Excel desde el buffer
        const workbook = XLSX.read(response.data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    } catch (error) {
        throw new Error('Error al descargar o procesar el archivo: ' + error.message);
    }
};

// Ruta para la función "excel"
app.get('/', async (req, res) => {
    const inputFileName = "https://docs.google.com/spreadsheets/d/1P1nPtXT8c2SL8m8SF3c9Jx9D-1jt2BOe/export?format=xlsx";

    try {
        const rows = await processExcelFile(inputFileName);
        const data = [];

        rows.forEach((row, index) => {
            if (index !== 1) {
                data.push({
                    'A': row[0],
                    'B': row[1],
                    'C': row[2]
                });
            }
        });

        res.render('index', { data });
    } catch (error) {
        console.error('Error al cargar el archivo:', error.message);
        res.status(500).send('Error al cargar el archivo.');
    }
});

// Ruta para la función "resultados"
app.get('/quienes-somos', async (req, res) => {
    const inputFileName = "https://docs.google.com/spreadsheets/d/1P1nPtXT8c2SL8m8SF3c9Jx9D-1jt2BOe/export?format=xlsx";

    try {
        const rows = await processExcelFile(inputFileName);
        const datas = [];

        rows.forEach((row) => {
            if (row && row.length > 0) {
                datas.push({
                    'D': row[3],
                    'E': row[4],
                    'F': row[5],
                    'G': row[6]
                });
            }
        });

        res.render('quienes_somos', { datas });
    } catch (error) {
        console.error('Error al cargar el archivo:', error.message);
        res.status(500).json({ error: 'Error al cargar el archivo: ' + error.message });
    }
});

// Ruta para la función "mensual"
app.get('/mensual', async (req, res) => {
    const inputFileName = "https://docs.google.com/spreadsheets/d/1P1nPtXT8c2SL8m8SF3c9Jx9D-1jt2BOe/export?format=xlsx";

    try {
        const rows = await processExcelFile(inputFileName);
        const datasm = [];

        rows.forEach((row, index) => {
            if (index !== 1) {
                datasm.push({
                    'I': row[8],
                    'J': row[9]
                });
            }
        });

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
