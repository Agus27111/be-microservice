const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const { Media } = require("../models"); // Import model Media dari models/index.js

router.post("/", async (req, res) => {
  const { image } = req.body;

  if (!image || !isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({
      status: "error",
      message: "Invalid base64 image",
    });
  }

  try {
    // Save base64 image to disk
    const filepath = await new Promise((resolve, reject) => {
      base64Img.img(image, "./public/images", Date.now(), (err, filepath) => {
        if (err) {
          return reject(err);
        }
        resolve(filepath);
      });
    });

    const filename = filepath.split("/").pop();

    // Save media information to the database
    const media = await Media.create({ image: `images/${filename}` }); // Perbaiki menjadi Media.create

    return res.json({
      status: "success",
      data: {
        id: media.id,
        image: `${req.get("host")}/images/${filename}`,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = router;
