
# Express Server

## Build Steps

1. run `npm i` in terminal
2. run `node generateKeypair` in terminal
3. build angular-view and move files to folder `public/`

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment

- Deploy folder `/express-server` to azure.
- Azure will automatically run `npm run build` and produce js files
- Azure will start `./bin/www` to serve
