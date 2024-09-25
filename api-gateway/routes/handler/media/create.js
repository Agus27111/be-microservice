const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_MEDIA } = process.env;

const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const media = await api.post("/media", req.body);
    return res.json(media.data);
  } catch (error) {
    // Periksa apakah error memiliki response dari Axios
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  }
};
