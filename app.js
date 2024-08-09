const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Definir rutas
app.get('/', (req, res) => {
    res.render('index', { locale: 'en_US', data: [] });
});

app.get('/mensual', (req, res) => {
    res.render('mensual', { locale: 'en_US', data: [] });
});

app.get('/quienes-somos', (req, res) => {
    res.render('quienes_somos', { locale: 'en_US', datas: [] });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
