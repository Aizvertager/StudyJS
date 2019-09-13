function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector.split('');
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

let divElement = new DomElement('.main', 100, 100, 'red', 16);
let pElement = new DomElement('#main', 220, 220, 'red', 16);
DomElement.prototype.addElement = function() {
    for(let i = 0; i < this.selector.length; i++) {
        if(this.selector[i] === '.') {
            let div = document.createElement('div');
            div.style.height = this.height + 'px';
            div.style.width = this.width + 'px';
            div.style.backgroundColor = this.bg;
            div.style.fontSize = this.fontSize + 'px';
            div.innerHTML = 'Hi i am <strong>div</strong> tag';
            div.classList.add(this.selector.join('')); 
            document.body.append(div);
        } else if(this.selector[i] === '#') {
            let p = document.createElement('p');
            p.style.height = this.height + 'px';
            p.style.width = this.width + 'px';
            p.style.backgroundColor = this.bg;
            p.style.fontSize = this.fontSize + 'px';
            p.innerHTML = 'Hi i am <strong>p</strong> tag';
            document.body.append(p);
        }

    }
};
divElement.addElement();
pElement.addElement();