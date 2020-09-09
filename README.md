# Reboot BackendEnd Sample

## Introduction

## Directory Structure

## Setup

### Install & Update Dependencies

The first time you start the server you may want to make sure you have the dependencies installed, in the right versions. To do so, just go to the terminal and type:

```
$ npm install
```

### Install StandardJS Linter

[StandardJS](https://standardjs.com/) is a JavaScript style guide, linter, and formatter.

- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs

> VSCODE `SETTINGS.JSON`:

```
  "javascript.validate.enable": false,
  "editor.formatOnPaste": false,
  "editor.formatOnSave": false,
  "editor.formatOnType": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

  "standard.enable": true,
  "standard.run": "onType",
  "standard.autoFixOnSave": false,
  "standard.usePackageJson": true,

  // ESLINT + PRETTIER + VETUR
  "vetur.validation.template": false,
  "vetur.experimental.templateInterpolationService": false,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "vue-html"
  ],
```

_Make sure you don't have duplicate rules!_

### Environment Variables

The next setup step is to create an `Environment Variable` file `.env` in this folder. We have provided a `.env.example` for you with a sample configuration for both **development** and **production** environments.

Make your own copy\_

```
$ cp .env.example .env
```

And customize the sample params to your needs

- mongoURL: "mongodb://localhost/",
- mongoDBName: 'reboot',
- apiKeys : "fakeapikey",
- port : 5000

## Start local Server

You can start your server anytime with:

```
$ npm run start
```

You should see something like:

```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.43.142:8080
Hit CTRL-C to stop the server
```

## MODELS

### LOCATION MODEL

| KEY  | TYPE   | REFERENCE | REQUIRED | VALIDATIONS / DEFAULT |
| ---- | ------ | --------- | -------- | --------------------- |
| name | String |           | true     | -                     |

### USER MODEL

| KEY      | TYPE   | REQUIRED | VALIDATIONS  | DEFAULT |
| -------- | ------ | -------- | ------------ | ------- |
| email    | String | true     | regex(email  |
| name     | String | true     |              |
| role     | String | true     | user/partner | user    |
| password | String | true     | min(6)       |
| location | String | true     | enum         |
| img      | String | no       |              |

### CATEGORY MODEL

| KEY  | TYPE   | REFERENCE | REQUIRED | VALIDATIONS / DEFAULT |
| ---- | ------ | --------- | -------- | --------------------- |
| name | String |           | true     | -                     |

### STYLE MODEL

| KEY         | TYPE     | REFERENCE | REQUIRED | VALIDATIONS / DEFAULT |
| ----------- | -------- | --------- | -------- | --------------------- |
| user        | ObjectId | user      | true     | -                     |
| category    | ObjectId | category  | true     |
| description | String   | -         | true     |
| content     | String   | -         | true     |
| price_min   | Number   | -         | true     |
| price_max   | Number   | -         |          |
| img         | String   | -         |          |

### RATING MODEL

| KEY        | TYPE     | REFERENCE | REQUIRED | VALIDATIONS / DEFAULT |
| ---------- | -------- | --------- | -------- | --------------------- |
| partner    | ObjectId | Users     | true     | -                     |
| user       | ObjectId | Users     | true     |
| rate       | Number   |           | true     | min: 1, max: 5        |
| comment    | String   | -         | true     |
| created_on | Date     | -         |          | date.now              |

### ROOM MODEL

| KEY       | TYPE     | REFERENCE | REQUIRED | VALIDATIONS / DEFAULT |
| --------- | -------- | --------- | -------- | --------------------- |
| user      | ObjectId | Users     | true     |
| partner   | ObjectId | users     | true     | -                     |
| subject   | String   | -         | true     |
| create_on | Date     | -         |          | date.now              |

### MESSAGE MODEL

| KEY        | TYPE     | REFERENCE | REQUIRED | VALIDATIONS / DEFAULT |
| ---------- | -------- | --------- | -------- | --------------------- |
| room       | ObjectId | room      | true     |
| user       | ObjectId | users     | true     | -                     |
| msg        | String   | -         | true     |
| created_on | Date     |

## API ROUTES

Please note that all routes in this API should be called with the `/api` prefix before the endpoint:

```
POST http://DOMAIN/api/auth/signup
```

### AUTHENTICATION ENDPOINTS

> TOKEN Required: NO

| METHOD | URL           | What does it do      | PARAMS                             |
| ------ | ------------- | -------------------- | ---------------------------------- |
| POST   | `auth/signup` | Create a new user    | role = `user` (default), `partner` |
| POST   | `auth/login`  | Authenticates a user |

### PARTNERS ENDPOINTS

> TOKEN Required: NO

| METHOD | URL             | What does it do |
| ------ | --------------- | --------------- |
| GET    | `/partners`     | Get All Partner | query = location |
| GET    | `/partners/:id` | Get One Partner |

### USER ENDPOINTS

> TOKEN Required: YES

| METHOD | URL   | What does it do   |
| ------ | ----- | ----------------- |
| PUT    | `/me` | Update My Profile |
| GET    | `/me` | Get My Profile    |
| DELETE | `/me` | Delete My Profile |

### ME ROOMS ENDPOINTS

> TOKEN Required: YES

| METHOD | URL            | What does it do       |
| ------ | -------------- | --------------------- |
| GET    | `me/rooms`     | Get Rooms I have open |
| POST   | `me/rooms`     | Create Room           |
| GET    | `me/rooms/:id` | Get Room Message      |
| DELETE | `me/rooms/:id` | Delete Room           |
| POST   | `me/rooms/:id` | Create Message        |

### ME STYLES ENDPOINTS

> TOKEN Required: YES ROLE: PARTNER

| METHOD | URL             | What does it do        |
| ------ | --------------- | ---------------------- |
| GET    | `me/styles`     | Get All Partner Styles |
| POST   | `me/styles`     | Create Style           |
| DELETE | `me/styles/:id` | Delete Style           |
| GET    | `me/styles/:id` | Get One Style          |
| PUT    | `me/styles/:id` | Update Style           |

### RATING ENDPOINTS

> TOKEN Required: YES ROLE: PARTNER

| METHOD | URL              | What does it do          |
| ------ | ---------------  | ----------------------   |
| GET    | `me/ratings`     | Get All Partner ratings |
| POST   | `me/ratings`     | Create Rating           |
| DELETE | `me/ratings/:id` | Delete Rating           |
| GET    | `me/ratings/:id` | Get One Rating          |
| PUT    | `me/ratings/:id` | Update Rating           |

Happy coding!
