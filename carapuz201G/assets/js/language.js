(function () {
    const LANG_STORAGE_KEY = "carapuz_lang";
    const DEFAULT_LANG = "en-US";
    let currentTranslations = {};

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`/carapuz201g/assets/data/translations/${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}`);
            return await response.json();
        } catch (e) {
            if (lang !== DEFAULT_LANG) {
                const fallback = await fetch(`/carapuz201g/assets/data/translations/${DEFAULT_LANG}.json`);
                return await fallback.json();
            }
            return {};
        }
    }

    function applyTranslations() {
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (currentTranslations[key]) {
                el.textContent = currentTranslations[key];
            }
        });

        document.querySelectorAll("[data-i18n-html]").forEach((el) => {
            const key = el.getAttribute("data-i18n-html");
            if (currentTranslations[key]) {
                el.innerHTML = currentTranslations[key];
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (currentTranslations[key]) {
                el.placeholder = currentTranslations[key];
            }
        });

        document.title = currentTranslations["site.title"] || document.title;
    }

    async function setLanguage(lang) {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
        currentTranslations = await loadTranslations(lang);
        applyTranslations();

        const selector = document.getElementById("languageSelect");
        if (selector) {
            selector.value = lang;
        }
    }

    window.setLanguage = setLanguage;

    document.addEventListener("DOMContentLoaded", async () => {
        const selector = document.getElementById("languageSelect");
        const saved = localStorage.getItem(LANG_STORAGE_KEY) || DEFAULT_LANG;

        if (selector) {
            selector.addEventListener("change", async (e) => {
                await setLanguage(e.target.value);
            });
        }

        await setLanguage(saved);
    });
})();