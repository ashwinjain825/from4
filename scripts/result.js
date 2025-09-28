// Save Result
function save_result() {
    let theResult = document.getElementById("theResult").innerText;
    if (!theResult || theResult === "The Result") return notifyUser("Nothing to save", "error");

    let saved_data;
    try { saved_data = JSON.parse(localStorage.getItem("saved_data")) || []; } 
    catch (e) { saved_data = []; }

    saved_data.push({ value: theResult, date: new Date().toLocaleString() });
    localStorage.setItem("saved_data", JSON.stringify(saved_data));
    render_saved_data();
    notifyUser("Result saved successfully", "success");
}

// Delete Saved Entry
function delete_saved(index) {
    let saved_data = JSON.parse(localStorage.getItem("saved_data")) || [];
    saved_data.splice(index, 1);
    localStorage.setItem("saved_data", JSON.stringify(saved_data));
    render_saved_data();
    notifyUser("Saved entry deleted", "info");
}

// Render Saved Data
function render_saved_data() {
    let saved_data = JSON.parse(localStorage.getItem("saved_data")) || [];
    let container = document.querySelector(".saved_data_display");
    container.innerHTML = "";
    if (saved_data.length === 0) { container.innerHTML = "<p>No saved data</p>"; return; }
    saved_data.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "saved-item";
    div.innerHTML = `
        <p><b>${item.value}</b></p>
        <small>${item.date}</small><br>
        <button onclick="delete_saved(${index})"><span class="material-symbols-outlined">delete</span></button>
    `;
    container.appendChild(div);
    });
}

// Copy Result
function copyResult() {
    const resultText = document.getElementById("theResult").innerText;
    navigator.clipboard.writeText(resultText).then(() => {
    notifyUser("Result copied to clipboard", "success");
    }).catch(err => {
    notifyUser("Failed to copy text", "error");
    });
}

// Share Result
function shareResult() {
    const resultText = document.getElementById("theResult").innerText;
    const shareText = `Hey my From4 Code is:\n${resultText}\n\nFind yours at from4.vercel.app`;
    if (navigator.share) {
    navigator.share({ title: 'From4 Result', text: shareText })
        .then(() => notifyUser("Shared successfully", "success"))
        .catch(err => notifyUser("Share failed", "error"));
    } else {
    notifyUser("Web Share API not supported", "error");
    }
}
