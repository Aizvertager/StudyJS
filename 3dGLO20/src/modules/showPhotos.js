const showPhotos = () => {
    const photo = document.querySelectorAll('.command__photo');
    let prevPhoto = [];

    photo.forEach((elem, index) => {
        prevPhoto.push( elem.getAttribute('src') );

        elem.addEventListener('mouseenter', (e) => {
            e.target.src = e.target.dataset.img;
        });
        
        elem.addEventListener('mouseleave', (e) => {
            
            for (let i = 0; i < prevPhoto.length; i++) {
                if(index === i) {
                    e.target.src = prevPhoto[i];
                }
            }

        });
    });
};

export default showPhotos;