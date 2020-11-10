const cards = document.querySelector(".card-gallery");

function generateCard(obj) {
    return `
    <div class="card">
        <div class="card-heading">
          <img
            src=`+obj.img+`
            class="image"
          />
          <h2 class="name">`+obj.name+`</h2>
          <h5 class="title">`+obj.title+`</h5>
        </div>
        <hr />
        <div class="card-links">
          <a
            href=`+obj.links.github+`
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-github fa-2x" aria-hidden="true"></i
          ></a>
          <a
            href=`+obj.links.twitter+`
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-twitter fa-2x" aria-hidden="true"></i
          ></a>
          <a href=`+obj.links.linkedin+` target="_blank" rel="noopener noreferrer"
            ><i class="fa fa-linkedin fa-2x" aria-hidden="true"></i
          ></a>
          <a
            href=`+obj.links.website+`
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-globe fa-2x" aria-hidden="true"></i
          ></a>
        </div>
        <div class="card-location">
          <h5 class="location">`+obj.location.city+` `+obj.location.state+` `+obj.location.country+`</h5>
        </div>
      </div>
    `;
}

async function pushToDom() {
  let fdata = await fetch('https://raw.githubusercontent.com/UnevenCoder/twindle/main/twindle-web/team_details/data.json')
  let data = await fdata.json()
  let users = data.users
  let str = ''
  users.forEach(data => str += generateCard(data)
      )
  cards.innerHTML = str
  }


pushToDom()
