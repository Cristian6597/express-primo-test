// fare npm init
// fare npm i express
// aggiungere il type module nel package.json
// assegnare express ad una costante
// scaricare nodemon -D per runnarlo in modalità dev e assegnarlo nello script
// il listen deve rimanere in fondo 


import express from 'express';


const app = express();

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => { //request and response
    console.log("access key : " , req.query.access_key) // nell url se mettiamo ?access_key= vediamo il risultato di quello che gli passiamo
    return res.send('<h1>hello nodemon</h1>')
})

app.listen(PORT, () => {
    console.log("funonzia alla porta" + PORT)
})