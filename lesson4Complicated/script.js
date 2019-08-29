function argumentCheck(text) {
    if ( typeof text != typeof "string" ) {
        alert('Введите строку');
    }
    
    // let textNoSpace = text.trim();
    
    if (text.length > 30) {
        return alert(text.substring(0, 30) + '...');
    }
}
argumentCheck('Протяженность дороги от Москвы до Владивостока составляет 50000км');
