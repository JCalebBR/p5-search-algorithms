let cols = 75;
let rows = 75;
let grid = new Array();

let openSet = [];
let closedSet = [];
let start;
let end;

let gapX, gapY;

let path = [];
let current;

function setup() {
    createCanvas(800, 800);
    // frameRate(10);
    gapX = width / cols;
    gapY = height / rows;

    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.wall = false;
    end.wall = false;
    openSet.push(start);
}

function draw() {
    if (openSet.length > 0) {
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        current = openSet[winner];

        if (current === end) {
            noLoop();
            console.log("done!");
        }
        // openSet.remove(current);
        removeFromArray(openSet, current);
        closedSet.push(current);

        let neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                let tempG = current.g + heuristic(neighbor,
                    current);
                let newPath = false;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }
                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }

        }
    } else {
        console.log("no solution!");
        noLoop();
        return;
    }

    //drawings
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].show(gapX, gapY);
        }
    }

    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].col = color(255, 0, 0);
    }
    for (let i = 0; i < openSet.length; i++) {
        openSet[i].col = color(0, 255, 0);
    }

    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    for (let i = 0; i < path.length; i++) {
        path[i].col = color(0, 0, 255);
    }
    noFill();
    stroke(200, 200, 200);
    beginShape();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x * gapX + gapX / 2, path[i].y * gapY +
            gapX / 2);
    }
    endShape();
}


function removeFromArray(arr, element) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == element) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    return dist(a.x, a.y, b.x, b.y);
    // return abs(a.x - b.x) + abs(a.y, b.y);
}