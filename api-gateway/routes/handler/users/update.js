const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_USER } = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    
    const { id } = req.user;
    const user = await api.put(`/users/${id}`, req.body);
    return res.json(user.data);
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
