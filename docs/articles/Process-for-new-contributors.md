Hi everyone, usually when people get connected to an open-source project(which is yes, pretty much exciting), they are mostly unware about the project. Sure, they have some knowledge about the project but not enough to contribute to it. So, they must have enough knowledge about the project and the process, like to do what or where should they first start, etc. 
That's where this article comes in handy, as suggested by @Proful to write. So, let's go and try to know every process step by step. 

### Step 1
From the [twindle-co](https://github.com/twindle-co/twindle) to get a copy of that github account in your account.

### Step 2
Download [Git](https://git-scm.com/) and [connect the github account to it](https://linuxize.com/post/how-to-configure-git-username-and-email/).

### Step 3
Fork Twindle repository by clicking on the `Fork` button on top right corner. This will make your own copy of Twindle's code, and it will be synced up to the upstream(i.e, `twindle-co/twindle` in this case). 

### Step 4
Clone the git repository from your github account into your local machine using git `bash`/ terminal (Most likely, it's git bash for windows users).There are different ways to clone a repository into your local machine, like you can use HTTPS, SSH or GitHub CLI, but this below will do it for everyone.
```bash
git clone https://github.com/[YOUR_USERNAME]/twindle.git
```

Replace `[YOUR_USERNAME]` with your git username.

The whole repository will be copied in that folder.

> Tip: Always remember to work or make changes in a new branch, for this, you have to create a new branch and then, work in it like make changes or add something.
        
What is Pull Request and why should we raise one? Pull Request(PR) is just you requesting from the authority, the original upstream branch, whose application you have forked, and in that forked application, you have done some changes or added some codes. To incorporate those changes in the main file, you have to raise a pull request(pr) to the authority. So, just making some meaningful changes and save it in your account won't be beneficial until those changes are added in to the main file. That's where pull request(pr) comes into the picture. 

### Step 5
Make a new branch in your fork.

### Step 6
First go to the new branch, and in that branch go in a file called firstpr of the forked file of twindleco, go there and follow     
        the steps given below: 
        
a) Click the add file  
b) Type a file name with .md as file extensin ( .md means this is a file in markdown format) like, ramesh.md and give info about yourself, you can also use markdown to make file looks better. There are some rules for writing markdown.
c) Then, write Create ramesh.md and then, click commit new file.
        
This file will be saved in your account. To incorporate these changes in the main file, you have to raise pr.
        
> Tip: Before raising a pr from the main branch in order to merge your changes into the main file, always update your repository by pulling latest code from upstream branch by running this 👇

```bash
git pull upstream main
```

### Step 7
Now, we are ready to raise our first PR in upstream. So, we need to do this by using our github account by following the steps given below:
   
- Switch to our new branch
- Go to firstpr
- Click on the add file button(on upper right hand side)
- Click Create new file
- Give a name of your file like yourName.md, where .md is the name of the markdown extension
- Now, write about yourself in the space given below. Here, you have to use markdown language.
   
> Tip: Markdown Language is a simple markup language, one can use to format any doucment. If you want to learn basic syntax, you can go here, [Markdown Language](https://www.markdownguide.org/basic-syntax/).

### Step 8
for 2nd pr

### Step 9
for 3rd pr

### Step 10
for 4th pr
 
Now, you can select any of the section like either you can go to twindle-cli or twindl-web or twindle-thread according to your choice.
