var socket = io();
side = 75
let exanak = 0
function setup() {    
    createCanvas(29.7 * side, 15.6 * side);
    
}


function nkarel(matrix) {
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

             if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }

            rect(x * side, y * side, side, side);


        }
    }
    socket.emit("send matrix",matrix)
}

function back()
{
    function word(horSareV) {
        fill("black")
        textSize(64);
text(horSareV, 1970, 1130);
       
    } 
    for (let i = 0; i < 60; i++) {
        exanak++
        if (exanak >= 0 && exanak <= 15) {
            background("#46E43B")
            word("Գարուն")
        }
        else if (exanak >= 15 && exanak <= 30) {
            background("#F7FF00")
            word("Ամառ")
        }
        else if (exanak >= 30 && exanak <= 45) {
            background("#FFAE00")
            word("Աշուն")
        }
        else if (exanak >= 45 && exanak < 60) {
            background("white")
            word("Ձմեռ")
        }
        if (exanak == 59) {
            exanak = 0
        }
    }
}
function Play() {
    socket.emit("Play")
}
function Delete() {
    socket.emit("Delete")
}

setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)

setInterval(
    function () {
    socket.on('send matrix', back)
    },5000
)