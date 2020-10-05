class Spot {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.col = 255;

        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.neighbors = [];
        this.previous = undefined;
        this.wall = false;

        if (random(1) < 0.4) {
            this.wall = true;
        }
    }
    show(gapX, gapY, col = this.col) {
        // this.col = col;
        fill(col);
        if (this.wall) {
            fill(0);
        }
        noStroke();
        rect(this.x * gapX, this.y * gapY, gapX - 1, gapY -
            1);
    }

    addNeighbors(grid) {
        if (this.x < cols - 1) {
            this.neighbors.push(grid[this.x + 1][this.y]);
        }
        if (this.x > 0) {
            this.neighbors.push(grid[this.x - 1][this.y]);
        }
        if (this.y < rows - 1) {
            this.neighbors.push(grid[this.x][this.y + 1]);
        }
        if (this.y > 0) {
            this.neighbors.push(grid[this.x][this.y - 1]);
        }
        if (this.x > 0 && this.y > 0) {
            this.neighbors.push(grid[this.x - 1][this.y - 1]);
        }
        if (this.x < cols - 1 && this.y > 0) {
            this.neighbors.push(grid[this.x + 1][this.y - 1]);
        }
        if (this.x > 0 && this.y < rows - 1) {
            this.neighbors.push(grid[this.x - 1][this.y + 1]);
        }
        if (this.x < cols - 1 && this.y < rows - 1) {
            this.neighbors.push(grid[this.x + 1][this.y + 1]);
        }
    }
}