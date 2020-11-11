# Twindle Teams Details

This page contains the list of Twindle Teammates that our working & contributing to Twindle.

## How to add your name to the list

To add your name to the list, simply open `data.json` file, and then add your own data at the bottom, using the below template:
( **Don't include the square brackets "[ ]" !!! They are just there to indicate an example placeholder.** )

```moonscript
  ,{
    "id": "[next_number]",
    "name": "[YOUR_FULL_NAME]",
    "img": "[YOUR_IMG_URL]",
    "links": {
      "website": "[YOUR_WEBSITE_URL]",
      "linkedin": "[YOUR_LINKEDIN_URL]",
      "github": "[YOUR_GITHUB_URL]",
      "twitter": "[YOUR_TWITTER_URL]",
    },
    "title": "[YOUR_TITLE]",
    "location": {
      "city": "[YOUR_CITY]",
      "state": "[YOUR_STATE_OR_PROVINCE]",
      "country": "[YOUR_COUNTRY]"
    }
  }
```

### Please note!

- **If you do not want to fill some of the fields, leave them blank (e.g. `"state": "",`)**.


### How to add profile image using Github avatars

1. Go to your profile page on github.com
2. Append to your GitHub profile url “.png”, so it will look like this: 

    https://github.com/akshay2996.png

3. Hit enter and the browser will generate a page with your image, it look like this:
    
    https://avatars0.githubusercontent.com/u/37118877?v=4

4. Copy url of this page and paste it in persons.js file