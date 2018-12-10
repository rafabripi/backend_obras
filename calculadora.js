'use strict'
let params = process.argv.slice(2);
let num1 = parseFloat(params[0]);
let num2 = parseFloat(params[1]);

console.log(
    `La suma es: `, (num1 + num2), `\n`,
    `La resta es: `, (num1 - num2), `\n`,
    `La multiplicacion es: `, (num1 * num2), `\n`,
    `La division es: `, (num1 / num2), `\n`
);