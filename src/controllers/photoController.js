const Photo = require("../models/Photo");

// Obtener todas las fotos de un usuario - Carim
exports.getUserPhotos = async (req, res) => {
    try {
        const { userId } = req.params;
        const photos = await Photo.find({ userId });
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las fotos" });
    }
};