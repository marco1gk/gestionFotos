const API_URL= "http://localhost:1234/api/photos"

document.getElementById("Uploadform").addEventListener("submit",async (e)=>{
    e.preventDefault();
    const userId=document.getElementById("userId").ariaValueMax

    const photo= document.getElementById("photo").files[0];

    if(!userId || !photo){
        alert("por favor ingresse in ide de usuairo y gfoto");
        return;
    }

    const formDta= new FormData();
    formDta.append("userId",userId);
    formDta.append("photo",photo);

    try {
        const response = await fetch('{$API_URL}/upload',{
           method: "POST",
           body: formDta
        });
        const data = await response.json();
        alert(data.message);
        //loadPhotos(userId);//recargar galeria
    }catch(error){
        console.log("error al subir imagen")
    }
});

const loadPhotos = async(userId)=>{
    try{
        const response = await fetch(`{$API_URL}/${userId}`);
        const photos =await response.json();
        const gallery= document.getElementById("gallery");
        gallery.innerHTML="";
        photos.forEach(photo => {
            const photoCard = document.createElement("div");
            photoCard.classList.add("photo-card");

            photoCard.innerHTML='<img src="http://localhost:3000/${photo.imageUrl}" alt="Foto subida">'

            gellery.appendChild(photoCard);
        })
    }catch(error){
        console.log("eror al cargar fotos")
    }
}