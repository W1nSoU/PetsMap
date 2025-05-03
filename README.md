<h1 align="center">
    <b>Divass-Help-Map<br> HTML - Node.js - MongoDB </b> 
<br>
</h1>

<p align="center">
  <a href="/License"><img src="https://img.shields.io/github/license/guruhariharaun/Registration-and-Login-Form-in-Nodejs-and-MongoDB.svg?style=flat-square"></a>
</p>

## Table of contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Installation](#install)
- [Authors](#authors)

## Description

Hello everyone, we are The Divas team. We made this platform for coordinating the search for missing persons in the military conflict zone with our own efforts in 24 hours of painstaking work. The main idea was to make a one-page, non-scroll site that would simplify the search for missing soldiers and family members for volunteers and their families.

### DataBase:

MongoDB **[MongoDB Atlas(Cloud)](https://www.mongodb.com/cloud/atlas)** serves as our database. Three collections reside within this database:

- "users"
- "sessions"

•Main Form:
![](https://telegra.ph/file/fc3f6546855047dc1f44b.png)

•BIG map:
![](https://telegra.ph/file/3ed56e0c55d5c46fdd7e4.png)

•Registration Form 1:
![](https://telegra.ph/file/1c8134a3f8ad86890bea0.png)

•Registration Form 2:
![](https://telegra.ph/file/db9f2579d9459daca0ec0.png)

•Login Form:
![](https://telegra.ph/file/79575f73f27ad2e4743ce.png)

•User's Profile:
![](https://telegra.ph/file/e098807f8681d50392f49.png)

•Request-help Form:
![](https://telegra.ph/file/4118dd8bb136c68ecc41d.png)

•Contact Form:
![](https://telegra.ph/file/e8e2f411a06e564f04511.png)

•About Form:
![](https://telegra.ph/file/b05317a03c5bd3f92ef14.png)

## Prerequisites

Tools required to successfully execute this application:

- **_Node.js: [https://nodejs.org/en/](https://nodejs.org/en/)_**
- **_Node Package Manager: [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)_**
- **_MongoDB (Atlas): [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)_**

# Install

```
npm install
```

**## Database Connection**
Modify line 12 within `./server.js`:

**## Application Execution**

```
node server.js
```

The server will start Running on

- http://localhost:3000/

## Help

If you are unable to install the libraries at the first attempt, try deleting the “node_modules” folder and the “package-lock.json” file.

After that, enter the command:

```
npm install

npm i
```

## Authors

ex. [@Vatsonio](https://t.me/vatsonio)
ex. [@AdamSmasherr](https://t.me/IllaIlev)
ex. [@Dronchik09](https://t.me/andriy_chornobai)
ex. [@W1nSoU](https://t.me/W1nSoU)
ex. [@bushchakkkkkky](https://t.me/bushchakk)

## Version History

- 0.5

  - A LOT OF BUX FIX
  - fix about page (about.ejs)
  - added another imgs (assets)
  - big fix loggin problem (login.ejs)
  - added cool circle chart (about.ejs)
  - ...

- 0.4
  - A lot of fun
- 0.3
  - Added pages: info, map, register, login, feedback.
- 0.2
  - Added start code
- 0.1
  - Initial Release
