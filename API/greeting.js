export const getFromLanguage = async ({ language }) => {
    let word;

    switch (language) {
        case 'english':
            word = await this.hello();
            break;
        case 'italian':
            word = await this.ciao();
            break;
        case 'spanish':
            word = await this.hola();
            break;
        default:
            throw new Error(`language=${language} not found`);
    }

    const result = { language, word };
    return result;
};

export const hello = async () => 'world';

export const ciao = async () => 'mondo';

export const hola = async () => 'mundo';