const Photo = require("../models/Photo");
const fs = require("fs");
const path = require("path");

exports.uploadPhoto = async (req,res) => {
    try{
        const {userId} = req.body;
        const imageUrl = req.file.path;

        const newPhoto = new Photo({userId, imageUrl});
        
        await newPhoto.save()
        .then(() => console.log("Photo saved"))
        .catch((err) => console.error("Error saving photo:", err));

        
        res.status(201).json({
            message: "Foto subida con éxito",
            photoId: newPhoto._id, // Aquí se devuelve el ID
            photo: newPhoto
        });

    }catch(error){
        res.status(500).json({error: "Error al subir la foto",error});
    }
};

exports.getUserPhotos = async (req, res) => {
    try {
        const { userId } = req.params;
        const photos = await Photo.find({ userId });
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las fotos" });
    }
};

exports.deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar la foto en la BD para obtener la ruta del archivo
        const photo = await Photo.findById(id);
        if (!photo) {
            return res.status(404).json({ error: "Foto no encontrada" });
        }

        // Eliminar la imagen del sistema de archivos
        const imagePath = path.resolve(photo.imageUrl);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error al eliminar el archivo:", err);
            }
        });

        // Eliminar la foto de la base de datos
        await Photo.findByIdAndDelete(id);

        res.status(200).json({ message: "Foto eliminada con éxito" });
    } catch (error) {
        console.error("Error al eliminar la foto:", error);
        res.status(500).json({ error: "Error al eliminar la foto" });
    }
};

exports.getAllPhotos = async (req,res) => {
    try{
        Photo.find({}).then(function (photo) {
            res.send(photo);
        });
    }
}