document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.replace(/\/+$/, "");
    document.querySelectorAll("[data-nav]").forEach((link) => {
        const href = link.getAttribute("href").replace(/\/+$/, "");
        if (currentPath === href || (href.endsWith("/carapuz201g") && currentPath === "/carapuz201g")) {
            link.classList.add("active");
        }
    });

    const searchInput = document.getElementById("commandSearch");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const value = searchInput.value.toLowerCase().trim();
            document.querySelectorAll(".command-item").forEach((item) => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(value) ? "" : "none";
            });
        });
    }
});