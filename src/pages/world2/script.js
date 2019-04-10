import "../../sass/index.sass";
import DogFooter from "../../components/DogFooter";

let dog_footer = new DogFooter();

let element = document.createElement("p");
element.innerText="Hello";
document.body.appendChild(element);
document.body.appendChild(dog_footer.getFooter());