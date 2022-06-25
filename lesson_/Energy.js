module.exports = class Energy  {
    constructor(x, y){
    this.x = x;
    this.y = y;
    this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1]
    ];
    }

    chooseCell() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 3 || matrix[y][x] == 0 || matrix[y][x] == 2) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    move() {
        var emptyCells = this.chooseCell();
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if(newCell) {
            this.newX = newCell[0];
            this.newY = newCell[1];
            if (matrix[this.newY][this.newX] == 0) {
                matrix[this.newY][this.newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = this.newX
                this.y = this.newY   
            }
            else if(matrix[this.newY][this.newX] == 3 || matrix[this.newY][this.newX] == 2){
                this.mul()
            } 
        }
    }

    mul() {
        if(matrix[this.newY][this.newX] == 3){
            matrix[this.y][this.x] = 0
            let x = Math.floor(Math.random()*15)
            let y = Math.floor(Math.random()*13)       
            if(matrix[y][x] == 0) {
                matrix[y][x] = 3
                PredatorArr.push(new Predator(x,y))
            }
        }
        else if (matrix[this.newY][this.newX] == 2) {
            let x = Math.floor(Math.random()*15)
            let y = Math.floor(Math.random()*13)       
            if(matrix[y][x] == 0) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x,y))
            }
        }
    }
}

