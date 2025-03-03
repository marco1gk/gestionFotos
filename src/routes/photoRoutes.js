const express = require('express');
const router = express.Router();
const multer = require("multer");
const {uploadPhoto} = require("../controllers/photoController");

const upload = multer({Storage});

router.post("/upload", upload.single("photo"), uploadPhoto);


module.exports = router; 


