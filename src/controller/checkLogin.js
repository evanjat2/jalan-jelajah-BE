const checkToken = (req, res) => {
  try {
    const userId = req.user.userId;
    res.status(200).json({ msg: "Token Valid" });
  } catch {
    res.status(400).json({ msg: "Token Invalid" });
  }
};

module.exports = { checkToken };
