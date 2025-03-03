const Photo = require("../models/Photo");
exports.uploadPhoto = async (req,res) => {
    try{
        const {userId} = req.body;
        const imageUrl = req.file.path;

        const newPhoto = new Photo({userid, imageUrl});
        
        await newPhoto.save();
        
        res.status(201).json({message: "Foto subida con exito", photo: newPhoto});


    }catch(error){
        res.status(500).json({error: "Error al subir la foto"});
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

// Eliminar una foto
exports.deletePhoto = async (req, res) => {
    try {
    const { id } = req.params;
    await Photo.findByIdAndDelete(id);
    res.status(200).json({ message: "Foto eliminada con éxito" });
    } catch (error) {
    res.status(500).json({ error: "Error al eliminar la foto" });
    }
    };
