const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const { Media } = require("../models");
const fs = require("fs").promises;

router.get("/", async (req, res) => {
  try {
    const media = await Media.findAll({
      attributes: ["id", "image"],
    });

    const mappedMedia = media.map((m) => {
      m.image = `${req.get("host")}/${m.image}`;
      return m;
    });

    return res.status(201).json({
      status: "success all media",
      data: mappedMedia,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image || !isBase64(image, { mimeRequired: true })) {
      return res.status(400).json({
        status: "error",
        message: "Invalid base64 image",
      });
    }

    const saveImage = () => {
      return new Promise((resolve, reject) => {
        base64Img.img(image, "./public/images", Date.now(), (err, filepath) => {
          if (err) {
            return reject(err);
          }
          const filename = filepath.split("/").pop();
          resolve(filename);
        });
      });
    };

    const filename = await saveImage();
    console.log("🚀 ~ router.post ~ filename:", filename);

    const media = await Media.create({
      image: `${filename.replace(/\\/g, "/")}`,
    });
    console.log(
      "🚀 ~ router.post ~ `images/${filename.replace(/\\/g, " / ")}`:",
      `${filename.replace(/\\/g, "/")}`
    );

    // Berikan respon
    return res.json({
      status: "success",
      data: {
        id: media.id,
        image: `${req.get("host")}/${media.image}`,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findByPk(id);

    if (!media) {
      return res.status(404).json({
        status: "error",
        message: "Media not found",
      });
    }

    try {
      const link = `${media.dataValues.image}`;

      await fs.unlink(link);
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "Failed to delete image file",
      });
    }

    await Media.destroy({ where: { id: id } });

    return res.status(200).json({
      status: "success",
      message: "Media deleted successfully",
      data: media,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

router.put("/", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
