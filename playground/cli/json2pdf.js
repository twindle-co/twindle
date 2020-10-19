//data
var data =[
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
    var table = document.getElementById('tweetsTable');
  //loop over the tweets
    for(var i=0;i<tweets.length;++i)
    {
  //individual tweet
      var x =tweets[i];         
      var row =document.createElement('tr'); //creating row
      var k =['name','twitterHandle','image','createAt','tweet']; //key(k) of tweets 
  //loop over them and add them to cells and later add cells to rows
      for(var j=0;j<k.length;++j){
        var cell = document.createElement('td')
        cell.innerHTML=x[k[j]];
        row.appendChild(cell);
      }
      table.appendChild(row)
    }
   
  }
  displayTable(data);
  window.print();