function calculateBMI(height,weight){

const h = height / 100;

const bmi = weight / (h*h);

return bmi.toFixed(2);

}

module.exports = calculateBMI;