class Password {
    generate(len) {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "1234567890";
        const special = "`~!@#$%^&*_-=?<>";

        const all = chars + numbers + special;
        let pass = "";

        for (let i = 0; i < len; i++) {
            pass += all[Math.floor(Math.random() * all.length)];
        }

        return pass;
    }
}

const generator = new Password();

const lengthInput = document.getElementById("length");
const result = document.getElementById("result");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const strengthBar = document.getElementById("strengthBar");
const errorMsg = document.getElementById("errorMsg");

/* -----------------------------
   PASSWORD STRENGTH FUNCTION
----------------------------- */

function updateStrength(password) {
    let strength = 0;

    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    strengthBar.style.width = strength + "%";

    if (strength <= 50) {
        strengthBar.style.background = "#ef4444"; // red
    } else if (strength <= 75) {
        strengthBar.style.background = "#facc15"; // yellow
    } else {
        strengthBar.style.background = "#22c55e"; // green
    }
}

/* -----------------------------
   GENERATE BUTTON
----------------------------- */

generateBtn.addEventListener("click", () => {
    const len = Number(lengthInput.value);

    // Validation
    if (!len || len < 3) {
        errorMsg.textContent = "Password must be at least 3 characters.";
        lengthInput.classList.add("error-input");
        result.value = "";
        strengthBar.style.width = "0%";
        return;
    }

    // Clear error
    errorMsg.textContent = "";
    lengthInput.classList.remove("error-input");

    const password = generator.generate(len);
    result.value = password;
    updateStrength(password);
});

/* -----------------------------
   REMOVE ERROR WHEN TYPING
----------------------------- */

lengthInput.addEventListener("input", () => {
    if (lengthInput.value >= 3) {
        errorMsg.textContent = "";
        lengthInput.classList.remove("error-input");
    }
});

/* -----------------------------
   COPY BUTTON
----------------------------- */

copyBtn.addEventListener("click", () => {
    if (!result.value) return;

    navigator.clipboard.writeText(result.value);

    copyBtn.textContent = "Copied!";
    copyBtn.style.background = "#16a34a";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.style.background = "";
    }, 1500);
});