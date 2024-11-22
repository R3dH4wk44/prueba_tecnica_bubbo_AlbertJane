const validateBook = (req, res, next) => {
    const { title, author, year, genre, rating  } = req.body;

    // Validar Que estan todos los datos

    if(!title) {
        res.status(404).send('No title provided');
    }

    if(!author){
        res.status(404).send('No author provided');
    }
    if(!year){
        res.status(404).send('No year provided');
    }
    if(!genre){
        res.status(404).send('No genre provided');
    }
    if(!rating){
        res.status(404).send('No rating provided');
    }

    // Validar los datos

    if(typeof title !== 'string' || title.length < 1 || title.length > 100) {
        return res.status(400).send("El campo title no ha pasado la validación, debe ser una string 1 y 100 caracteres");
    }

    if(typeof author !== 'string' || author.length < 1 || author.length > 100) {
        return res.status(400).send("El campo author no ha pasado la validación, debe ser una string 1 y 100 caracteres");
    }
    if(!Number.isInteger(year) || year > new Date().getFullYear()){
        return res.status(400).send("El campo year es invalido, debe ser un numero integro y menor o igual al año actual");
    }
    if(typeof genre !== 'string' || genre.length < 1 || genre.length > 100) {
        return res.status(400).send("El campo genre no ha pasado la validación, debe ser una string 1 y 100 caracteres");
    }
    if(typeof rating !== 'number' || rating < 0.0 || rating > 5.0){
        return res.status(400).send('El campo rating debe ser un numero entre 0.0 y 5.0');
    }

    req.book = { title, author, year, genre, rating }
    next();
}

module.exports = validateBook;
