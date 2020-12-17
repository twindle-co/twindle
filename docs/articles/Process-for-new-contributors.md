Hi everyone :wave:, usually when people get connected to an open-source project(which is yes, pretty much exciting :open_mouth: ), they are mostly unware about the project. Sure, they have some knowledge about the project but not enough to contribute to it. So, they must have enough knowledge about the project and the process, like to do what or where should they first start, etc. 
That's where this article comes in handy :metal: , as suggested by @Proful to write. So, let's go and try to know every process step by step. 

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
And you can update your github account by following this amazing article written by @SarveshKadam [Sync to main repo using pull request](https://github.com/twindle-co/twindle/blob/main/docs/articles/sync-to-main-repo-using-pull-request.md).

### Step 7
Now, we are ready to raise our first PR in upstream. So, we need to do this by using our github account by following the steps given below:
   
- Switch to our new branch
- Go to firstpr
- Click on the add file button(on upper right hand side)
- Click Create new file
- Give a name of your file like yourName.md, where .md is the name of the markdown extension
- Now, write about yourself in the space given below. Here, you have to use markdown language.
   
> Tip: Markdown Language is a simple markup language, one can use to format any doucment. If you want to learn basic syntax, you can go here :point_right: [Markdown Language](https://www.markdownguide.org/basic-syntax/).

### Step 8
Now, we are going for the 2nd pr but this time, we are raising a pr through our local machine. For this, again update your repo first in your both local as well
as remote account and you should follow this, `twindle/docs/Team.md` in your local branch. This is about the team members, where one has to write his/her name with 
github account link and some description about himself/herself using markdown language. For pushing the changes from your local machine to your github account, you need to execute this 
command,

```bash
git push origin [new-branch]
```
where, `origin` is the remote name. Please go here, if you want to know more [Gt Commands](https://github.com/twindle-co/twindle/blob/main/docs/articles/git%20-github-related.md).

### Step 9
So, you are about to raise your 3rd pr. In the 3rd pr, you will add your photo in the `Team.md`. First, you need to upload your photo here, `twindle/docs/images/team` through new branch by raising pr. After merging the changes, update your repo(it's compulsory) and then, go to  `twindle/docs/TEAM.md` in your new branch and edit the page, where in the image section in front of your name, put this code    `<img src="./images/team/yourName.jpg" width="80px">` according to the markdown syntax. 

>In between doing these things, you can write article also, where you can share simple approach of doing the steps, where you feel difficulties. This wiil surely give
 you confidence to express yourself and makes it easier for people to learn new things :relaxed: .
 
### Step 10
for 4th pr
 
Now, you can select any of the section like either you can go to twindle-cli or twindl-web or twindle-thread according to your choice.
