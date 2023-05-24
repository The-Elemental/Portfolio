// Get the angle and the length user defined
const angleBar = document.getElementById("angle");
const lengthBar = document.getElementById("length");
const numberBar = document.getElementById("number");
const depthBar = document.getElementById("depth");

// Get the div and create a canvas element
const fractal = document.getElementById("fractal");
const canvas = document.createElement("canvas");

// Set the canvas width and height to match the div
canvas.width = fractal.offsetWidth;
canvas.height = fractal.offsetWidth;

// Position the canvas on top of the div
const rect = fractal.getBoundingClientRect();
canvas.style.position = "absolute";
canvas.style.top = rect.top + "px";
canvas.style.left = rect.left + "px";
canvas.width = rect.width;
canvas.height = rect.height;

// Append the canvas to the div
fractal.appendChild(canvas);

function drawFractal(lineLength, lineAngle, depth, prevLocations, numberBranches, maxDepth) {
    lineLength = lineLength / 2;
    if (depth < maxDepth) {
        // Get the canvas context
        const context = canvas.getContext("2d");

        // Create Array of new end points
        const newPrevLocs = new Array();

        // Loop through each previous end point, add new lines
        prevLocations.forEach((element) => {
            // Calcualte new Angle
            const lineAngleRadians = lineAngle * Math.PI / 180;
            const normalLineLength = ((lineLength / 100) * canvas.height);

            // Calculate new Position
            const y = Math.cos(lineAngleRadians) * normalLineLength;
            const x = Math.sin(lineAngleRadians) * normalLineLength;

            // Draw new Fractal
            context.strokeStyle = "black";
            context.beginPath();
            context.moveTo(element[0], element[1]);
            context.lineTo(element[0] - x, element[1] - y);
            context.stroke();

            // Add new end point to the array
            const newPrevLoc = new Array();
            newPrevLoc.push(element[0] - x, element[1] - y);
            newPrevLocs.push(newPrevLoc);

            // Draw new Fractal
            context.strokeStyle = "black";
            context.beginPath();
            context.moveTo(element[0], element[1]);
            context.lineTo(element[0] + x, element[1] - y);
            context.stroke();

            // Add new end point to the array
            const newPrevLoc2 = new Array();
            newPrevLoc2.push(element[0] + x, element[1] - y);
            newPrevLocs.push(newPrevLoc2);
        });

        drawFractal(lineLength, lineAngle, depth + 1, newPrevLocs, numberBranches, maxDepth);
    }
}

function draw(lineLength, lineAngle, numberBranches, depth) {
    // Get the canvas context and clear the previous drawing
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw new Fractal
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height);
    context.lineTo(canvas.width / 2, ((100 - lineLength) / 100) * canvas.height);
    context.stroke();

    // Create previous locations
    const previousLocation = new Array();
    previousLocation.push(canvas.width / 2);
    previousLocation.push(((100 - lineLength) / 100) * canvas.height);
    const previousLocations = new Array();
    previousLocations.push(previousLocation);
    drawFractal(lineLength, lineAngle, 0, previousLocations, numberBranches, depth);
}

angleBar.addEventListener("input", function () {
    draw(lengthBar.value, angleBar.value, numberBar.value, depthBar.value)
});

lengthBar.addEventListener("input", function () {
    draw(lengthBar.value, angleBar.value, numberBar.value, depthBar.value)
});

numberBar.addEventListener("input", function () {
    draw(lengthBar.value, angleBar.value, numberBar.value, depthBar.value)
});

depthBar.addEventListener("input", function () {
    draw(lengthBar.value, angleBar.value, numberBar.value, depthBar.value)
})

window.addEventListener("resize", function () {
    canvas.width = fractal.offsetWidth;
    canvas.height = fractal.offsetWidth;
    draw(lengthBar.value, angleBar.value, numberBar.value, depthBar.value)
});

draw(lengthBar.value, angleBar.value, numberBar.value, depthBar.value)