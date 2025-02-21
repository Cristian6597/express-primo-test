import express from "express";
import prisma from "../prisma/prismaClient.js";

const listsRouter = express.Router();

listsRouter.post("/lists", async (req, res) => {
  const { title, description, favourite } = req.body;
  try {
    const newList = await prisma.list //await si usa per aspettare che la promise venga risolta
      .create({
        data: {
          title,
          description,
          favourite,
        },
      });
    res.json(newList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "lista non creata!" });
  }
});

listsRouter.get("/lists", async (req, res) => {
  try {
    const lists = await prisma.list.findMany({
      orderBy: {
        createdAt: "asc",
      },
    }); // per prenderne piu di uno, possiamo passargli dei filtri/parametri
    res.json(lists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "impossibile caricare le liste" });
  }
});

listsRouter.get("/lists/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const list = await prisma.list.findUnique({ where: { id: +id } }); //trasforma la stringa in numero, è uguale a parseInt(id) i : si mettono perchè oggetto chiave valore
    if (!list) {
      return res.status(404).json({ message: "lista non trovata" });
    } else {
      res.json(list);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "impossibile caricare la lista" });
  }
});

export default listsRouter;
