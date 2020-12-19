//'{"name": "Naval","twitterHandle": "naval", "city":"New York","image":"abs.jpg","tweet": "Tweet1","createAt": "2018-05-31"}')

//parse json before using it as data
var data = [
  {
    name: "Adam ",
    twitterHandle: "@horse",
    createdAt: "2018-05-31",
    tweet: "How to Get Rich (without getting lucky) 1",
    image: "http://placekitten.com/g/200/300",
  },
  {
    name: "Kate ",
    twitterHandle: "@cat",
    createdAt: "2018-05-31",
    tweet: "How to Get Rich (without getting lucky) 2",
    image: "http://placekitten.com/g/200/300",
  },
  {
    name: "Jenny ",
    twitterHandle: "@squirrel",
    createdAt: "2018-05-31",
    tweet: "How to Get Rich (without getting lucky) 3",
    image: "http://placekitten.com/g/200/300",
  },
];
function display(_tweet) {
  let myUl = document.querySelector("ul");
  data.forEach(function (obj) {
    //This is just creating the skeleton
    const myList = document.createElement("li");
    //first division creation
    const div1 = document.createElement("div");
    div1.className = "tweetContainer";
    myList.appendChild(div1);
    //second divison creation
    const div2 = document.createElement("div");
    div2.className = "header";
    div1.appendChild(div2);
    let p1 = document.createElement("p"); //sibling of div2
    p1.textContent = obj.tweet;
    div1.insertBefore(p1, div1.firstElementChild.nextSibling); //insertafter() property is not there
    //sibling of div2 attached

    let image = document.createElement("img");
    image.src = obj.image;
    div2.appendChild(image);
    const div3 = document.createElement("div");
    div2.insertBefore(div3, div2.firstElementChild.nextSibling);
    const h3 = document.createElement("h3");
    div3.appendChild(h3);
    let p2 = document.createElement("p");
    div3.insertBefore(p2, div3.firstElementChild.nextSibling);
    let span1 = document.createElement("span");
    span1.textContent = obj.twitterHandle;
    h3.textContent = obj.name;
    h3.appendChild(span1);
    let span2 = document.createElement("span");
    span2.textContent = obj.createdAt;
    p2.appendChild(span2);
    myUl.appendChild(myList);
  });
}
display(data);
//printing function
let button = document.querySelector("#myButton");
button.addEventListener("click", function () {
  document.querySelector("ul");
  window.print();
});
