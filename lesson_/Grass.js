let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature{
   
    mul() {
        
        this.multiply++;
            let emptyCells = super.chooseCell(0)            
            let newCell = emptyCells[Math.round(Math.random() * emptyCells.length)]

            if (newCell && this.multiply >= 5) {
                let x = newCell[0]
                let y = newCell[1]
                matrix[y][x] = 1;
                
                var gr = new Grass(x, y)
                grassArr.push(gr)
                this.multiply = 0;
            }
    }
}