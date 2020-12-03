let  pinfo = document.getElementById("ptext");
let  name = document.getElementById("user");
let  imgD = document.getElementById("userimgD");

const data = [
  {
    id: 0,
    name: "Random1",
    text:
      "This project was started to encourage people who just started to learn programming and it took off like a rocket. People from diverse backgrounds engaged together like a football team to make this possible.",
    img: "https://avatars0.githubusercontent.com/u/354596?s=64&v=4g"
  },
  {
    id: 1,
    name: "Random2",
    text:
      "Random 2- Pri id phaedrum tincidunt reformidans, qui ponderum antiopam gloriatur ut. Amet appellantur et eum, habeo debet eu mel. Et denique explicari quo. Ut vel erant euripidis constituto, mel ne molestie recusabo inciderint",
    img:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/09f66320974015.562f438db41be.jpg"
  },
  {
    id: 2,
    name: "Random3",
    text:
      "Random 3 - Pri id phaedrum tincidunt reformidans, qui ponderum antiopam gloriatur ut. Amet appellantur et eum, habeo debet eu mel. Et denique explicari quo. Ut vel erant euripidis constituto, mel ne molestie recusabo inciderint",
    img: "https://avatars0.githubusercontent.com/u/354596?s=64&v=4"
  },
  {
    id: 3,
    name: "Random4",
    text:
      "Random 4- Pri id phaedrum tincidunt reformidans, qui ponderum antiopam gloriatur ut. Amet appellantur et eum, habeo debet eu mel. Et denique explicari quo. Ut vel erant euripidis constituto, mel ne molestie recusabo inciderint",
    img:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/09f66320974015.562f438db41be.jpg"
  },
  {
    id: 4,
    name: "Random5",
    text:
      "Random 5 - Pri id phaedrum tincidunt reformidans, qui ponderum antiopam gloriatur ut. Amet appellantur et eum, habeo debet eu mel. Et denique explicari quo. Ut vel erant euripidis constituto, mel ne molestie recusabo inciderint",
    img: "https://avatars0.githubusercontent.com/u/19240564?s=64&v=4"
  },
  {
    id: 5,
    name: "Random",
    text:
      "Random - Pri id phaedrum tincidunt reformidans, qui ponderum antiopam gloriatur ut. Amet appellantur et eum, habeo debet eu mel. Et denique explicari quo. Ut vel erant euripidis constituto, mel ne molestie recusabo inciderint",
    img:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/09f66320974015.562f438db41be.jpg"
  }
];

async function goFront(d) {
  let i = await d.filter((x) => {
    if (name.innerText == '- ' + x.name) {
      return x;
    }
  });

  let info = await d[i[0].id + 1] ? d[i[0].id + 1] : null;
  if(info != null)
{ 

  pinfo.innerText = ''
  pinfo.innerText = info.text;
  name.innerText = "- " + info.name;
  imgD.innerHTML = "<img id='userImg' src=" + info.img + "/>";}
}

async function goBack(d) {
  let i = await d.filter((x) => {
    if (pinfo.innerText == x.text) {
      return x;
    }
  });
  let info = await d[i[0].id - 1] ? d[i[0].id - 1] : null;

  if (info != null)
  {
    pinfo.innerText = info.text;
  name.innerText= "- " + info.name;
  imgD.innerHTML = "<img id='userImg' src=" + info.img + " alt=''/>";}
}

document.getElementById("front").setAttribute("onclick", "goFront(data)");
document.getElementById("back").setAttribute("onclick", "goBack(data)");
