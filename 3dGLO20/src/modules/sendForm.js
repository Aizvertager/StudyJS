const sendForm = (idForm) => {

    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.getElementById(idForm);

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 24px; color: white;`;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(form);
        //Создаем объект для AJAX
        let body = {};
        //Перебираем ключ/значение в formData
        formData.forEach((val, key) => {
            body[key] = val;
        });

        postData(body)
            .then((response) => {
                if(response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
            })
            .catch(error => console.error(error))
            .then(() => {
                form.reset();
            });

    });

    const postData = (body) => {

        return fetch('./server.php', {
            method: 'POST',// по умолчанию GET
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
            //То, что снизу аналогичен нынешнему запросу! 
        });
        
        // return new Promise((resolve, reject) => {
        //     const request = new XMLHttpRequest();

        //     request.addEventListener('readystatechange', () => {
        //         if(request.readyState !== 4) {
        //             return;
        //         } 

        //         if(request.status === 200) {
        //             resolve();
        //         } else {
        //             reject(request.status);
        //         }
        //     });

        //     request.open('POST', './server.php');

        //     // Отправляем в form-data
        //     // request.setRequestHeader('Content-Type', 'multipart/form-data');
            
        //     // Отправляем в JSON
        //     request.setRequestHeader('Content-Type', 'application/json');
        //     // Отправка body
        //     request.send(JSON.stringify(body));
           
        // });

    };

};

export default sendForm;