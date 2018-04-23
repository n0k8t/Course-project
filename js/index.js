var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.lineWidth = 5 ;
context.lineCap = 'round';
var down = false;
var params = [];
var FAQ = "Каждая команда пишется с новой строки\n" +
    "\n" +
    "1\tline(x,y,x2,y2)\t\t\t Проведение линии из x.y в x2.y2\n" +
    "2\tcircle(x,y,R)\t\t\t\t Окружность с радиусом R из точки x.y\n" +
    "3\trectangle(x,y,width,height)\t Прямоугольник из x.y с шириной width и высотой height\n" +
    "4\tcolor(clrCode)\t\t\t\t Изменить значение цвета. Необходим код цвета( Пример: #ff00ff )\n" +
    "5\tsize(szNumber)\t\t\t Изменить значение толщины линии. Необходимо чило, толщина в пиксилях\n" +
    "6\tdot(x,y)\t\t\t\t\t\t Ставит точку в x.y\n" +
    "7\thelp\t\t\t\t\t\t Выводит краткое описание команд. Сама по себе интроверт(Работает в гордом одиночесве)";

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
canvas.addEventListener('mouseout', function() {
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
function triggerClickFile() {
    document.getElementById('file').click();
}
function runCode() {
    var val = $("#text").val();
    for (var i = 0; val.split('\n')[i] !=  null; i++) {
        if(val.split('\n')[i] == "help") {
            alert(FAQ)
        } else // HELP PARSE-FUNCTION
            if(val.split('\n')[i].split('(')[0] == "color") {
                context.strokeStyle = val.split('\n')[i].split('(')[1].slice(0,-1);
                context.fillStyle = val.split('\n')[i].split('(')[1].slice(0,-1);
            } else // COLOR PARSE-FUNCTION
                if(val.split('\n')[i].split('(')[0] == "size") {
                    context.lineWidth = val.split('\n')[i].split('(')[1].slice(0,-1);
                } else // SIZE PARSE-FUNCTION
                    if(val.split('\n')[i].split('(')[0] == "line") {
                        for (var m = 0; m < 4; m++){
                            params[m] = (val.split('\n')[i].split('(')[1].split(',')[m]);
                        }
                        context.beginPath();
                        context.moveTo(+(params[0]),+(params[1]));
                        context.lineTo(+(params[2]),+(params[3].slice(0,-1)));
                        context.stroke();
                    } else // LINE PARSE-FUNCTION
                        if(val.split('\n')[i].split('(')[0] == "circle") {
                            for (var m = 0; m < 3; m++){
                                params[m] = (val.split('\n')[i].split('(')[1].split(',')[m]);
                            }
                            context.beginPath();
                             context.arc(params[0],params[1],params[2].slice(0,-1),0,2*Math.PI);
                            context.stroke();
                        } else // CIRCLE PARSE-FUNCTION
                            if(val.split('\n')[i].split('(')[0] == "rectangle") {
                                for (var m = 0; m < 4; m++){
                                    params[m] = (val.split('\n')[i].split('(')[1].split(',')[m]);
                                }
                                context.rect(params[0],params[1],params[2],params[3].slice(0,-1));
                                context.stroke();
                            } else // RECTANGLE PARSE-FUNCTION
                                if(val.split('\n')[i].split('(')[0] == "dot") {
                                    for (var m = 0; m < 3; m++){
                                        params[m] = (val.split('\n')[i].split('(')[1].split(',')[m]);
                                    }
                                    context.rect(params[0],params[1].slice(0,-1),1,1);
                                    context.stroke();
                                } else// DOT PARSE-FUNCTION
                                    alert('COMMAND NOT VALID')
    }
}

/*------------------ Вставка картинки в полотно --------------------*/
document.getElementById('file').addEventListener('change',function (e) {
    clearCanvas();
    URL = URL || webkitURL;
    var temp = URL.createObjectURL(e.target.files[0]);
    var image = new Image();
    image.src = temp;

    image.addEventListener('load', function ()  {
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
        if(newImageHeight > 600)
        {
            newImageHeight = 600;
            newImageWidth = 600 * originalImageRatio;
        }

        context.drawImage(image, 0, 0, newImageWidth, newImageHeight);
        URL.revokeObjectURL(temp);
    })
});



/*                            Неработающий говнокод
************************************************************************************
************************************************************************************
function cmd(ths) {
    document.getElementById('commandLine').innerHTML = ths.value.split(';\n')[0];
    for (i = 0; ths.value.split(';\n')[i] != null; i++) {
    switch (ths.value.split(';\n')[i]) {
        case 'variable':
            alert('variable');
            break;
        case variablePos:
            alert('variablePos');
            break;
        case goto:
            alert('goto');
            break;
        case drawLine:
            alert('drawLine');

            canvas.context.lineTo(100, 60);
            break;
        case drawCircle:
            alert('drawCircle');
            break;
        case drawRectangle:
            alert('drawRectangle');
            break;
        case changeClr:
            alert('changeLineColor');
            break;
        case changeSize:
            alert('changeSize');
            break;
        case clear:
            clearCanvas();
            break;
        case help:
            alert('help');
            break;
        default:
            alert('I don\'t know such command');
    }
}
}
************************************************************************************
************************************************************************************
*/
