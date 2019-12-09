# reservation-module

## Seeding the Database
The database can be seeded with mock data with the files located in /server/seed. Run `db:setup` to seed the database with 100 loft listings and 1-10 randomly generated reservations for each listing.

## Testing
Testing is performed using the Jest testing framework with Enzyme to test React components. Run `test` to start Jest testing.

## Linting
Linting is performed by ESLint. Run `pretest` to start linting.

## Running the server
The server is routed using express. Nodemon is used to run the server in developer versions. Run `server` to start server with nodemon.

## Build
React files and components are located in the `/client` directory. These files are then bundled using webpack. Run `build` to build the public webpack file. 