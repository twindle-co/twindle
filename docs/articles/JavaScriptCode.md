We are here to understand how the code in the last lines are working, which is in the link [here](https://github.com/twindle-co/twindle/blob/7315f9fa05ef55a2278ee73c1634392653fea635/twindle-web/team_details/team_details.js)
, as shown below:
![code](https://user-images.githubusercontent.com/72906055/98683793-77aa2e00-238b-11eb-8660-44b06335f44c.JPG)

I asked about this code to **@UnevenCoder**. He hepled me in understanding the code by writing this code again with comments 
to understand in a better way. Thank you **Ameen**.

Firstly, we need to understand about **async** and **await** as both are used for **promise**:

   - Async makes code to execute in a unserialized manner.
   - Javascript runs moves the next line without ending the firsts , so to stop it at a line we use awaits , we use it in 
    an async function.
    
---
And now we are ready to understand the code:

    async function pushToDom() {
  
    // ^ makes the function asynchronous 

    let fdata = await fetch('https://raw.githubusercontent.com/UnevenCoder/twindle/main/twindle-web/team_details/data.json');
 
    // ^ This is the raw data that the api sends , like it will be in all quotations

    let data = await fdata.json();
  
    // ^ Now converting raw data in json , that can be read and worked on by us easily [ await here because we 
         first need the data to run this ]

    let users = data.users;
  
    //^From an api you receive tons of data so you are saying the thing you want [ will share an img later]

    let str = " "; 
  
    //[empty string]

    users.forEach(data => str += generateCard(data)) ;
      
    //[ looping through each item of an array , generate card is a function that returns a card component in string format like 
  
    <h1>hi</h1>
    cards.innerHTML = str; 
  
    //after str has all the cards we just add / inject it in DOM [ basically the website ]
    } 

    //[The End :) ]
 ---

From here, we are getting **data.users**:

![data](https://user-images.githubusercontent.com/72906055/98686443-965df400-238e-11eb-9d49-0393efed342b.JPG)

Suggestions are welcome!!
