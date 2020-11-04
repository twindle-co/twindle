import { v4 as uuidv4 } from "uuid";

export const data = {
  people: [
    {
      id: uuidv4(),
      name: "Akshay Sharma",
      img: "https://avatars0.githubusercontent.com/u/37118877?v=4",
      links: {
        website: "https://www.developeratease.com/",
        linkedin: "https://www.linkedin.com/in/akshay-sharma-7962ab13a/",
        github: "https://github.com/Akshay2996",
        twitter: "https://twitter.com/AkshayS2909",
      },
      title: "FrontEnd Developer",
      location: {
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
      },
    },
    {
      id: uuidv4(),
      name: "Satyaki Bose",
      img:
        "https://avatars1.githubusercontent.com/u/25426670?s=400&u=7cc72ca148ae88bf19a10b8f36b21806504ffe34&v=4",
      links: {
        website: "",
        linkedin: "https://www.linkedin.com/in/satyaki07/",
        github: "https://github.com/satyaki07",
        twitter: "https://twitter.com/satyaki_07",
      },
      Title: "Developer",
      location: {
        city: "Kolkata",
        state: "West Bengal",
        country: "India",
      },
    },
  ],
};
