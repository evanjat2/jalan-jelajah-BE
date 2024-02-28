const getResponse = (req, res) => {
  try {
    res.status(200).json("Berhasil");
  } catch {
    res.send("Gagal");
  }
};

module.exports = { getResponse };
