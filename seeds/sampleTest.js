

const { places, descriptors } = require('./seedHelpers');

// console.log(places[1]);

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)]
    }



const resultString = `${sample(descriptors)} ${sample(places)}`;
console.log(resultString);