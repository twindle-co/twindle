---

I assume you already forked the main repo and clone into your local

Initially it has a default remote called origin,that points to your fork on GitHub

     git remote -v
   
        
# Need to do
  - Fetch the changes from main Repo to local 
  - Merge the changes in your local
  - push the merged changes to you forked Repo

**Step 1:** - To keep track of the original repo, you need to add another remote named upstream

        git remote add upstream <main_repo>
 
**Step 2:** - Fetch the changes from main Repo to local     
    
        git fetch upstream
 
 **Step 3:** - Merge the changes in your local 
 
        git merge upstream/main
 
 **Step 4:** - push the merged changes to you forked Repo
    
        git push origin
