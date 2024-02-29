const axios = require("axios");

const getrecommendcbf = async (req, res) => {
  try {
    const { category, city, count } = req.body;
    const axiosRes = await axios.post(
      "http://127.0.0.1:5000/recommendcbf",
      req.body
    );
    res.status(200).send(axiosRes.data);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const getrecommendcbf2 = async (req, res) => {
  try {
    const { place_name } = req.body;
    const axiosRes = await axios.post(
      "http://127.0.0.1:5000/recommendcbf2",
      req.body
    );
    res.status(200).send(axiosRes.data);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
module.exports = { getrecommendcbf, getrecommendcbf2 };
