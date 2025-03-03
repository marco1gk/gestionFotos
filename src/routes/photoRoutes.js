const express = require("express");
const router = express.Router();
const multer = require("multer");
const {getUserPhotos} = require("../controllers/photoController");

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
    destination: "./uploads/", filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Definir rutas
router.get("/:userId", getUserPhotos);

module.exports = router;