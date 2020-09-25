
#  ORAAN Backend RESTful API Node Server 


A boilerplate/starter RESTful APIs using Node.js, Express, and Mongoose.


## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
 -[Token base Authentication](#token-base-auth)
- [Postman-tests](#postman-test)
## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Error handling**: showing error to the terminal
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)

## Getting Started

### Installation

Clone the repo:

```bash
git https://github.com/ameenmari/OraanBackendTest.git

 cd backendTestOraan-alpha
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

### Commands

Running locally:

```bash
npm run server
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes 
 |--validations\    # Request data validation schemas
 |--server.js          # Express app and App entry point
 
```

## API Documentation

To test the APIs end-points, run the server and go to `http://localhost:5000` in your postman..

### API Endpoints

List of available routes:

**USER routes**:\
`POST /api/users/register` - register\
`GET /api/users/signin` - signin\

**Instalment routes**:\
`POST /api/instalments/saveinstalment` - store the user instalment info\
`GET /api/instalments/totalInstalments` - get the total amount the user paid\

## Error Handling

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
};
```


## Validation

Request data is validated using [Joi](https://hapi.dev/family/joi/). Check the [documentation](https://hapi.dev/family/joi/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `/validations.js` directory and are used in the routes by providing them as parameters to the userRoute and instalmentRoute.

```javascript
const express = require('express');
const {registerValidation,signinValidation} = require('../validatation');

const router = express.Router();

router.post('/signin', async (req, res) => {

    const { error } = signinValidation(req.body)
     }
```



#token-base-Authentication
### JsonWebToken



JsonWebToken help to create tokens to authenticate users [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).

Create accesstoken and refreshtoekn when user login or signup

`POST api/auth/refresh_token` - generate accessToken by providing refresh token in body\

```json
{
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNmUwNDEzYTI1NmViMGE3ODNkN2E1YiJ9LCJpYXQiOjE2MDEwNDU1MjMsImV4cCI6MTYwMTEzMTkyM30.naHqeMsSeYF6cRLYtjfr_XgH_O_AKEVtcxc3XUkWz3U"
}```


# postman-test

### Register a user

**POST** `http://localhost:5000/api/users/register`

Body of **request** must be JSON. Sample:


```json
{
  "number": "03033333333",
  "name":"Muhammad Ameen",
  "password": "ameen123"
}
```
Valid request will return a JSON string **response** like this sample:

```json
{
    "_id": "5f6c5a3e87166419e0506ca7"
}
```


### Signin 

**Get** `http://localhost:5000/api/users/signin`

Body of **request** must be JSON. Sample:

```json
{
  "number": "03033333333",
  "password": "ameen123"
}
```

Valid request will return a JSON string **response** like this sample:

```json
{
    "_id": "5f6c5a3e87166419e0506ca7"
}
```


### Save user instalment

**POSt** `http://localhost:5000/api/instalments/saveinstalment`

Body of **request** must be JSON. Sample:

```json

{
    "userId":"5f6c5a3e87166419e0506ca7",
    "instalmentAmount":"9000",
    "paymentMethod":"JazzCash"

}
```

Valid request will return a JSON string **response** like this sample:

```json
{
    "message": "instalment paid"
}
```




### Get total amount of a user paid in instalments 

**POSt** `http://localhost:5000/api/instalments/totalInstalments`

Body of **request** must be JSON. Sample:

```json

{
    "userId":"5f6c5a3e87166419e0506ca7",
    
}
```

Valid request will return a JSON string **response** like this sample:

```json
{
    "total": 9000
}
```


### Get accessToken by giving refresh token in body 

**POSt** `http://localhost:5000/api/auth/refresh_token`

Body of **request** must be JSON. Sample:

```json
{

"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNmUwNDEzYTI1NmViMGE3ODNkN2E1YiJ9LCJpYXQiOjE2MDEwNDU1MjMsImV4cCI6MTYwMTEzMTkyM30.naHqeMsSeYF6cRLYtjfr_XgH_O_AKEVtcxc3XUkWz3U"
}

```

Valid request will return a JSON string **response** like this sample:

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXIiOnsiX2lkIjoiNWY2ZTA0MTNhMjU2ZWIwYTc4M2Q3YTViIn0sImlhdCI6MTYwMTA0NTUyMywiZXhwIjoxNjAxMTMxOTIzfSwiaWF0IjoxNjAxMDQ4MjI1LCJleHAiOjE2MDEwNDg4MjV9.zybcRN02N587BAQWYHmHE6WU4Mosc-kxRaRYXnjwJKw"
}
```





## License

[MIT](LICENSE)
