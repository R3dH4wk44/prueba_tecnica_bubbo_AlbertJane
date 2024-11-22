const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const fs = require("fs");
dotenv.config();



const serviceAccount = JSON.parse(process.env.FIREBASE_JSON);
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
        clientEmail: serviceAccount.client_email,
    }),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Api funcionando correctamente')
})


// Definir las rutas en un enrutador apartado
const booksRoutes = require('./routes/booksRoutes.cjs');

app.use("/books", booksRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
