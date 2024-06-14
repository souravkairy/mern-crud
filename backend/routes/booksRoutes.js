import { Book } from "../model/bookModel.js";
import express from "express";

const router = express.Router();

//Route for save
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all the required field: title, author, publish year",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

//Route for grab all
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(201).send(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

//Route for grab one
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

//Route for update
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    return res.status(400).send({
      message: "send all the required field: title, author, publish year",
    });
  }

  try {
    const book = await Book.findByIdAndUpdate(id, req.body);

    if (!book) {
      return res.status(500).send("Data Not updated, Please try again later");
    }
    return res.status(201).send("Data Updated successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

//Route for delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(500).send("Data Not deleted, Please try again later");
    }
    return res.status(200).send("Data Deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

export default router;
