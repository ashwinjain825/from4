// =============================
// THEME TOGGLE
// =============================
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'neo-noir';
    document.body.classList.add(currentTheme);
    setToggleIcon(currentTheme);
});

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const bodyClass = document.body.classList;
        const newTheme = bodyClass.contains('neo-noir') ? 'light' : 'neo-noir';
        bodyClass.remove('neo-noir', 'light');
        bodyClass.add(newTheme);
        localStorage.setItem('theme', newTheme);
        setToggleIcon(newTheme);
    });
}

function setToggleIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    themeToggle.textContent = theme === 'neo-noir' ? '🌙' : '🌞';
}

// =============================
// PIN GENERATOR
// =============================
document.getElementById("generate-btn").addEventListener("click", () => {
    const length = parseInt(document.getElementById("pin-length").value);
    let pin = "";
    for (let i = 0; i < length; i++) {
        pin += Math.floor(Math.random() * 10);
    }
    document.getElementById("pin-display").textContent = pin;
});

// =============================
// COPY TO CLIPBOARD
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

// =============================
// SHOW GENERATOR SECTION
// =============================
const showGeneratorBtn = document.getElementById("show-generator");
const navGenerateBtn = document.getElementById("nav-generate");
const generatorSection = document.getElementById("generator");

function showGenerator(e) {
    e.preventDefault();
    generatorSection.classList.remove("hidden");
    generatorSection.scrollIntoView({ behavior: "smooth" });
}

if (showGeneratorBtn && generatorSection) {
    showGeneratorBtn.addEventListener("click", showGenerator);
}
if (navGenerateBtn && generatorSection) {
    navGenerateBtn.addEventListener("click", showGenerator);
}
