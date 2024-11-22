const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

// MiddleWare para validar los datos pasados en el body
const validateBook = require('../schemas/bookSchema.cjs');


// Devolver todos los libros
router.get('/', async (req, res) =>{    
    try {
        const snapshot = await db.collection('books').get();
        const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(books);
    } catch (error) {
        res.status(500).send(`Error al obtener los libros: ${error.message}`);
    }
});

// Devolver un libro por id

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const doc = await db.collection('books').doc(id).get();
        if(!doc.exists){
            res.status(404).send('No se ha encontrado el libro');
        }
        res.json({id: doc.id, ...doc.data()});
    }catch(error){
        console.error(error);
        res.status(500).send(`Error al devolver el libro: ${error}`);
    }
});

// Crear un libro

router.post('/',validateBook, async (req, res) =>{
    const book = req.book;

    try{
        await db.collection('books').add(book);
        res.send("Libro creado con exito")
    }catch(error){
        console.error(error);
        res.status(500).send(`Error al Crear libro: ${error}`);
    }
});

// Actualizar un libro por id
router.put('/:id', validateBook, async (req, res) =>{

    const { id } = req.params;
    const book = req.book;

    try{
        const bookToUpdate = db.collection('books').doc(id);
        const doc = bookToUpdate.get();
        if(!doc.exists){
            return res.status(404).send('No se ha encontrado el libro');
        }

        await bookToUpdate.update(book);
        res.status(200).send('Libro actualizado correctamente');

    }catch(error){
        console.error(error);
        res.status(500).send(`Error del servidor al modificar un libro: ${error}`);
    }
});

// Borrar un libro por id

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;

    try{
        const bookToDelete = db.collection('books').doc(id);
        const doc = await bookToDelete.get();
        if(!doc.exists){
            return res.status(404).send('No se ha encontrado el libro');
        }

        await bookToDelete.delete();
        res.status(200).send('Libro borrado correctamente');

    }catch(error){
        console.error(error);
        return res.status(500).send(`Error al borrar el libro: ${error}`);
    }

});

module.exports = router;


