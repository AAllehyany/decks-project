import {findByCode} from './decks.service';

const ALPHANUM='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CODE_LENGTH = 4;
const REGENERATOIN_TRIES = 100000;

export const generateCode = (): string => {
    let code = '';

    for(let i = 0; i < CODE_LENGTH; i++) {
        code += ALPHANUM.charAt(Math.floor(Math.random() * ALPHANUM.length));
    }

    return code;
}

export const generateUniqueCode = async () => {
    let unique = false;
    let tries = 0;

    while(!unique && tries < REGENERATOIN_TRIES) {
        const code = generateCode();
        const exists = await findByCode(code);
        if(exists == null) {
            return code;
        }
        tries++;
    }

    throw Error('Failed to generate unique deck code');

}