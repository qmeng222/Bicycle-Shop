# Bicycle Shop

## Overview:

Get your bicycle shop up and running quickly with this customizable Node.js-based solution which allows users to browse through a catalog of bicycles with product descriptions, prices, and star ratings.

<br>

![Project Overview](/project-overview.gif)

<br>

## URls:

- Bicycle catalog: http://localhost:3000/
- Bicycle detail: http://localhost:3000/bicycle?id=1

<br>

## Setup:

1. `npm init -y` to create a new `package.json` file with default values for all fields. The `-y` flag stands for "yes" (automatically answer "yes" to all the prompts).
2. Custom script in the the `package.json` file:
   ```
   "scripts": {
    "server": "nodemon index"
   },
   ```
3. Start the server for the Node.js application: `npm run server`
