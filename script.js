// Global variables
let currentMode = 'default'; // 'default', 'random', or 'progressive'
const container = document.getElementById('container');
const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;

// Button event listeners
document.getElementById('resize').addEventListener('click', changeGridSize);
document.getElementById('random').addEventListener('click', () => currentMode = 'random');
document.getElementById('progressive').addEventListener('click', () => currentMode = 'progressive');
document.getElementById('clear').addEventListener('click', () => createGrid(getCurrentSize()));

function getCurrentSize() {
    // Calculate current grid size by counting squares in one row
    return Math.sqrt(container.children.length);
}

function createGrid(size) {
    // Clear existing grid
    container.innerHTML = '';
    
    // Calculate square size to maintain container dimensions
    const squareSize = 960 / size;
    
    // Create grid squares
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        // Add hover effect
        square.addEventListener('mouseenter', changeColor);
        
        // Reset any previous colors or opacity
        square.style.backgroundColor = 'white';
        square.style.opacity = '1';
        
        container.appendChild(square);
    }
}

function changeColor(e) {
    const square = e.target;
    
    switch(currentMode) {
        case 'random':
            // Generate random RGB color
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            square.style.backgroundColor = `rgb(${r},${g},${b})`;
            square.style.opacity = '1';
            break;
            
        case 'progressive':
            // If square hasn't been colored yet, start with white
            if (!square.style.backgroundColor || square.style.backgroundColor === 'white') {
                square.style.backgroundColor = 'black';
                square.style.opacity = '0.1';
            } else {
                // Increase opacity by 0.1 until reaching 1
                const currentOpacity = parseFloat(square.style.opacity);
                if (currentOpacity < 1) {
                    square.style.opacity = (currentOpacity + 0.1).toString();
                }
            }
            break;
            
        default:
            // Default black color
            square.style.backgroundColor = 'black';
            square.style.opacity = '1';
    }
}

function changeGridSize() {
    let newSize = prompt('Enter the number of squares per side (max 100):');
    
    // Validate input
    newSize = parseInt(newSize);
    if (isNaN(newSize) || newSize < 1 || newSize > MAX_SIZE) {
        alert('Please enter a valid number between 1 and 100.');
        return;
    }
    
    createGrid(newSize);
}

// Initialize default grid
createGrid(DEFAULT_SIZE);
