# Your Vocabulary Book

[DEMO](https://--.azurewebsites.net/)

## Introduction

新增句子或問答，資料將於下方呈現，用來複習新增的句子與問答

Add some sentences or Q&A you want and the data will show below you can review the sentence or question in randon order.

## Feature

- login
  - jwt auth
- google auth

## user

- 僅作為複習使用、請勿儲存重要資料 或用作非法用途
- Data
  - save in mongo
  - can remove all user data
  - export data

## Build Steps

- express-server
  1. run `npm i` in terminal to install pakckage
  2. run `npm run build` in terminal to convert ts to js at `dist`
  3. run `node generateKeypair` in terminal to generate Key of JWT
  4. set `src/config.ts`
    [Google API](https://console.cloud.google.com/apis)
    [MongoDB](https://www.mongodb.com/cloud)
- common-code
  1. run `npm i` in terminal to install pakckage
- angular-view
  1. run `npm i` in terminal to install pakckage
  2. run `ng build --configuration production` in terminal and it will produce files to folder `express-server/public/`

### Development server

- express-server
  - Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

### Deployment

- Deploy folder `/express-server` to azure.
- Azure will automatically run `npm run build` and produce js files
- Azure will start `./bin/www` to serve
