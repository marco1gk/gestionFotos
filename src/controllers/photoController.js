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
            photoId: newPhoto._id,
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
        console.log(photos.length);
        res.status(200).json(photos);
        
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las fotos" });
    }
};

exports.deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;

        const photo = await Photo.findById(id);
        if (!photo) {
            return res.status(404).json({ error: "Foto no encontrada" });
        }

        const imagePath = path.resolve(photo.imageUrl);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error al eliminar el archivo:", err);
            }
        });

        await Photo.findByIdAndDelete(id);

        res.status(200).json({ message: "Foto eliminada con éxito" });
    } catch (error) {
        console.error("Error al eliminar la foto:", error);
        res.status(500).json({ error: "Error al eliminar la foto" });
    }
};