import Note from "../models/Note.js";
import { Request } from "express";
import { Response } from "express";

export async function getAllNotes(req: Request, res: Response) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error occured");
    res.status(500).json({ message: "server error}" });
  }
}

export async function getNotebyId(req: Request, res: Response) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.error("Error occured in getNotebyId");
    res.status(500).json({ message: "server error}" });
  }
}
export async function createNote(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title: title, content: content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error occured");
    res.status(500).json({ message: "server error}" });
  }
}

export async function updateNote(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title: title, content: content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error occured", error);
    res.status(500).json({ message: "server error" });
  }
}

export async function deleteNote(req: Request, res: Response) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
