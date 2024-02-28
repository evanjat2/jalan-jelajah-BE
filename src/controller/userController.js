const { db } = require("../db/firestore");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const path = require("path");
const dotenv = require("dotenv");

const getUserFromUsername = async (username) => {
  try {
    const userRef = db.collection("users").where("username", "==", username);
    const user = await userRef.get();
    return user.docs.length > 0;
  } catch (error) {
    console.log(error);
  }
};

// const { name, username, password, email } = req.body;
const signUp = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    if (!name || !username || !password || !email) {
      res.status(400).send("Mohon isikan semua input dengan benar!");
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
            res.status(400).send("Username telah digunakan!");
          }
        });
      });
    }
  } catch (err) {
    res.status(500).send(err);
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
          res.status(400).send("Kredensial Invalid");
        }
      } else {
        res.status(400).send("Kredensial Invalid");
      }
    }
  } catch (error) {
    res.status(500).send("Terjadi masalah pada server");
  }
};

const getByID = async (req, res) => {
  // const userID = req.params.uid;
};

const edit = async (req, res) => {
  // if (!req.body) {
  //   res.status(404).json({ message: "Data cannot be empty" });
  // }
};

module.exports = { signIn, signUp, getByID, edit };
