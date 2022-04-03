# koa-example

## how to start
1. install dependencies
   + [nodejs](nodejs.org)
2. install node modules
   ```sh
   npm install
   ```
3. create a .env file in the project root that contains your database url
   ```sh
   touch .env
   echo DATABASE_URL="<YOUR_DATABASE_URL>"
   ```
4. let prisma generate schema from given db
   ```sh
    npx prisma db pull
   ```
5. generate prisma client
   ```sh
   npx prisma generate
   ```
6. run the server
   ```SH
    npm run start
   ```

## resources
+ [typescript](www.typescriptlang.org)
+ [koa](koajs.com/)
+ [koa-router](github.com/ZijianHe/koa-router)
+ [prisma](www.prisma.io/)
+ [eslint](eslint.org/)
+ [mocha](mochajs.org/)
+ [should](shouldjs.github.io/)
+ [supertest](supertest.github.io/)