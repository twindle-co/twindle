//data
const data =[
  {
name: 'Naval',
twitterHandle: 'naval',
image: 'https://pbs.twimg.com/profile_images/1256841238298292232/ycqwaMI2_400x400.jpg',
createAt: '2018-05-31',
tweet: 'How to Get Rich (without getting lucky):'
   },
  {
name: 'Naval',
twitterHandle: 'naval',
image: 'https://pbs.twimg.com/profile_images/1256841238298292232/ycqwaMI2_400x400.jpg',
createAt: '2018-05-31',
tweet: 'How to Get Rich 1(without getting lucky):'
  }
];

function displayTable(tweets){
// accessing table element
const table = document.getElementById('tweetsTable');
//loop over the tweets
tweets.forEach(function (currentTweet)
{

const row =document.createElement('tr'); //creating row
const k =['name','twitterHandle','image','createAt','tweet']; //key(k) of tweets 
//loop over them and add them to cells and later add cells to rows
for(let j=0;j<k.length;++j){
let cell = document.createElement('td')
cell.innerHTML=currentTweet[k[j]];
row.appendChild(cell);
}
table.appendChild(row)
})

}
displayTable(data);
window.print();
