document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const photo = document.getElementById("photo");
    const captureButton = document.getElementById("capture");
    const downloadButton = document.getElementById("download");
    const context = canvas.getContext("2d");

    // Acceder a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.error("Error al acceder a la cámara:", err);
            alert("No se pudo acceder a la cámara.");
        });

    // Capturar foto
    captureButton.addEventListener("click", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Mostrar la foto
        photo.src = canvas.toDataURL("image/png");
        photo.style.display = "block";
        downloadButton.style.display = "inline-block";

        // Ocultar el video
        video.style.display = "none";
    });

    // Descargar la foto
    downloadButton.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = photo.src;
        link.download = "boynextdoor-photo.png";
        link.click();
    });
});
