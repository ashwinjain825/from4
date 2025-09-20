// =============================
// THEME TOGGLE
// =============================

// Check localStorage for saved theme
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'neo-noir';
    document.body.classList.add(currentTheme);
    setToggleIcon(currentTheme);
});

// Theme toggle button logic
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const bodyClass = document.body.classList;
        const newTheme = bodyClass.contains('neo-noir') ? 'light' : 'neo-noir';
        
        // Toggle theme classes
        bodyClass.remove('neo-noir', 'light');
        bodyClass.add(newTheme);
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update button icon
        setToggleIcon(newTheme);
    });
}

// Update toggle button icon
function setToggleIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    switch (theme) {
        case 'neo-noir':
            themeToggle.textContent = '🌙'; // Moon for dark theme
            break;
        case 'light':
            themeToggle.textContent = '🌞'; // Sun for light theme
            break;
        default:
            themeToggle.textContent = '🌙';
    }
}

// =============================
// PIN GENERATOR
// =============================

// Generate PIN on button click
document.getElementById("generate-btn").addEventListener("click", () => {
    const length = parseInt(document.getElementById("pin-length").value);
    let pin = "";
    for (let i = 0; i < length; i++) {
        pin += Math.floor(Math.random() * 10);
    }
    document.getElementById("pin-display").textContent = pin;
});

// =============================
// COPY PIN TO CLIPBOARD
// =============================

document.getElementById("pin-display").addEventListener("click", () => {
    const pin = document.getElementById("pin-display").textContent;
    if (pin && pin !== "----") {
        navigator.clipboard.writeText(pin).then(() => {
            alert("PIN copied to clipboard!");
        }).catch(err => {
            console.error("Clipboard copy failed:", err);
        });
    }
});
