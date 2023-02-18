# Express Yup Typescript template
This is a template for a express API with typescript and yup validation.

## Getting started
1. Clone the repository
2. install dependencies with `npm install` or `yarn`
3. Create a .env file and set the environment variables (e.g., PORT, DATABASE_URL, etc.).
4. Run the development server using `npm run dev` or `yarn dev`


## Project structure
```bash
   |-- dist/
   |-- src/
        |-- middleware/
        |-- routes/
        |-- schemas/
        |-- utils/
            |-- types/
        |-- tests/
   .env  
```
- `dist`: This folder contains the compiled code. may not exist if you haven't run the build script yet.
- `src`: This folder contains the source code.	
- `src/middleware`: This folder contains the middlewares. functions that have access to the request and response objects before the request is handled by the route.
- `src/routes`: This folder contains the routes. functions that handle the request and send the response.
- `src/schemas`: This folder contains the schemas. functions that validate the request body.
- `src/utils`: This folder contains the utils. functions that are used in multiple places.
- `src/utils/types`: This folder contains the types. typescript types.
- `src/tests`: This folder contains the tests. functions that test the code.
  


## Environment variables
The environment variables are stored in the `.env` file.
example env file:

```bash
PORT=3000
```

## Scripts
- `npm run dev` or `yarn dev`: Runs the development server
- `npm run build` or `yarn build`: Builds the project for production into the `dist` folder
- `npm run start` or `yarn start`: Runs the production server	
- `npm run test` or `yarn test`: Runs the tests [!!!]

!!!: The tests are not implemented in this template as they are personal/situational preference.
You can use any testing framework you want

Testing is an important part of any software development project. 
It helps ensure that your code is working correctly
and prevents bugs and errors from being introduced into your application.

Here are some recommendations:

- Jest: https://jestjs.io/
- Mocha: https://mochajs.org/
- Jasmine: https://jasmine.github.io/
- Ava: https://github.com/avajs/ava

You can also use a test framework that is not listed here.

## License
MIT

## Author
Diego Vallejo - [@DiegoVallejoDev]("https://github.com/DiegoVallejoDev")

## Contributing
Feel free to contribute to this project by opening a pull request or an issue.



