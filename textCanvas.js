/*
    TODOS:
    * Save as string (HTML, textContent, and pure whitespace)
    * Save in local storage?
    * addRow()
    * addCol()
    * Provide instructions on how to use the app
    * Let user determine size of canvas
*/

class TextCanvas extends Canvas {
    constructor() {
        super();

        this.width = 0;
        this.height = 0;
        this.contents = []; // basically the canvas itself

        // Uses event.keyCode
        this.movementMap = {
            // arrow keys
            38: new this.Vector(0, -1), // up
            40: new this.Vector(0, 1), // down
            37: new this.Vector(-1, 0), // left
            39: new this.Vector(1, 0) // right
        }

        // Uses event.keyCode
        this.deleteMap = {
            8: new this.Vector(-1, 0), // Backspace
            32: new this.Vector(1, 0), // Space
            13: new this.Vector(0, 1), // Enter
            46: new this.Vector(0, 0) // Delete
        }
    }

    // Execute this before doing anything else
    build(width, height) {
        this.width = width;
        this.height = height;
        this.contents = [];

        // Populate contents.
        for (let y = 0; y < this.height; y++) {
            this.contents.push(new Array(this.width));
            for (let x = 0; x < this.width; x++) {
                this.insert(x, y, this.createCell(x, y));
            }
        }
    }

    // Also serves as function to clear TextCanvas.
    bind(element) { // Rename? bind isn't completely accurate
        if (typeof element == "string") {
            element = document.getElementById(element);
        }

        element.innerHTML = "";

        let row;
        let previousY = -1;

        this.forEach((x, y) => {
            if (y != previousY) {
                row = this.createRow(y);
                previousY = y;
            }
            row.appendChild(this.get(x, y));
            if (x == this.width - 1) {
                element.appendChild(row);
            }
        });
    }

    moveSelector(x, y) {
        if (x instanceof this.Vector) {
            y = x.y;
            x = x.x;
        }
        if (this.check(x, y)) {
            this.get(x, y).focus();
        }
    }

    createCell(x, y) {
        if (x instanceof this.Vector) {
            y = x.y;
            x = x.x;
        }

        let ele = document.createElement("span");
        ele.tabIndex = x + (this.width * y);
        ele.className = "cell";
        ele.dataset.position = new this.Vector(x, y);

        let position = JSON.parse(ele.dataset.position);
        position = new this.Vector(position.x, position.y);
        let vec;

        ele.addEventListener("keypress", (event) => {
            if (!this.deleteMap[event.keyCode] && event.charCode > 0) {
                this.paintCell(ele, event.key);
            }
        });

        ele.addEventListener("keydown", (event) => {
            if (this.movementMap[event.keyCode]) {
                vec = this.movementMap[event.keyCode];

                // Put this code in movementMap?

                // wrap backwards
                if (position.x == 0 && event.keyCode == 37) {
                    vec = new this.Vector((this.width - 1), 0);

                    // wrap forwards
                } else if (position.x == this.width - 1 && event.keyCode == 39) {
                    vec = new this.Vector(-(this.width - 1), 0);

                    // wrap upwards
                } else if (position.y == 0 && event.keyCode == 38) {
                    vec = new this.Vector(0, (this.height - 1));

                    // wrap downwards
                } else if (position.y == this.height - 1 && event.keyCode == 40) {
                    vec = new this.Vector(0, -(this.height - 1));
                }

                this.moveSelector(position.add(vec));

            } else if (this.deleteMap[event.keyCode]) {
                vec = this.deleteMap[event.keyCode];

                this.clearCell(ele);

                if (position.x == this.width - 1 && event.keyCode == 32) {
                    vec = new this.Vector(-(this.width - 1), 1);
                } else if (position.x == 0 && event.keyCode == 8) {
                    vec = new this.Vector(this.width - 1, -1);
                }
                this.moveSelector(position.add(vec));
            }
        });

        return ele;
    }

    paintCell(ele, key) {
        ele.textContent = key;
    }

    clearCell(ele) {
        ele.textContent = "";
    }

    createRow(y) {
        if (y instanceof this.Vector) {
            y = y.y;
        }

        let row = document.createElement("div");
        row.className = "row";
        row.dataset.y = y;
        return row;
    }

    isBuilt() {
        if (this.contents) {
            return true;
        } else {
            return false;
        }
    }

    toString() {
        let str = "";

        this.forEach((x, y) => {
            let char = this.get(x, y).textContent;
            if (char == "") {
                char = " ";
            }
            
            str += char;

            if (x == this.width - 1) {
                str += "\n";
            }
        });

        return str;
    }
}
