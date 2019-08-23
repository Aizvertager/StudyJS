let num = 266219;
let array = num.toString().split('');
let summa = 1;
console.log('array: ', array);

for (var i = 0; i < array.length; i++) {
    let n = array[i];
    summa *= n;
}

console.log('summa: ', summa);

let squared = (summa ** 3).toString();
console.log('squared: ', squared);
console.log('squaredTwoNumber: ', squared.substring(0, 2));



