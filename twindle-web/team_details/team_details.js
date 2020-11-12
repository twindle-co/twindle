const cards = document.querySelector(".card-gallery");

function generateCard(info) {
    return `
    <div class="card">
        <div class="card-heading">
          <img
            src=${info.img}
            class="image"
          />
          <h2 class="name">${info.name}</h2>
          <h5 class="title">${info.title}</h5>
        </div>
        <hr />
        <div class="card-links">
          <a
            href=${info.links.github}
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-github fa-2x" aria-hidden="true"></i
          ></a>
          <a
            href=${info.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-twitter fa-2x" aria-hidden="true"></i
          ></a>
          <a href=${info.links.linkedin} target="_blank" rel="noopener noreferrer"
            ><i class="fa fa-linkedin fa-2x" aria-hidden="true"></i
          ></a>
          <a
            href=${info.links.website}
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-globe fa-2x" aria-hidden="true"></i
          ></a>
        </div>
        <div class="card-location">
          <h5 class="location">${info.location.city} ${info.location.state} ${info.location.country}</h5>
        </div>
      </div>
    `;
}

async function pushToDom() {
  let fetchData = await fetch('https://raw.githubusercontent.com/twindle-co/twindle/main/twindle-web/team_details/data.json');
  let data = await fetchData.json();
  let users = data.users;
  let html = '';
  users.forEach(info => html += generateCard(info)
      )
  cards.innerHTML = html;
  }


pushToDom();
