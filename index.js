// fare npm init
// fare npm i express
// aggiungere il type module nel package.json
// assegnare express ad una costante
// scaricare nodemon -D per runnarlo in modalità dev e assegnarlo nello script
// il listen deve rimanere in fondo 


import express from 'express';
import fs from 'fs'; //già presente nella libreria express, fs sta per file system


const app = express();

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => { //request and response
    try {
        console.log("access key : " , req.query.access_key); // nell url se mettiamo ?access_key= vediamo il risultato di quello che gli passiamo
        const dbText = fs.readFileSync('./db.json'); //fs serve per leggere i file
        const dbJson = JSON.parse(dbText); // passa un file da stringa a json
        // return res.send('<h1>hello nodemon</h1>')
        return res.json(dbJson); //serve a far capire che chi riceve la chiamata capisce che è un json, è uguale a res.send
        //è buona prassi quando si fa res mettere return
        
    } catch (error) {
        if(error.errno === -4058){ //errore ottenuto cambiando il nome del file.
            return res.status(404).json({message:'not found'}) //messaggio che riceviamo una volta che ci compare error -4058
        }
        res.status(500),json({message:'ops!'})
    }
})

//nuovo percorso per aggiungere dati nel db "http://localhost:3000/new-item?name=itemaggiuntodalURL&checked=false"

app.get('/new-item', (req,res) => {
    const { name, checked } = req.query; //estraggo name dalla query
    const dbText = fs.readFileSync('./db.json');
    const dbJson = JSON.parse(dbText);
    dbJson.items.push({ name, checked: !!checked }); //!!checked converte la stringa in booleano
    fs.writeFileSync('./db.json', JSON.stringify(dbJson));
    return res.json(dbJson); //faccio return del db con il nuovo elemento inserito
})

app.listen(PORT, () => {
    console.log("funonzia alla porta" + PORT)
})