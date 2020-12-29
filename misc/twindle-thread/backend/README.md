This is the server-side code of Twindle-threads project.

# Stack

- 🐕‍🦺 Express Server
- 🗳 MySQL for storing the data
- 🐱‍👤 [mysql2](https://www.npmjs.com/package/mysql2) for interfacing with the MySQL Database

# Installing dependencies

Open up your terminal/Command Prompt, `cd` into this directory, and run the following command:

```bash
npm install
```

# Installing MySQL

You need to have MySQL Database and Server installed on your device. The guides to download these are below:

Windows: https://www.liquidweb.com/kb/install-mysql-windows/ \
MacOS: https://flaviocopes.com/mysql-how-to-install/ \
Ubuntu/Debian: https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04 \
Fedora Linux: https://computingforgeeks.com/how-to-install-mysql-8-on-fedora/ \

After completing the above steps, run the below command

```bash
npm start
```

This will start up the express server. It uses [nodemon](https://www.npmjs.com/package/nodemon), so the server automatically refreshes on any code changes.

## Troubleshooting

You might get this error when testing out the code: `Client does not support authentication protocol requested by server; consider upgrading MySQL client`

In that case, the solution is documented here: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
