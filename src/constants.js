export const VERSION_API = "5.131";

export const API_URL_METHODS = "https://api.vk.com/method";

export const REQUEST_TIMEOUT = 10000;

export const LANGUAGE_API = {
    NONE: -1,
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

export const PROFILE_INFO_SEX = {
    NONE: -1,
    UNDEFINED: 0,
    WOMEN: 1,
    MEN: 2,
    getByName(value) {
        switch (value) {
            case "women": return 1;
            case "men": return 2;
            default: return 0;
        }
    },
    isValid(value) {
        return value >= 0 && value <= 2;
    }
}

export const PROFILE_INFO_RELATION = {
    NONE: -1,
    NOT_MARRIED: 1,
    HAVE_FRIEND: 2,
    ENGAGED: 3,
    MARRIED: 4,
    COMPLICATED: 5,
    ACTIVE_SEARCH: 6,
    IN_LOVE: 7,
    CIVIL_MARRIAGE: 8,
    isValid(value) {
        return value >= 0 && value <= 8;
    }
}

export const PROFILE_INFO_BDATE_VISIBLE = {
    NONE: -1,
    DONT_SHOW: 0,
    SHOW_ALL: 1,
    SHOW_MONTH_DAY: 2,
    isValid(value) {
        return value >= 0 && value <= 2;
    }
}


// LongPool Server
export const LONG_POOL_WAIT = 25;
export const LONG_POOL_MODE = {
    ATTEMPTS: 2,
    EXTENDED_EVENTS: 8,
    PTS: 32,
    ADDITIONAL_INFO_EXTENDED_EVENTS: 64,
    FIELD_RANDOM_ID: 128
}
export const LONG_POOL_NEED_PTS = 1;
export const LONG_POOL_VERSION = 3;