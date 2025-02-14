// fare npm init
// fare npm i express
// aggiungere il type module nel package.json
// assegnare express ad una costante
// scaricare nodemon -D per runnarlo in modalità dev e assegnarlo nello script


import express from 'express';


const app = express();

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    return res.send('hello nodemon')
})

app.listen(PORT, () => {
    console.log("funonzia alla porta" + PORT)
})