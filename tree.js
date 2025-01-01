// Function to create a pile of discs
function createPileOfDiscs(baseDiameter, topDiameter, thickness, amount) {
    const vertices = [];
    const faces = [];
    let zOffset = 0;

    for (let i = 0; i < amount; i++) {
        // Linear interpolation for diameter
        const diameter = baseDiameter + (topDiameter - baseDiameter) * (i / (amount - 1));
        const radius = diameter / 2;

        // Create vertices for the current disc
        const circleVertices = [];
        const circleVerticesTop = [];
        const segmentCount = 32;

        for (let j = 0; j < segmentCount; j++) {
            const angle = (2 * Math.PI * j) / segmentCount;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            circleVertices.push([x, y, zOffset]);
            circleVerticesTop.push([x, y, zOffset + thickness]);
        }

        // Add vertices to the global list
        const startIdx = vertices.length;
        vertices.push(...circleVertices, ...circleVerticesTop);

        // Create faces for the sides
        const numVertices = circleVertices.length;
        for (let j = 0; j < numVertices; j++) {
            const nextJ = (j + 1) % numVertices;
            // Side faces
            faces.push([startIdx + j, startIdx + nextJ, startIdx + nextJ + numVertices]);
            faces.push([startIdx + j, startIdx + nextJ + numVertices, startIdx + j + numVertices]);
        }

        // Bottom face for the first disc only
        if (i === 0) {
            for (let j = 1; j < numVertices - 1; j++) {
                faces.push([startIdx, startIdx + j, startIdx + j + 1]);
            }
        }

        // Top face for the last disc only
        if (i === amount - 1) {
            const topStartIdx = startIdx + numVertices;
            for (let j = 1; j < numVertices - 1; j++) {
                faces.push([topStartIdx, topStartIdx + j + 1, topStartIdx + j]);
            }
        }

        zOffset += thickness;
    }

    return { vertices, faces };
}

// Function to export the pile as an OBJ file
function exportPileAsOBJ(vertices, faces, filename = "pile_of_discs.obj") {
    let objContent = "";

    // Write vertices
    for (const vertex of vertices) {
        objContent += `v ${vertex[0]} ${vertex[1]} ${vertex[2]}\n`;
    }

    // Write faces
    for (const face of faces) {
        objContent += `f ${face[0] + 1} ${face[1] + 1} ${face[2] + 1}\n`;
    }

    // Save OBJ content to file (for Node.js)
    const fs = require("fs");
    fs.writeFileSync(filename, objContent);
    console.log(`File saved as ${filename}`);
}

// Example usage
const baseDiameter = 50.0; // Diameter of the base disc in mm
const topDiameter = 20.0;  // Diameter of the top disc in mm
const thickness = 5.0;     // Thickness of each disc in mm
const amount = 10;         // Number of discs

const { vertices, faces } = createPileOfDiscs(baseDiameter, topDiameter, thickness, amount);
exportPileAsOBJ(vertices, faces);
