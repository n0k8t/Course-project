var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.lineWidth = 5 ;
context.lineCap = 'round';
var down = false;

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousedown',function() {
    down = true;
    context.beginPath();
    context.moveTo(xPos, yPos);
    canvas.addEventListener("mousemove", draw);

});

canvas.addEventListener('mouseup', function() {
    down = false;
});

function draw(e) {
      xPos = e.clientX - canvas.offsetLeft;
      yPos = e.clientY - canvas.offsetTop;

      if(down == true) {
          context.lineTo(xPos, yPos);
          context.stroke();
      }
}

function changeColor(color) {
    context.strokeStyle = color;
    context.fillStyle = color;
}
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function changeBrushSize(size) {
    context.lineWidth = size;
}
function triggerClick() {
    document.getElementById('file').click();
}

document.getElementById('file').addEventListener('change',function (e) {
<<<<<<< HEAD
    clearCanvas();

=======
>>>>>>> 791563238605d38c1f60d8fdadfde74c85ce9a96
    var temp = URL.createObjectURL(e.target.files[0]);
    var image = new Image();
    image.src = temp;

    image.addEventListener('load', function () {
        imageWidth = image.naturalWidth;
        imageHeight = image.naturalHeight;
        newImageWidth = imageWidth;
        newImageHeight = imageHeight;
        originalImageRatio = imageWidth / imageHeight;

        if(newImageWidth > newImageHeight && newImageWidth > 1000)
        {
            newImageWidth = 1000;
            newImageHeight = 1000 / originalImageRatio;
        }
        if(newImageWidth > newImageHeight && newImageHeight > 600
            || newImageHeight > newImageWidth && newImageHeight > 600)
        {
            newImageHeight = 600;
            newImageWidth = 600 * originalImageRatio;
        }
        if(newImageHeight === newImageWidth && newImageHeight > 600)
        {
            newImageHeight = 600;
            newImageWidth = 600;
        }

        context.drawImage(image, 0, 0, newImageWidth, newImageHeight);
    })
})
