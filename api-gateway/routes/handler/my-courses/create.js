const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: "User data not found" });
    }

    const userId = req.user.id;
    const courseId = req.body.course_id;

    const myCourse = await api.post("/api/my-courses", {
      user_id: userId,
      course_id: courseId,
    });
    return res.json(myCourse.data);
  } catch (error) {
    console.error("Error:", error); // Log the full error object for debugging
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        status: "error",
        message: "service unavailable",
      });
    }

    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json({
        data,
      });
    } else {
      // Handle other types of errors that don't have a response object
      return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred",
      });
    }
  }
};
