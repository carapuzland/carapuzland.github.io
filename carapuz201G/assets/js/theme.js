(function () {
    const STORAGE_KEY = "carapuz_theme";

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);

        const btn = document.getElementById("themeToggle");
        if (btn) {
            btn.textContent = theme === "light" ? "🌞 Light" : "🌙 Dark";
        }
    }

    window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        applyTheme(current === "dark" ? "light" : "dark");
    };

    document.addEventListener("DOMContentLoaded", () => {
        const saved = localStorage.getItem(STORAGE_KEY) || "dark";
        applyTheme(saved);

        const btn = document.getElementById("themeToggle");
        if (btn) {
            btn.addEventListener("click", window.toggleTheme);
        }
    });
})();