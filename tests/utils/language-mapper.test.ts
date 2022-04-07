import {mapToSupportedLang} from "../../src/utils/language-mapper";

describe('mapToSupportedLang', () => {
    it('should return empty string if given language is not supported', () => {
        const language = 'asdf';

        const result = mapToSupportedLang(language);

        expect(result).toBe('');
    });

    it('should return most similar language by lowercase if non exact language is provided', () => {
        const language = 'JaVaScRiPt';
        const supportedLanguage = 'javascript';
        const result = mapToSupportedLang(language);

        expect(result).toBe(supportedLanguage);
    })
});
