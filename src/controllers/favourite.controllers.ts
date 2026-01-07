import { Request, Response, NextFunction } from "express";

import Note from "../models/Note";
import CustomError from "../middleware/error.handler";
import FavList from "../models/favourite";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { note_id } = req.body;
  const user_id = req.user?._id;
  let favlist:any = null

  try {
    const note = await Note.findOne({ _id: note_id });

    if (!note) {
      throw new CustomError("Note not Found", 404);
    }
    const is_exists = await FavList.findOne({ user: user_id, note: note_id });
    if (is_exists) {
      await is_exists.deleteOne();
    } else {
      favlist = await FavList.create({ user: user_id, note: note_id });
    }
    res.status(200).json({
      message: is_exists ? "Note removed" : "Note Added",
      data: favlist,
      status: "success",
    });
  } catch (error) {
    console.log(error)
    throw new CustomError("Failed to create favourite list", 400);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user?._id;
  try {
    const list = await FavList.find({ user: user_id }).populate('user').populate('note');
    res.status(200).json({
      message: "Your wishlist",
      data: list,
      status: "success",
    });
  } catch (error) {
    throw new CustomError("List not found", 400);
  }
};

export const clearAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user?._id;
  try {
    const list = await FavList.deleteMany({ user: user_id });
    res.status(200).json({
      message: "Your wishlist is empty",
      status: "success",
    });
  } catch (error) {
    throw new CustomError("List not found", 400);
  }
};
