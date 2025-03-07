const API_URL= "http://localhost:1234/api/photos"

document.getElementById("uploadForm").addEventListener("submit",async (e)=>{
    e.preventDefault();
    let userId = document.getElementById("userId").value;
    console.log(userId);
    let photo= document.getElementById("photo").files[0];

    console.log(photo);
    if(!userId || !photo){
        if(!userId){
            console.log("falló el user id");
        }
        if(!photo){
            console.log("falló foto");
        }
    }

    const formDta= new FormData();
    formDta.append("userId",userId);
    formDta.append("photo",photo);

    try {
        const response = await fetch(`${API_URL}/upload`,{
           method: "POST",
           body: formDta
        });
        const data = await response.json();
        alert(data.message);
        loadPhotos(userId);//recargar galeria
    }catch(error){
        console.log("error al subir imagen")
    }
});

const loadPhotos = async(userId)=>{
    try{
        const response = await fetch(`${API_URL}/${userId}`);
        const photos =await response.json();
        const gallery= document.getElementById("gallery");
        console.log(photos.length);
        gallery.innerHTML='';
        photos.forEach(photo => {
            console.log(photo.imageUrl);
            
            const photoCard = document.createElement("div");
            photoCard.classList.add('photo-card');
            console.log("URL de la imagen:", photo.imageUrl);

            photoCard.innerHTML=`<img src="http://localhost:1234/${photo.imageUrl}" alt="Foto subida">`

            gallery.appendChild(photoCard);
        })
    }catch(error){
        alert("vales verga")
        console.log("eror al cargar fotos")
    }
}