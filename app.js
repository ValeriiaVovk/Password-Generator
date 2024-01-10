const passwordInput = document.getElementById('password');
const copy = document.querySelector('.copy');

const lengthText = document.querySelector('.length-password');
const lengthInput = document.getElementById('length');

const inputs = [...document.querySelectorAll('input:not([type="text"])')];

const generateButton = document.getElementById('generate');


const numbers = [2,3,4,5,6,7,8,9];
const symbols = ['#', '$', '%', '@'];
const similarNumbers = [0,1];
const similarLowerCase = ['i','l','o'];
const similatUpperCase = ['I', 'L', 'O'];

const characterCodes = Array.from(Array(26)).map((_,i) => i+97);

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordInput.value);
})

const skip = [8,11,14];

const lowerCase = characterCodes.map(code => String.fromCharCode(code)).filter((_,i) => !skip.includes(i));
// console.log(lowerCase);

const upperCase = lowerCase.map(letter => letter.toUpperCase());
// console.log(upperCase);

const updatePassword = () => {
    const passwordLength = lengthInput.value;
    const checkboxes = inputs.slice(1).map(input => input.checked);
    const password = generatePassword(passwordLength, ...checkboxes);
    passwordInput.value = password;
    // lengthText.textContent = `${passwordLength}`;
};

lengthInput.addEventListener('input', () => {
    const passwordLength = lengthInput.value;
    lengthText.textContent = `${passwordLength}`;
})


const generatePassword = (passwordLength, hasUpperCase, hasLowerCase, hasNumbers, hasSymbols, hasSimilar) => {
    let arrayWithAveilableCharacters = [
        ...(hasUpperCase ? upperCase : []),
        ...(hasLowerCase ? lowerCase : []),
        ...(hasNumbers ? numbers : []),
        ...(hasSymbols ? symbols : [])
    ];
    if (hasSimilar) {
        if (hasNumbers) {
            arrayWithAveilableCharacters = [...arrayWithAveilableCharacters, ...similarNumbers];
        }
        if (hasLowerCase) {
            arrayWithAveilableCharacters = [...arrayWithAveilableCharacters, ...similarLowerCase];
        }
        if(hasUpperCase) {
            arrayWithAveilableCharacters = [...arrayWithAveilableCharacters, ...similatUpperCase];
        }
    }
    
    let password = '';

    if (arrayWithAveilableCharacters.length === 0) {
        return '';
    }

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * arrayWithAveilableCharacters.length);
        password += arrayWithAveilableCharacters[randomIndex];
    }
    console.log(password);

    return password;
};

generateButton.addEventListener('click', () => {
    updatePassword();
});