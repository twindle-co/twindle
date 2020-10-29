const markdown = (name , tweet , url , username)=>{
return(
  '### ' + tweet + '\n'+'![img]('+url+')'+'\n'+name+' | '+username
)
}
console.log(
  markdown('naval','How to Get Rich (without getting lucky)','https://pbs.twimg.com/profile_images/1256841238298292232/ycqwaMI2_400x400.jpg','@naval')
)
