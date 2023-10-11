// import express from "express";
// import cors from "cors";

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.get("/api/notes", async (req, res) => {
//   res.json({ message: "success!" });
// });

// app.listen(5000, () => {
//   console.log("server running on localhost:5000");
// });

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import expressAsyncHandler from "express-async-handler";

const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

interface Note {
  id: number;
  title: string;
  content: string;
}

// Function to insert a new note
export const addNote = async (
  title: string,
  content: string
): Promise<number> => {
  const db = await dbPromise;
  const result = await db.run(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content]
  );
  return result.lastID as number;
};

// Function to retrieve all notes
export const getAllNotes = async (): Promise<Note[]> => {
  const db = await dbPromise;
  return db.all("SELECT * FROM notes");
};

// Function to retrieve a single note by ID
export const getNoteById = async (id: number): Promise<Note | undefined> => {
  const db = await dbPromise;
  return db.get("SELECT * FROM notes WHERE id = ?", [id]);
};

// Function to update a note by ID
export const updateNote = async (
  id: number,
  title: string,
  content: string
): Promise<number> => {
  const db = await dbPromise;
  const result = await db.run(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );
  return result.changes as number;
};

// Function to delete a note by ID
export const deleteNote = async (id: number): Promise<number> => {
  const db = await dbPromise;
  const result = await db.run("DELETE FROM notes WHERE id = ?", [id]);
  return result.changes as number;
};
