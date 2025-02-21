// fare npm init
// fare npm i express
// aggiungere il type module nel package.json
// assegnare express ad una costante
// scaricare nodemon -D per runnarlo in modalità dev e assegnarlo nello script
// il listen deve rimanere in fondo
// installo  "npm install prisma @prisma/client" come ORM per il database
// @prisma/client è un ORM (Object Relational Mapping) che permette di interfacciarsi con il database in modo più semplice
// successivamente facciamo "npx prisma init" per inizializzare prisma
import express from "express";
import fs from "fs"; //già presente nella libreria express, fs sta per file system
import itemsRouter from "./routes/items.router.js"; //importo il file items.router.js
import listsRouter from "./routes/lists.route.js"; //importo il file lists.route.js

const app = express();
//è un middleware (servono per validare i dati)
app.use(express.json()); //serve per far comprendere a express i json (ho richiesto e simone ha detto queste parole)
app.use(itemsRouter); //uso il file items.router.js
app.use(listsRouter); //uso il file lists.route.js

const PORT = process.env.PORT || 3000;

//routes
app.use(itemsRouter); //uso il file items.router.js

app.listen(PORT, () => {
  console.log("funonzia alla porta " + PORT);
});
