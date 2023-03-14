const express = require("express");
const { date } = require("joi");
const router = express.Router();
const multer = require("multer");
const { path } = require("../app");
const ProdController = require("../controllers/prodController");
//const { verifyUser, verifyAdmin } = require("../middleware/verifyToken");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];
    callback(null, `${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};  

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

router.post("/createProduct", upload.single("productImage"), ProdController.createProduct);

router.get("/show", ProdController.getProducts);

module.exports = router;
