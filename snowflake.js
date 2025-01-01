const canvas = document.getElementById('snowflakeCanvas');
const ctx = canvas.getContext('2d');

function drawSnowflake(iterations, angle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1, -1); // Flip Y-axis for correct orientation
    drawBranch(iterations, angle, 100);
    ctx.restore();
}

function drawBranch(iterations, angle, length) {
    if (iterations === 0) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, length);
        ctx.stroke();
        return;
    }

    length /= 3;

    drawBranch(iterations - 1, angle, length);
    ctx.rotate((angle * Math.PI) / 180);
    drawBranch(iterations - 1, angle, length);
    ctx.rotate(-2 * (angle * Math.PI) / 180);
    drawBranch(iterations - 1, angle, length);
    ctx.rotate((angle * Math.PI) / 180);
    drawBranch(iterations - 1, angle, length);
}

document.getElementById('generate').addEventListener('click', () => {
    const iterations = parseInt(document.getElementById('iterations').value);
    const angle = parseInt(document.getElementById('angle').value);
    drawSnowflake(iterations, angle);
});

// Initial draw
drawSnowflake(4, 60);