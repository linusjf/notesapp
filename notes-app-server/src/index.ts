import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

app.use(cors());

const prisma = new PrismaClient();

app.get("/api/notes", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("title and content fields required");
  }
  try {
    const note = await prisma.note.create({
      data: { title, content },
    });

    res.json(note);
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.put("/api/notes/:note_id", async (req, res) => {
  const { title, content } = req.body;
  const note_id = parseInt(req.params.note_id);

  if (!title || !content) {
    return res.status(400).send("title and content fields required");
  }

  if (!note_id || isNaN(note_id)) {
    return res.status(400).send("Note ID must be a valid number");
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { note_id },
      data: { title, content },
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.delete("/api/notes/:note_id", async (req, res) => {
  const note_id = parseInt(req.params.note_id);
  if (!note_id || isNaN(note_id)) {
    return res.status(400).send("Note ID field required");
  }
  try {
    await prisma.note.delete({
      where: { note_id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});
