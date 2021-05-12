
# Express Server

## Build Steps

1. run `npm i` in terminal to install pakckage
2. run `npm run build` in terminal to convert ts to js at `dist`
3. run `node generateKeypair` in terminal to generate Key of JWT
4. run `ng build --prod` at `angular-view` in terminal and it will produce files to folder `express-server/public/`

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment

- Deploy folder `/express-server` to azure.
- Azure will automatically run `npm run build` and produce js files
- Azure will start `./bin/www` to serve
