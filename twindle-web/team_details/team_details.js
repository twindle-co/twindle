// import { data } from 'persons';
const data = [
    {
      id: 1,
      name: "Akshay Sharma",
      img: "https://avatars0.githubusercontent.com/u/37118877?v=4",
      links: {
        website: "https://www.developeratease.com/",
        linkedin: "https://www.linkedin.com/in/akshay-sharma-7962ab13a/",
        github: "https://github.com/Akshay2996",
        twitter: "https://twitter.com/AkshayS2909",
      },
      title: "FrontEnd Developer",
      location: {
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
      },
    },
    {
      id:2,
      name: "Satyaki Bose",
      img:
        "https://avatars1.githubusercontent.com/u/25426670?s=400&u=7cc72ca148ae88bf19a10b8f36b21806504ffe34&v=4",
      links: {
        website: "",
        linkedin: "https://www.linkedin.com/in/satyaki07/",
        github: "https://github.com/satyaki07",
        twitter: "https://twitter.com/satyaki_07",
      },
      title: "Developer",
      location: {
        city: "Kolkata",
        state: "West Bengal",
        country: "India",
      }
    },
    {
      id: 3,
      name: "Rafael Rodrigues",
      img:
         "https://avatars3.githubusercontent.com/u/46648727?v=4",
      links: {
         website: "",
         linkedin: "https://www.linkedin.com/in/rafaelrodrigues55/",
         github: "https://github.com/RafaelBatman55",
         twitter: "https://twitter.com/rafa_55",
      },
      title: "FrontEnd Developer",
      location: {
         city: "Resende",
         state: "Rio de Janeiro",
         country: "Brazil",
      },
    },
    ,{
      id:4,
      name: "Ameen Shafeeq",
      img: "https://avatars0.githubusercontent.com/u/49345531?v=4",
      links: {
        website: "https://ameencodes.tech/",
        linkedin: "",
        github: "https://github.com/unevencoder",
        twitter: "https://twitter.com/crafter_coder",
      },
      title: "Student",
      location: {
        city: "Jeddah",
        state: "",
        country: "Saudi Arabia"
      }
    }
  ]

const cards = document.querySelector(".card-gallery");

function generateCard(name,img,website,linkedin,github,twitter,title,city,state,country) {
    return `
    <div class="card">
        <div class="card-heading">
          <img
            src=`+img+`
            class="image"
          />
          <h2 class="name">`+name+`</h2>
          <h5 class="title">`+title+`</h5>
        </div>
        <hr />
        <div class="card-links">
          <a
            href=`+github+`
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-github fa-2x" aria-hidden="true"></i
          ></a>
          <a
            href=`+twitter+`
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-twitter fa-2x" aria-hidden="true"></i
          ></a>
          <a href=`+linkedin+` target="_blank" rel="noopener noreferrer"
            ><i class="fa fa-linkedin fa-2x" aria-hidden="true"></i
          ></a>
          <a
            href=`+website+`
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-globe fa-2x" aria-hidden="true"></i
          ></a>
        </div>
        <div class="card-location">
          <h5 class="location">`+city+` `+state+` `+country+`</h5>
        </div>
      </div>
    `;
}

data.forEach( data =>cards.innerHTML+=generateCard(data.name,data.img,data.links.website,data.links.linkedin,data.links.github,data.links.twitter,data.title,data.location.city,data.location.state,data.location.country)
)