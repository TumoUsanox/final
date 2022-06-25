var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function generate(matLenX,matLenY,gr,grEat,pr,En) {
    let matrix = []
    for (let i = 0; i < matLenY; i++) {
        matrix[i] = []
        for (let j = 0; j < matLenX; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random()*matLenX)
        let y = Math.floor(Math.random()*matLenY)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random()*matLenX)
        let y = Math.floor(Math.random()*matLenY)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random()*matLenX)
        let y = Math.floor(Math.random()*matLenY)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < En; i++) {
        let x = Math.floor(Math.random()*matLenX)
        let y = Math.floor(Math.random()*matLenY)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    return matrix
}



function Play() {
    matrix = generate(15,13,45,45,45,45)
        grassArr = []
        grassEaterArr = []
        PredatorArr = []
        energyArr = []

        Grass = require("./Grass")
        GrassEater = require("./GrassEater")
        Predator = require("./Predator")
        Energy = require("./Energy")

        function createObject(matrix) {
            
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {

                    if (matrix[y][x] == 1) {
                        let gr = new Grass(x, y)
                        grassArr.push(gr)

                    } else if (matrix[y][x] == 2) {
                        let gr = new GrassEater(x, y)
                        grassEaterArr.push(gr)

                    } else if (matrix[y][x] == 3) {
                        let gr = new Predator(x, y)
                        PredatorArr.push(gr)

                    }else if (matrix[y][x] == 4) {
                        let gr = new Energy(x, y)
                        energyArr.push(gr)

                    }
                }
            }
        }

        io.sockets.emit('send matrix', matrix)

        function game() {
            for(var i in grassArr){
                grassArr[i].mul()
            }
            for(let i in grassEaterArr) {
                grassEaterArr[i].eat()
            }
            for(var i in PredatorArr){
                PredatorArr[i].eat()
            }
            for(var i in energyArr){
                energyArr[i].move()
            }
            io.sockets.emit('send matrix', matrix)
        }
createObject(matrix)
        setInterval(game, 1000)

    }
function Delete() { 
        grassArr = []
        grassEaterArr = []
        PredatorArr = []
        energyArr = []
        
        for (let i = 0; i < 13; i++) {
            matrix[i] = []
            for (let j = 0; j < 15; j++) {
                matrix[i][j] = 0
            }
        }
}
io.on('connection', function (socket) {
                
    socket.on("Play",Play)
    socket.on("Delete",Delete)
})
