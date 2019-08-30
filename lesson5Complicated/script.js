let arr = ['2234', '1611', '2563', '1111', '4859', '1613', '8523'];

for (let i = 0; i < arr.length; i++) {

    if ( arr[i].substring(0, 1) == '2' || arr[i].substring(0, 1) == '4' ) {
        console.log(arr[i]); 
    }

}

Goto:
for (let i = 2; i < 100; i++) { 

  for (let j = 2; j < i; j++) { 
    if (i % j == 0) {
        continue Goto;
    }
  }
  alert(i);
}