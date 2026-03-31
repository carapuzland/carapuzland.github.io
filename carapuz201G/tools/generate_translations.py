import json
import time
from pathlib import Path
from deep_translator import GoogleTranslator

# =========================================
# CONFIG
# =========================================

BASE_DIR = Path(__file__).resolve().parent.parent
TRANSLATIONS_DIR = BASE_DIR / "assets" / "data" / "translations"
SOURCE_LANG = "en-US"
SOURCE_FILE = TRANSLATIONS_DIR / f"{SOURCE_LANG}.json"

# Все официальные языки стран ЕС + uk + ru + en-US + en-GB
TARGET_LANGS = {
    "en-US": {"name": "English (US)", "translator_code": "en"},
    "en-GB": {"name": "English (UK)", "translator_code": "en"},
    "bg": {"name": "Bulgarian", "translator_code": "bg"},
    "hr": {"name": "Croatian", "translator_code": "hr"},
    "cs": {"name": "Czech", "translator_code": "cs"},
    "da": {"name": "Danish", "translator_code": "da"},
    "nl": {"name": "Dutch", "translator_code": "nl"},
    "et": {"name": "Estonian", "translator_code": "et"},
    "fi": {"name": "Finnish", "translator_code": "fi"},
    "fr": {"name": "French", "translator_code": "fr"},
    "de": {"name": "German", "translator_code": "de"},
    "el": {"name": "Greek", "translator_code": "el"},
    "hu": {"name": "Hungarian", "translator_code": "hu"},
    "ga": {"name": "Irish", "translator_code": "ga"},
    "it": {"name": "Italian", "translator_code": "it"},
    "lv": {"name": "Latvian", "translator_code": "lv"},
    "lt": {"name": "Lithuanian", "translator_code": "lt"},
    "mt": {"name": "Maltese", "translator_code": "mt"},
    "pl": {"name": "Polish", "translator_code": "pl"},
    "pt": {"name": "Portuguese", "translator_code": "pt"},
    "ro": {"name": "Romanian", "translator_code": "ro"},
    "sk": {"name": "Slovak", "translator_code": "sk"},
    "sl": {"name": "Slovenian", "translator_code": "sl"},
    "es": {"name": "Spanish", "translator_code": "es"},
    "sv": {"name": "Swedish", "translator_code": "sv"},
    "uk": {"name": "Ukrainian", "translator_code": "uk"},
    "ru": {"name": "Russian", "translator_code": "ru"},
}

SLEEP_BETWEEN_TRANSLATIONS = 0.15


# =========================================
# HELPERS
# =========================================

def load_json(path: Path) -> dict:
    if not path.exists():
        return {}
    try:
        with path.open("r", encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, dict) else {}
    except Exception:
        return {}

def save_json(path: Path, data: dict):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def flatten_dict(data: dict, parent_key: str = "", sep: str = ".") -> dict:
    items = {}
    for k, v in data.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.update(flatten_dict(v, new_key, sep=sep))
        else:
            items[new_key] = v
    return items

def unflatten_dict(data: dict, sep: str = ".") -> dict:
    result = {}
    for compound_key, value in data.items():
        keys = compound_key.split(sep)
        current = result
        for key in keys[:-1]:
            current = current.setdefault(key, {})
        current[keys[-1]] = value
    return result

def translate_text(text: str, target_lang_code: str) -> str:
    if not isinstance(text, str):
        return text

    text = text.strip()
    if not text:
        return text

    if target_lang_code == "en-US":
        return text

    if target_lang_code == "en-GB":
        # Можно оставить как есть или слегка адаптировать вручную позже
        return text

    translator_code = TARGET_LANGS[target_lang_code]["translator_code"]

    try:
        translated = GoogleTranslator(source="en", target=translator_code).translate(text)
        return translated if translated else text
    except Exception as e:
        print(f"[WARN] Failed to translate to {target_lang_code}: {e}")
        return text

def should_translate_value(value) -> bool:
    return isinstance(value, str) and value.strip() != ""

# =========================================
# MAIN
# =========================================

def main():
    if not SOURCE_FILE.exists():
        print(f"[ERROR] Source file not found: {SOURCE_FILE}")
        return

    source_data = load_json(SOURCE_FILE)
    if not source_data:
        print(f"[ERROR] Source file is empty or invalid: {SOURCE_FILE}")
        return

    source_flat = flatten_dict(source_data)
    print(f"[INFO] Loaded source keys: {len(source_flat)} from {SOURCE_FILE.name}")

    for lang_code in TARGET_LANGS.keys():
        target_file = TRANSLATIONS_DIR / f"{lang_code}.json"
        target_data = load_json(target_file)
        target_flat = flatten_dict(target_data)

        changed = False
        translated_count = 0

        print(f"\n[INFO] Processing {lang_code} -> {TARGET_LANGS[lang_code]['name']}")

        for key, source_value in source_flat.items():
            current_value = target_flat.get(key)

            # если ключа нет или пустой
            if key not in target_flat or current_value in ("", None):
                if should_translate_value(source_value):
                    translated_value = translate_text(source_value, lang_code)
                    target_flat[key] = translated_value
                else:
                    target_flat[key] = source_value

                translated_count += 1
                changed = True
                time.sleep(SLEEP_BETWEEN_TRANSLATIONS)

        # дополнительные ключи в target не удаляем — только дополняем
        final_data = unflatten_dict(target_flat)

        if changed or not target_file.exists():
            save_json(target_file, final_data)
            print(f"[OK] Saved {target_file.name} | added/updated keys: {translated_count}")
        else:
            print(f"[OK] No changes needed for {target_file.name}")

    print("\n[DONE] Translation generation completed.")

if __name__ == "__main__":
    main()