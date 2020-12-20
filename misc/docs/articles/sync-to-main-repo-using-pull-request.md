In this post, you will learn how to use Github pull request to synchronize your forked repository with the parent repository by following below steps.

1️⃣ Open and navigate to your forked repo on GitHub and generate a pull request

![image](https://user-images.githubusercontent.com/66166738/99892638-daa99800-2c9c-11eb-9e0b-0c3fb256287c.png)
<br>
2️⃣ Enter your fork repo as base repo

![image](https://user-images.githubusercontent.com/66166738/99892736-05482080-2c9e-11eb-8e3b-7900e93b4870.png)
<br>
3️⃣ Once you enter the base as your fork repo, you will be navigated to the "Comparing changes" section, just click "compare across forks"

![image](https://user-images.githubusercontent.com/66166738/99892706-8ce15f80-2c9d-11eb-9de0-f9a879a5b3b5.png)
<br>
4️⃣ Enter the original/main repo as the head repository and click on "create pull request".

![image](https://user-images.githubusercontent.com/66166738/99892752-4a6c5280-2c9e-11eb-8674-336b7f7ac675.png)
<br>
5️⃣ Enter the title of your pull request and press again on the "create pull request".

![image](https://user-images.githubusercontent.com/66166738/99893151-8dc8c000-2ca2-11eb-9ec2-ca2be173eeea.png)
<br>
6️⃣ It will perform some checks, and once all the tests are passed, click on the Merge pull request.

![image](https://user-images.githubusercontent.com/66166738/99892833-3e34c500-2c9f-11eb-8b6b-1090b7539bfb.png)
<br>
7️⃣ It's going to ask again to confirm the merger. Just press the "confirm merge" button

![image](https://user-images.githubusercontent.com/66166738/99892887-12fea580-2ca0-11eb-90d7-994dcaa9fc18.png)
<br>
8️⃣ Now you've successfully merged the file

![image](https://user-images.githubusercontent.com/66166738/99892927-77216980-2ca0-11eb-89d4-4e92a869da32.png)
<br>
9️⃣ Now we need to update the local clone repository as we sync our fork repo.
Navigate to the clone directory on your local machine and make sure you have opened the same branch you built the PR with, for me it was 'main'  and execute the command 'git pull'

![image](https://user-images.githubusercontent.com/66166738/99893023-80f79c80-2ca1-11eb-910c-93539ce2135c.png)
<br>
You've now updated your local clone with the changes you merged from the original GitHub repository into your fork.

