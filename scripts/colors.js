 var COLOR_NUM = 5;

function getRandomColor () { 
    var c = getRandomRange(0, COLOR_NUM - 1);
    return colors[c];
}


var red = 'RED';
var purple = 'PURPLE';
var yellow = 'YELLOW';
var blue = 'BLUE';
var green = 'GREEN';

var colors = [red, purple, yellow, blue, green];