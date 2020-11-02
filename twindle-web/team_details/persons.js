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
        twitter: "https://twitter.com/AkshayS2909"
      },
      Title: "FrontEnd Developer",
      location: {
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
      },
    },
  ]
}