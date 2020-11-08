// import { data } from 'persons';

const cards = document.querySelector(".card-gallery");

function generateCard() {
    return `
    <div class="card">
        <div class="card-heading">
          <img
            src="https://avatars0.githubusercontent.com/u/37118877?v=4"
            class="image"
          />
          <h2 class="name">Akshay Sharma</h2>
          <h5 class="title">Front End Developer</h5>
        </div>
        <hr />
        <div class="card-links">
          <a
            href="https://github.com/akshay2996"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-github fa-2x" aria-hidden="true"></i
          ></a>
          <a
            href="https://twitter.com/akshay2996"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-twitter fa-2x" aria-hidden="true"></i
          ></a>
          <a href="linkedin" target="_blank" rel="noopener noreferrer"
            ><i class="fa fa-linkedin fa-2x" aria-hidden="true"></i
          ></a>
          <a
            href="https://developeratease.com/"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-globe fa-2x" aria-hidden="true"></i
          ></a>
        </div>
        <div class="card-location">
          <h5 class="location">Bangalore, Karnataka, India</h5>
        </div>
      </div>
    `;
}

const cardArray = Array.from({length: 7});

const html = cardArray.map(generateCard).join("");
// console.log(html);
cards.innerHTML = html;
// console.log(cards.innerHTML);