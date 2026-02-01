function analyzeURL() {
    let url = document.getElementById("userURL").value.trim();
    let output = document.getElementById("output");

    if (url === "") {
        output.textContent = "❗ Please enter something.";
        output.style.color = "red";
        return;
    }

    // URL validation regex
    let urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
    let isValidURL = urlPattern.test(url);

    let risk = 0;

    // Risk analysis rules
    if (!url.startsWith("https://")) risk += 25;
    if (url.includes("@")) risk += 30;
    if (url.length > 70) risk += 20;
    if (url.includes("-")) risk += 10;
    if (url.includes("http://")) risk += 15;

    if (risk > 100) risk = 100;

    // CASE 1: NOT A VALID URL
    if (!isValidURL) {
        output.innerHTML =
            `❌ Not a Valid URL<br>
             Risk Level: ${risk}%<br>
             Status: ${risk < 50 ? "Safe" : "Unsafe"}`;
        output.style.color = "orange";
        return;
    }

    // CASE 2: VALID & SAFE → OPEN
    if (risk < 50) {
        output.innerHTML = `✅ Valid & Safe URL<br>Opening website...`;
        output.style.color = "green";

        setTimeout(() => {
            window.open(url.startsWith("http") ? url : "https://" + url, "_blank");
        }, 1000);
    }
    // CASE 3: VALID & UNSAFE → BLOCK
    else {
        output.innerHTML =
            `⚠️ Valid but Unsafe URL<br>
             Risk Level: ${risk}%`;
        output.style.color = "red";
    }
}

// Clear button
function resetPage() {
    document.getElementById("userURL").value = "";
    document.getElementById("output").textContent = "";
}
