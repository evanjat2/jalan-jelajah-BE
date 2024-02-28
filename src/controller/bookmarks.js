const Bookmark = require("../model/bookmark");

const createBookmark = async (req, res) => {
  if (!req.body) {
    res.status(404).json({ message: "Data cannot be empty" });
  }

  const { place_name, category, city, description, lat, long, price, user_id } =
    req.body;

  try {
    const bookmark = await Bookmark.create(req.body);
    res.status(201).json(bookmark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll();
    res.status(200).json(bookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createBookmark, getAllBookmarks };
