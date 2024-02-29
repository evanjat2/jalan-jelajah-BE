const { db } = require("../db/firestore");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const path = require("path");
const dotenv = require("dotenv");

const getBookmarkByUserId = async (req, res) => {
  try {
    // Get userId by token
    const userId = req.user.userId;
    const docRef = db.collection("bookmark").where("userId", "==", userId);
    const snapshot = await docRef.get();
    const docsArray = []; // Array to collect documents
    snapshot.forEach((doc) => {
      docsArray.push(doc.data());
    });
    res.status(200).json({ bookmarks: docsArray });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi masalah pada server" });
  }
};

const addBookmarkByWisataId = async (req, res) => {
  try {
    // Get userId by tokenres.status(500).send(err);
    const userId = req.user.userId;
    const {
      placeId,
      category,
      city,
      description,
      lat,
      long,
      place_name,
      price,
    } = req.body;
    const docId = userId + placeId;
    const docRef = db.collection("bookmark").doc(docId);
    doc = await docRef.get();
    if (!doc.exists) {
      await docRef.set({
        userId: userId,
        placeId: placeId,
        category: category,
        city: city,
        description: description,
        lat: lat,
        long: long,
        place_name: place_name,
        price: price,
      });
      data = {
        placeId,
        category,
        city,
        description,
        lat,
        long,
        place_name,
        price,
      };
      res.status(200).send({ msg: "Berhasil menambahkan bookmark", data });
    } else {
      res.status(400).send({ msg: "Bookmark sudah ada dilist" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Terjadi masalah pada server" });
  }
};

const deleteBookmarkByWisataId = async (req, res) => {
  try {
    // Get userId by token
    const userId = req.user.userId;
    const { placeId } = req.body;
    const docId = userId + placeId;
    const docRef = db.collection("bookmark").doc(docId);
    doc = await docRef.get();
    if (doc.exists) {
      await docRef.delete();
      res.status(200).json({ msg: "Bookmark Berhasil dihapus" });
    } else {
      res.status(400).json({ msg: "Tidak ada Bookmark" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Terjadi masalah pada server" });
  }
};

module.exports = {
  addBookmarkByWisataId,
  deleteBookmarkByWisataId,
  getBookmarkByUserId,
};
