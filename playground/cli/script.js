main();
async function main(){
    var myData;
    myData=await require("./twit_thread.json");
    console.log(await myData);  
}


