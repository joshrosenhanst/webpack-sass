import dog from "../assets/img/dog.png";

/*
  DogFooter is a demo of some ES2015+ features which are properly transpiled by Babel via Webpack.
*/

export default class DogFooter {
  constructor() {
    this.element = document.createElement("footer");
    this.suffix = "footer";
  }

  buildFooter() {
    let img = document.createElement("img");
    img.id = `dog_${this.suffix}`;
    img.src = dog;
    this.element.appendChild(img);
  }

  getFooter() {
    this.buildFooter();
    return this.element;
  }
};