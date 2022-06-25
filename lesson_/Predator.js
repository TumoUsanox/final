let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature{
    constructor(x, y){
        super(x, y);
        this.energy = 12
    }
    
    
    move() {
		this.energy--;
		var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell && this.energy >= 0) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = 3;
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
		}

		
		 else {
			this.die();
		}


	}
    
	eat() {
		var grasseaterCells = super.chooseCell(2);
		var newCell = grasseaterCells[Math.floor(Math.random() * grasseaterCells.length)]

		if (newCell) {
            this.energy++;
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = 3;
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
			for (var i in grassEaterArr) {
				if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
					grassEaterArr.splice(i, 1);
					break;
				}
			}

			if (this.energy >= 8) {
				this.mul();
			}

		}
		else {
			this.move();
		}
	}

	mul() {
		var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = 3

            var predator = new Predator(newX, newY)
            PredatorArr.push(predator)
			this.energy = 8;
		}
	}

	die() {
        matrix[this.y][this.x] = 0
        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }
	}
}

function rnd(min,max) {
	return Math.floor(Math.random() * (min - max) + min)
}