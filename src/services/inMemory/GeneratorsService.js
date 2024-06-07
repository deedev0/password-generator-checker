const generator = require("generate-password");
const zxcvbn = require("zxcvbn");
const translate = require("translate-google");
const { pwned } = require("@faustbrian/node-haveibeenpwned");

class GeneratorsService {
  async generatePassword({
    password_length,
    uppercase,
    lowercase,
    numbers,
    symbols,
  }) {
    let password;
    // cek jika semua opsi false
    if (
      uppercase == undefined &&
      lowercase == undefined &&
      numbers == undefined &&
      symbols == undefined
    ) {
      password = generator.generate({
        length: password_length,
        numbers: true,
      });
    } else if (
      uppercase == false &&
      lowercase == false &&
      numbers == false &&
      symbols == false
    ) {
      password = generator.generate({
        length: password_length,
        numbers: true,
      });
    } else {
      // generate password berdasarkan opsi
      password = generator.generate({
        length: password_length,
        uppercase: uppercase,
        lowercase: lowercase,
        numbers: numbers,
        symbols: symbols,
      });
    }

    // check score berdasarkan password yg digenerate
    const checkPassword = zxcvbn(password);
    const score = checkPassword.score;
    const crackTime = await this.translateText(
      checkPassword.crack_times_display.offline_slow_hashing_1e4_per_second
    );
    const passwordExposedTime = await this.checkExposedPassword(password);

    return {
      generated_password: password,
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
      const translation = await translate(textToTranslate, { to: "id" });
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

module.exports = GeneratorsService;
