Here, I am writing some questions and try to give the answer(if you think you have better answer then, you are welcome!!) regarding 
JavaScript codes (thanks to Kenny, who encouraged me to do this), which beginners(like me) mostly face problems to understand and 
will add new questions/answers in future and I highly suggest everyone to come forward and add your questions/answers. 

**Problem no. 1** 

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


**Problem no. 2**

Could you please explain what is the function of these brackets{} in the below code?

    module.exports = { createPdf };
 
In JavaScript, we can create objects using brackets like

   `{ name: "Twindle" }`
   
It is an object. Suppose you save this object into a variable me

   `const me = { name: "Twindle" }`
   
Then you will be able to print this in the console

   `console.log(http://me.name);`
   
Because there's an object called me and in the object, there is a property called name. There is a concept in JavaScript. Here we did,

   `{ name: "Twindle" }`
   
Instead, if you already have something like this

   `const name = "Twindle";`
   
Then, you can use that variable to create an object

e.g. `const me = { name: name };`

(Please pay special attention here, we have already created name variable and we are assigning that name variable as 
value in the name property in the object.) Then, you will still be able to print this in the console, 

   `console.log(http://me.name);`
   
And it will work the same way. So, now we have

   `const me = { name: name };`
   
In the above code, `name:name` looks odd. So, javascript made the syntax shorter.

e.g. `const me = { name };`

This means find the existing name variable. And store that with the same variable name and the variable value
Then you will be still able to do this

     `console.log(http://me.name);`

We will get the same result. So, we have to write the same name as the variable or you need to create the variable name as needed in the object.

Suggestions are welcome!!
