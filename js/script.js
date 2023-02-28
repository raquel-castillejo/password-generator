/* A REPLICAR -> https://doriandesings.github.io/password-generator-vanilla/ */

// VARIABLES

let finalPassword = document.getElementById('final-password');
let generatedPassword = '';

let numberOfCharacters = document.getElementById(
  'number-of-characters'
).valueAsNumber;
const numberOfCharactersText = document.getElementById(
  'number-of-characters-text'
);

const passwordStrength = document.getElementById('strenght-level');
const passwordStrengthLevels = {
  null: 'too short',
  zero: 'no options checked',
  one: 'too weak!',
  two: 'weak',
  three: 'medium',
  four: 'strong'
};

const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

const passwordCharacters = {
  selected: '',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: 'çñÇÑ¿?¡!.:,;=+-^*><º$%&/{}[]'
};

const generatePWButton = document.getElementById('generate-password-button');

////////////////////////////////////////////////////////

// LÓGICA

// número de caracteres inicial
numberOfCharactersText.textContent = numberOfCharacters;

const madeAClick = e => {
  // cambiar el número de caracteres
  numberOfCharacters = document.getElementById(
    'number-of-characters'
  ).valueAsNumber;
  numberOfCharactersText.textContent = numberOfCharacters;

  // revisar el número de caracteres seleccionado
  if (numberOfCharacters < 6) {
    passwordStrength.textContent = passwordStrengthLevels.null;
    generatePWButton.disabled = true;
    generatePWButton.classList.add('button--disabled');
  } else {
    let optionsChecked =
      uppercaseCheckbox.checked +
      lowercaseCheckbox.checked +
      numbersCheckbox.checked +
      symbolsCheckbox.checked;

    // cambia el grado de seguridad de la contraseña
    if (optionsChecked == 0) {
      passwordStrength.textContent = passwordStrengthLevels.zero;
    } else if (optionsChecked == 1) {
      passwordStrength.textContent = passwordStrengthLevels.one;
    } else if (optionsChecked == 2) {
      passwordStrength.textContent = passwordStrengthLevels.two;
    } else if (optionsChecked == 3) {
      passwordStrength.textContent = passwordStrengthLevels.three;
    } else if (optionsChecked == 4) {
      passwordStrength.textContent = passwordStrengthLevels.four;
    }

    // deshabilita el botón si no hay opciones seleccionadas
    if (optionsChecked == 0) {
      generatePWButton.disabled = true;
      generatePWButton.classList.add('button--disabled');
    } else {
      generatePWButton.disabled = false;
      generatePWButton.classList.remove('button--disabled');
    }
  }
};

const generatePassword = buttonclicked => {
  // resetear caracteres posibles y contraseña
  passwordCharacters.selected = '';
  generatedPassword = '';

  if (!generatePWButton.disabled) {
    // añadir posibles caracteres
    if (uppercaseCheckbox.checked) {
      passwordCharacters.selected += passwordCharacters.uppercase;
    }
    if (lowercaseCheckbox.checked) {
      passwordCharacters.selected += passwordCharacters.lowercase;
    }
    if (numbersCheckbox.checked) {
      passwordCharacters.selected += passwordCharacters.numbers;
    }
    if (symbolsCheckbox.checked) {
      passwordCharacters.selected += passwordCharacters.symbols;
    }

    // generar la contraseña
    for (let index = 0; index < numberOfCharacters; index++) {
      const randomCharacterPosition = Math.floor(
        Math.random() * passwordCharacters.selected.length
      );
      const randomCharacter = passwordCharacters.selected.charAt(
        randomCharacterPosition
      );
      generatedPassword += randomCharacter;
    }

    // mostrar la contraseña nueva
    finalPassword.textContent = generatedPassword;
  }
};

// clicks
document
  .getElementById('number-of-characters')
  .addEventListener('click', madeAClick);

document.getElementById('uppercase').addEventListener('click', madeAClick);
document.getElementById('lowercase').addEventListener('click', madeAClick);
document.getElementById('numbers').addEventListener('click', madeAClick);
document.getElementById('symbols').addEventListener('click', madeAClick);

document
  .getElementById('generate-password-button')
  .addEventListener('click', generatePassword);
