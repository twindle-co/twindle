# Twindle Teams Details

This page contains the list of Twindle Teammates that our working & contributing to Twindle.

## How to add your name to the list

To add your name to the list, simply open `persons.js` file, and then add your own row at the bottom, using the below template:
( **Don't include the square brackets "[ ]" !!! They are just there to indicate an example placeholder.** )

```moonscript
  ,{
    id: uuidv4(),
    name: "[YOUR_FULL_NAME]",
    img: "[YOUR_IMG_URL]",
    links: {
      website: "[YOUR_WEBSITE_URL]",
      linkedin: "[YOUR_LINKEDIN_URL]",
      github: "[YOUR_GITHUB_URL]",
      twitter: "[YOUR_TWITTER_URL]",
    },
    jobTitle: "[YOUR_TITLE]",
    location: {
      city: "[YOUR_CITY]",
      state: "[YOUR_STATE_OR_PROVINCE]",
      country: "[YOUR_COUNTRY]"
    }
  }
```

### Please note!

- **If you do not want to fill some of the fields, leave them blank (e.g. `state: "",`)**.
