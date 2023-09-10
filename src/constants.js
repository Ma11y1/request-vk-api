export const VERSION_API = "5.131";

export const API_URL_METHODS = "https://api.vk.com/method";

export const REQUEST_TIMEOUT = 10000;

export const LANGUAGE_API = {
    DEFAULT: 0,
    RUSSIA: 0,
    UKRAINE: 1,
    BELARUS: 2,
    ENGLISH: 3,
    SPAIN: 4,
    FINLAND: 5,
    DEUTSCH: 6,
    GERMAN: 6,
    ITALIA: 7,
    getByName(value) {
        switch (value) {
            case "russia": case "ru": return 0;
            case "ukraine": case "uk": return 1;
            case "belarus": case "bel": return 2;
            case "english": case "en": return 3;
            case "spain": case "sp": return 4;
            case "finland": case "fin": return 5;
            case "deutsch": case "deu": return 6;
            case "german": case "ger": return 6;
            case "italia": case "it": return 7;
            default: return 0;
        }
    },
    isValid(value) {
        return value >= 0 && value <= 7;
    }
}