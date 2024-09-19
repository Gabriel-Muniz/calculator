const addCalc = (n1, n2) => n1 + n2;
const subCalc = (n1, n2) => n1 - n2;
const multiplyCalc = (n1, n2) => n1 * n2;
const divideCalc = (n1, n2) => n1 / n2;

console.log(
  `
    Add: ${addCalc(15, 3)}
    Subtract: ${subCalc(15, 3)}
    Multiply: ${multiplyCalc(15, 3)}
    Divide: ${divideCalc(15, 3)}
  `);
