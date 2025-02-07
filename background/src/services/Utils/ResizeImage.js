export default function ResizeImage(imageUrl, size) {
    return new Promise(async (resolve, reject) => {
        fetch(imageUrl).then(response => response.blob())
            .then(createImageBitmap)
            .then(function (blobImage) {
                const offscreen = new OffscreenCanvas(size, size),
                    gl = offscreen.getContext("2d");
                gl.drawImage(blobImage, 0, 0, size, size);
                offscreen.convertToBlob().then(async function (blob) {
                    const readerL = new FileReader();
                    readerL.readAsDataURL(blob);
                    readerL.onload = function (evt) {
                        resolve(evt.target.result);
                    };
                })
            })


    })
}
