const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;

    const myCourses = await api.get("/api/my-courses", {
      params: { user_id: userId },
    });
    return res.json(myCourses.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        status: "error",
        message: "Service unavailable",
      });
    }
    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json({
        data,
      });
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred",
      });
    }
  }
};
