import express from "express";
import fs from "fs";

const itemsRouter = express.Router();

itemsRouter.get("/items", (req, res) => {
  //request and response
  const { limit } = req.query; //limit arriva come stringa e va convertito
  try {
    console.log("access key : ", req.query.access_key); // nell url se mettiamo ?access_key= vediamo il risultato di quello che gli passiamo
    let dbText = fs.readFileSync("./db.json"); //fs serve per leggere i file
    let dbJson = JSON.parse(dbText); // passa un file da stringa a json
    if (limit) {
      dbJson = { ...dbJson, items: dbJson.items.slice(0, +limit) }; // gli oggetti all'interno del dbJson sono racchiusi in un array e bisogna convertirli cosi.
    }

    // return res.send('<h1>hello nodemon</h1>')
    return res.json(dbJson); //serve a far capire che chi riceve la chiamata capisce che è un json, è uguale a res.send
    //è buona prassi quando si fa res mettere return
  } catch (error) {
    if (error.errno === -4058) {
      //errore ottenuto cambiando il nome del file.
      return res.status(404).json({ message: "not found" }); //messaggio che riceviamo una volta che ci compare error -4058
    }
    res.status(500), json({ message: "ops!" });
  }
});

//nuovo percorso per aggiungere dati nel db "http://localhost:3000/new-item?name=itemaggiuntodalURL&checked=false"

itemsRouter.get("/new-item", (req, res) => {
  const { name, checked } = req.query; //estraggo name dalla query
  const dbText = fs.readFileSync("./db.json");
  const dbJson = JSON.parse(dbText);
  dbJson.items.push({ name, checked: !!checked }); //!!checked converte la stringa in booleano
  fs.writeFileSync("./db.json", JSON.stringify(dbJson));
  return res.json(dbJson); //faccio return del db con il nuovo elemento inserito
});

//abbiamo scaricato postman sul pc e stiamo facendo le chiamate con postman
//la query è una stringa
//il body è un json e possiamo metterci tutto
itemsRouter.post("/items", (req, res) => {
  const { name, checked } = req.body;
  const dbText = fs.readFileSync("./db.json");
  const dbJson = JSON.parse(dbText);
  dbJson.items.push({ name, checked: !!checked });
  fs.writeFileSync("./db.json", JSON.stringify(dbJson));
  /* return res.json({message: `ho ricevuto l'item ${name} con valore ${checked}`}); */
  return res.json(dbJson);
});

export default itemsRouter;
