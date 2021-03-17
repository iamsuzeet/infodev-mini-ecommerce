import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English translation files
import enCommon from './locale/common/en.json';
import enLogin from './locale/login/en.json';
import enRegister from './locale/register/en.json';
import enSidebar from './locale/sidebar/en.json';
import enUserapproval from './locale/userapproval/en.json';

// Nepali translation files
import neCommmon from './locale/common/ne.json';
import neLogin from './locale/login/ne.json';
import neRegister from './locale/register/ne.json';
import neSidebar from './locale/sidebar/ne.json';
import neUserapproval from './locale/userapproval/ne.json';


export const i18nLanguages = ["en", "ne"];

// Translation resources
const resources = {
    en: {
        common: enCommon,
        login: enLogin,
        register: enRegister,
        sidebar: enSidebar,
        userapproval: enUserapproval,
    },
    ne: {
        common: neCommmon,
        login: neLogin,
        register: neRegister,
        sidebar: neSidebar,
        userapproval: neUserapproval
    }
};

i18n
    // .use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        lng: 'ne',
        fallbackLng: 'ne',
        whitelist: ['ne', 'en'],
        resources,
        ns: ['common'],
        defaultNS: "common",
        fallbackNS: "common",
        // backend: {
        //     loadPath: process.env.REACT_APP_ENDPOINT + '/config/i18n/res/{{lng}}/{{ns}}',
        //     crossDomain: true
        // },
        keySeparator: ".", // we use keys in form {t('messages.welcome')}
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

/**
 * Returns data in selected language
 * @param dataEn any data containing english language
 * @param dataNe any data containing nepali language
 */
export const getTextByLanguage = (dataEn: any, dataNe: any) => {
    switch (i18n.language) {
        case 'ne': return dataNe;
        default: return dataEn;
    }
}

/**
 * API request time out message in selected language
 */
export const requestTimeoutLanguage = () => {
    switch (i18n.language) {
        case 'ne': return "सर्भरले प्रतिक्रिया दिन धेरै लामो समय लिइरहेको छ, कृपया केहि बेरमा पुन: प्रयास गर्नुहोस्!";
        default: return "Server is taking too long to respond, please try again in sometime!";
    }
}

/**
 * When no internet or no conection to server message in selected language
 */
export const noConnectionLanguage = () => {
    switch (i18n.language) {
        case 'ne': return "सर्भरले प्रतिक्रिया दिन धेरै लामो समय लिईरहेको छ, यो कम कनेक्टिभटी वा हाम्रो सर्भरहरूको साथ त्रुटि द्वारा हुन सक्छ। कृपया केहि बेरमा पुन: प्रयास गर्नुहोस्!";
        default: return "Server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while!";
    }
}

const nepaliCount = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
/**
 * Converts 123456 to 1,23,456
 * @param enNumber Number to convert into Nepali comma separated text
 */
export const nepaliNumeralFormat = (enNumber: number) => {
    let [integer, decimal] = enNumber.toString().split(".");

    let integerBeforeLastThreeDigits = integer.slice(0, integer.length - 3);
    const integerOfLastThreeDigits = integer.slice(integer.length - 3);
    if (integerBeforeLastThreeDigits.length > 2) {
        integerBeforeLastThreeDigits = integerBeforeLastThreeDigits.replace(/(\d)(?=(\d{2})+$)/g, '$1,') + ",";
    }

    integer = integerBeforeLastThreeDigits + integerOfLastThreeDigits;

    switch (i18n.language) {
        case 'ne': return integer + decimal;
        default: return integer + decimal;
    }
}

/**
 * Converts english number to nepali number as string
 * @param numberEn number in english
 */
export const convertEngToNepNumber = (numberEn: number) => {
    return numberEn.toString().split("").map((number) => nepaliCount[+number] ? nepaliCount[+number] : number).join("");
}

/**
 * Converts nepali number to english number as string
 * @param numberEn number text in nepali
 */
export const convertNepToEngNumber = (numberNe: string) => {
    return numberNe.split("").map((number: string) => nepaliCount.indexOf(number) > -1 ? nepaliCount.indexOf(number) : number).join("");
}

export default i18n;