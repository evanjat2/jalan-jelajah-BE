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
    res.status(500).send(err);
  }
};

const addBookmarkByWisataId = async (req, res) => {
  try {
    // Get userId by token
    const userId = req.user.userId;

    const { wisataId } = req.body;
    const docId = userId + wisataId;
    const docRef = db.collection("bookmark").doc(docId);
    doc = await docRef.get();
    if (!doc.exists) {
      await docRef.set({
        wisataId: wisataId,
        userId: userId,
      });
      res.status(200).send({ msg: "Berhasil menambahkan bookmark" });
    } else {
      res.status(400).send({ msg: "Bookmark sudah ditambahkan" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteBookmarkByWisataId = async (req, res) => {
  try {
    // Get userId by token
    const userId = req.user.userId;
    const { wisataId } = req.body;
    const docId = userId + wisataId;
    const docRef = db.collection("bookmark").doc(docId);
    doc = await docRef.get();
    if (doc.exists) {
      await docRef.delete();
      res.status(200).json({ msg: "Bookmark Berhasil dihapus" });
    } else {
      res.status(400).json({ msg: "Tidak ada Bookmark" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addBookmarkByWisataId,
  deleteBookmarkByWisataId,
  getBookmarkByUserId,
};
