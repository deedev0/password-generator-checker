const zxcvbn = require('zxcvbn');
const translate = require('translate-google');
const { pwned } = require('@faustbrian/node-haveibeenpwned');

class CheckersService {
    async checkPassword({ password }) {
        // check score berdasarkan password yg input user
        const checkPassword = zxcvbn(password);
        const score = checkPassword.score;
        const crackTime = await this.translateText(checkPassword.crack_times_display.offline_slow_hashing_1e4_per_second);
        const passwordExposedTime = await this.checkExposedPassword(password);
        
        return {
            checked_password: password,
            score: score,
            crack_time: crackTime,
            exposed_time: passwordExposedTime,
        };  
    }

    async checkExposedPassword(password) {
        return await pwned(password);
    }

    async translateText(textToTranslate) {
        try {
            const translation = await translate(textToTranslate, { to: 'id' });
            if (translation == "abad") {
                return "Abad";
            } else {
                return translation;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CheckersService;