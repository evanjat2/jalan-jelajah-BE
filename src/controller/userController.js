const { db } = require("../db/firestore");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const path = require("path");
const dotenv = require("dotenv");

const getUserFromUsername = async (username) => {
  try {
    const userRef = db.collection("users").where("username", "==", username);
    const user = await userRef.get();
    const userArray = []; // Array to collect documents
    user.forEach((doc) => {
      userArray.push(doc.id);
    });
    return userArray[0];
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    if (!name || !username || !password || !email) {
      res.status(400).json({ msg: "Mohon isikan semua input dengan benar!" });
    } else {
      const user = await getUserFromUsername(username);
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          // Store hash in your password DB.
          if (!user) {
            const docRef = db.collection("users").doc();
            await docRef.set({
              name: name,
              username: username,
              password: hash,
              email: email,
            });
            const user = { name, username, password, email };
            const userId = docRef.id;
            const payload = {
              user: user,
              userId: userId,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_LIFETIME,
            });
            res.status(200).json({ user, token });
          } else {
            res.status(400).json({ msg: "Username telah digunakan!" });
          }
        });
      });
    }
  } catch (err) {
    res.status(500).json({ msg: "Terjadi masalah pada server" });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send("Mohon isikan kredensial dengan benar");
    } else {
      const userRef = db.collection("users").where("username", "==", username);
      const user = await userRef.get();
      if (user.docs.length > 0) {
        const doc = user.docs[0];
        const comparePasswords = (password, hashedPassword) => {
          return new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            });
          });
        };
        const passwordMatch = await comparePasswords(
          password,
          doc.data().password
        );
        if (passwordMatch) {
          const user = doc.data();
          user.password = undefined;
          const userId = doc.id;
          const payload = {
            user: user,
            userId: userId,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
          });
          res.status(200).json({ user, token });
        } else {
          res.status(400).json({ msg: "Kredensial Invalid" });
        }
      } else {
        res.status(400).json({ msg: "Kredensial Invalid" });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const updateProfil = async (req, res) => {
  try {
    // Get user id from token
    const userId = req.user.userId;
    const { name, username, email } = req.body;
    const checkUser = await getUserFromUsername(username);
    console.log("user id", userId);
    console.log("check user", checkUser);
    if (checkUser == userId || checkUser == undefined) {
      if (username && email && name) {
        payload = {
          name: name,
          username: username,
          email: email,
        };
        const userRef = db.collection("users").doc(userId);
        await userRef.update(payload);
        res.status(200).json({ msg: "Berhasil update profil", user: payload });
      } else {
        res.status(400).json({ msg: "Isikan semua kolom yang tersedia" });
      }
    } else {
      res.status(400).json({ msg: "Username telah digunakan" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { signIn, signUp, updateProfil };
