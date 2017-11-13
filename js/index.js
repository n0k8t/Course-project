function createPaint(parent) {
    var canvas = elt('canvas', {width: 1000, height: 600});
    var cx = canvas.getContext('2d');
    var toolbar = elt('div', {span: 'toolbar'}); //<div class="toolbar">_______</div>

    for (var name in controls)
        toolbar.appendChild(controls[name](cx));

    var panel = elt('div', {span: 'picturepanel'}, canvas);
    parent.appendChild(elt('div', null, panel, toolbar));
}

function elt(name, attributes) {
    var node = document.createElement(name);
    if (attributes) {
        for (var attr in attributes)
            if (attributes.hasOwnProperty(attr))
                node.setAttribute(attr, attributes[attr]);
    }
    for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];

        if (typeof child == 'string')
            child = document.createTextNode(child);
        node.appendChild(child);
    }
    return node;
}
function relativePos(event, element) {
    var rect = element.getBoundingClientRect();
    return {
        x: Math.floor(event.clientX - rect.left),
        y: Math.floor(event.clientY - rect.top)
    };
}
function trackDrag(onMove, onEnd) {
    function end(event) {
        removeEventListener('mousemove', onMove);
        removeEventListener('mouseup', end);
        if (onEnd)
            onEnd(event);
    }

    addEventListener('mousemove', onMove);
    addEventListener('mouseup', end);
}
function loadImageURL(cx, url)  {
    var image = document.createElement('img');
    image.addEventListener('load', function() {
        var color = cx.fillStyle, size = cx.lineWidth;
        cx.canvas.width = image.width;
        cx.canvas.height = image.height;
        cx.drawImage(image, 0, 0);
        cx.fillStyle = color;
        cx.strokeStyle = color;
        cx.lineWidth = size;
    });
    image.src = url;
}


function _1turn(value) {
    var res = elt('res', {type: 'color'});
    value ? res = transparent : res = black;
    return elt('span', null, 'Color: ', res);
}//_1turn(stance) '0' or '1'
function _2pos(val1,val2) {

}//_2pos(x, y)
function _3move(val1,val2) {

}//_3move(newX, newY)
function _4rectangle(val1,val2) {

}//_4rectangle(sizeX, sizeY)
function _5size(value) {

}//_5size(someSize)
function _6color(value) {
    var res = elt('res', {type: 'color'});
    res = value;
    return elt('span', null, 'Color: ', res);
}//_6color(codeRGB)
function _7for(val1, val2, val3) {

}//_7for(i, n, step)
//function _8if(value) {}//_8if(case)
function _9openURL(value) {

}//_9openURL(url)
//function _10var(name, value) {}//_10var(name, value)


var controls = Object.create(null);

controls.tool = function (cx) {
    var select = elt('select');

    for (var name in tools)
        select.appendChild(elt('option', null, name));

    cx.canvas.addEventListener('mousedown', function (event) {

        if (event.which) {

            tools[select.value](event, cx);
            event.preventDefault();
        }
    });

    return elt('span', null, 'Tool: ', select);
};
controls.color = function (cx) {
    var input = elt('input', {type: 'color'});

    input.addEventListener('change', function () {
        cx.fillStyle = input.value;
        cx.strokeStyle = input.value;
    });
    return elt('span', null, 'Color: ', input);
};
controls.brushSize = function (cx) {
    var select = elt('select');

    var sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];

    sizes.forEach(function (size) {
        select.appendChild(elt('option', {value: size}, size + ' pixels'));
    });

    select.addEventListener('change', function () {
        cx.lineWidth = select.value;
    });
    return elt('span', null, 'Brush size: ', select);
};
controls.openURL = function (cx) {
    var input = elt('input', {type: 'text'});
    var form = elt('form', null, 'Open URL: ', input, elt('button', {type: 'submit'}, 'load'));
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        loadImageURL(cx, form.querySelector('input').value);
    });
    return form;
};
controls.openFile = function (cx) {
    var input = elt('input', {type: 'file'});
    input.addEventListener('change', function() {
        if (input.files.length === 0) return;
        var reader = new FileReader();
        reader.addEventListener('load', function() {
            loadImageURL(cx, reader.result);
        });
        reader.readAsDataURL(input.files[0]);
    });
    return elt('div', null, 'Open file:', input);
};
controls.commandLine = function (cx) {
    var input = elt('input',{type: 'text'});
    var form = elt('form',null, 'Command line:', input, elt('button', {type: 'submit'}, 'enter'));
    form.addEventListener('submit', function(event) {
        event.preventDefault();
       input;
    });
    return form;
};


var tools = Object.create(null);

tools.Line = function (event, cx, onEnd) {
    cx.lineCap = 'round';

    var pos = relativePos(event, cx.canvas);
    trackDrag(function (event) {
        cx.beginPath();

        cx.moveTo(pos.x, pos.y);

        pos = relativePos(event, cx.canvas);

        cx.lineTo(pos.x, pos.y);

        cx.stroke();
    }, onEnd);
};
tools.Erase = function (event, cx) {

    cx.globalCompositeOperation = 'destination-out';

    tools.Line(event, cx, function () {
        cx.globalCompositeOperation = 'source-over';
    });
};
tools.Rectangle = function(event, cx) {
    var leftX, rightX, topY, bottomY
    var clientX = event.clientX,
        clientY = event.clientY;

    var placeholder = elt('div', {class: 'placeholder'});
    var initialPos = relativePos(event, cx.canvas);
    var xO = clientX - initialPos.x,
        yO = clientY - initialPos.y;

    trackDrag(function(event) {
        document.body.appendChild(placeholder);

        var currentPos = relativePos(event, cx.canvas);
        var startX = initialPos.x,
            startY = initialPos.y;


        if (startX < currentPos.x) {
            leftX = startX;
            rightX = currentPos.x;
        } else {
            leftX = currentPos.x;
            rightX = startX;
        }

        if (startY < currentPos.y) {
            topY = startY;
            bottomY = currentPos.y;
        } else {
            topY = currentPos.y;
            bottomY = startY;
        }


        placeholder.style.background = cx.fillStyle;

        placeholder.style.left = leftX + xO + 'px';
        placeholder.style.top = topY + yO + 'px';
        placeholder.style.width = rightX - leftX + 'px';
        placeholder.style.height = bottomY - topY + 'px';
    }, function() {
        cx.fillRect(leftX, topY, rightX - leftX, bottomY - topY);
        document.body.removeChild(placeholder);
    });
};


var appDiv = document.querySelector('#paint');
createPaint(appDiv);