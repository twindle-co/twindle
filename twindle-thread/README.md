# Twindle Threads project

This project is basically a big curated list of threads best usable for Twindle for PDF conversion.

This folder contains the **frontend** part of Twindle Threads. See the `README.md` in `backend` folder for documentation about the server-side code.

# Stack

- ⚡ Svelte as the frontend framework. Reasons - Beginner-friendly, encapsulation, Simple Code, Reactivity. Working knowledge required for contribution (See Svelte Tutorial).
- ❄ Snowpack for serving and building the app. Kind of like Webpack or Rollup, but with next to no configuration. Reasons - No configs, highly organized, very customizable, 🔥 Hot Reloading. Working knowledge not needed 😀

# How to run

> Prerequisite: This app is tightly integrated with the backend code and will break if backend server is not started. See the `README.md` file in `backend` folder for instructions

## Development

For development stage(i.e. when you're contributing), Open up your terminal/Command Prompt and enter the following command:

```bash
npm start
```

This will start a local server and open up the page in your default browser automatically 🎇.

Snowpack supports hot reloading, so any changes you do in your codebase will be reflected instantaneously in the open tab.

> Note: Hot reloading support for Svelte is a bit flaky. Reload your page if you don't see instant hot reload.

## Production build

To generate a production build, just run the `npm run build` command, and the production build will be generated, and a service worker precaching all the JS files will be generated too. [What are service workers?](https://medium.com/commencis/what-is-service-worker-4f8dc478f0b9)

The build generated is optimized, but not bundled. That is, there are multiple JS files rather than a single huge file, and they all work through ES imports.

Advantages: \
⚡ These bundles can be loaded parallelly on HTTP/2 connections, and a lot of browsers support HTTP/2, increasing performance. \
📦 Caching: When any changes are deployed to our live site, user's device will download only files that have changed, rather than a huge singleton bundle. \
🤏 These bundles downloaded separately are much smaller than a huge singleton.

However, the support for these go back only as back as mid-2017, when Chrome first implemented ES6 Modules, and up to Firefox, which did that in early 2018.

![ES6 Modules support](https://res.cloudinary.com/ireaderinokun/image/upload/v1606567471573/caniuse-embed/all/es6-module.png)

For now, we're sticking only to ES Modules. However, we may introduce Differential loading in future, where newer browsers get the separate ES Modules, and old ones get the single bundled file.

### Destination

These bundles are generated in the `build` folder (not in the repo).

## Documentation

### Media Queries

We'll follow the breakpoint:

- `960px` for tablets
- `600px` for mobile screens

This value will need to be hard coded into our code, so it's better to keep as low of these breakpoints as possible for better maintainability.
