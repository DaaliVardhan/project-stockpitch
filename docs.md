# Stock Pitch Api Documentation

The documentation of Every Api Endpoint available for Stockpitch

<br>
<br>

## Authentication

The endpoints for authentication, Registering a new user, login user, and social media logins

<br>
<br>

### `POST` To Register a New User

**Description**
To register a new user with new email and phone number.
**URL:**
```
http://localhost:3000/api/auth/register
```

**Request:**
```javascript
    const url = "http://localhost:3000/api/auth/register";
    const body = {
        email:"example@gmail.com",
        password:"examplepassword",
        phone:"0987654321",
    };
    const options = {
        method:"POST",
        body:JSON.stringify(body);
    }
    
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```
**Response:**
```json
{
    "success": true,
    "userId": "649d3f961010490f98233b2d",
    "otpSent": true,
    "message": "OTP sent successfully"
}

cookie (Http only) = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDlkM2Y5NjEwMTA0OTBmOTgyMzNiMmQiLCJvdHAiOiI0NDM1IiwiaWF0IjoxNjg4MDI3MDMwLCJleHAiOjE2ODgwMjc5MzB9.PgSMg59LJTztQtpxRIjguzf8AT6pVIs0kXey0e61dwU"
```

### `POST` To verify otp  { #verifyOtp }

**Description**
To verify otp sent to the user email
// The Http only Token was stored in the client browser , it is required to verify the email.
**URL:**
```
http://localhost:3000/api/auth/verifyEmailOTP
```

**Request:**
```javascript
    const url = "http://localhost:3000/api/auth/verifyEmailOTP";
    const body = {
        userId:"649d3f961010490f98233b2d"
    };
    const options = {
        method:"POST",
        credentials:"include",
        body:JSON.stringify(body);
        
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```
**Response:**
```json
{
  "success": true,
  "message": "Successfull User Created and Verified, You can login now",
  "userId": "649d548bfd6267de1a90796e"
}
```

<br>
<br>

### `POST` Resend OTP

**Description**
If the user registered but not verified , the request generates a new otp to the registered email address
The otp sent to the user will expire after few minutes, If the user already registered, The user need to verify their email, to access the remaining routes.

**URL**
```
    http://localhost:3000/api/auth/resendOTP
```


**Request**
```javascript
    const url = "http://localhost:3000/api/auth/resendOTP";
    const body = {
        "email":"Example@gmail.com",
        "password":"Example"
    };
    const options = {
        method:"POST",
        body:JSON.stringify(body);
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```
**Response**
```json
{
  "message": "OTP sent successfully",
  "error": false,
  "userId": "649d548bfd6267de1a90796e"
}

// It will be a Http only cookie in actual implementation.But now you can send it as Bearer token for now.
otpToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDlkNTQ4YmZkNjI2N2RlMWE5MDc5NmUiLCJvdHAiOiIxNzQzIiwiaWF0IjoxNjg4MDMzMjIxLCJleHAiOjE2ODgwMzQxMjF9._malNcoc4fiGZkx1JygtBYuggrI4DkRtjnTrI4w6W6U",
```
> Note : Same [verifyEmailOtp](#verifyOtp) can be used to verify email

### `POST` Login the User

**Description**
To access the available routes a user has to be authenticated.

**URL**
```
    http://localhost:3000/api/auth/login
```


**Request**
```javascript
    const url = "http://localhost:3000/api/auth/login";
    const body = {
        "email":"Example@gmail.com",
        "password":"Example"
    };
    const options = {
        method:"POST",
        body:JSON.stringify(body);

    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```
**Response**
```json
{
  "success": true,
  "userId": "6488809ebbeaba9e7c7c1a58",
  "email": "example@gmail.com",
  "profilePicture": "",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDg4ODA5ZWJiZWFiYTllN2M3YzFhNTgiLCJpYXQiOjE2ODgwMzQ2NTUsImV4cCI6MTY4ODAzODI1NX0.cqTPjY5zoZWOGvb7cw-bjlAxBOcChPwVVTUgB9wq7RY",
  "name": "",
  "isEmailVerified": true
}

// refresh token
cookie(HttpOnly) = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDg4ODA5ZWJiZWFiYTllN2M3YzFhNTgiLCJpYXQiOjE2ODgwMzQ2NTUsImV4cCI6MTY4ODEyMTA1NX0.vHcpA9e63GCmn1PXeahBJR3Ooe8NnpPo-b8O3LX9sFo"
```


### `POST` Forgot Password

**Description**
If the user has forgets the password, The User can request for a forgot password, It generates sends an otp to the registered email, and verify the otp, then the user can change the password.

**URL**

```
    http://localhost:3000/api/auth/forgot
```

**Request**
```javascript
    const url = "http://localhost:3000/api/auth/forgot";
    const body = {
        "email":"Example@gmail.com",
    };
    const options = {
        method:"POST",
        body:JSON.stringify(body);
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```

**Response**
```json
{
  "success": true,
  "userId": "649d548bfd6267de1a90796e",
  "otpSent": true,
  "message": "OTP sent to your email"
}

cookie (HttpOnly) = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDlkNTQ4YmZkNjI2N2RlMWE5MDc5NmUiLCJvdHAiOiI1ODc4IiwiaWF0IjoxNjg4MDM1MTgzLCJleHAiOjE2ODgwMzYwODN9.0G6_gHeWwcXEWvelaHuata6bw1pRAuQKg-GMiJBjEk4"
```


### `POST` Verify the forgot password otp

**Description**
The route only verify the otp sent to the email, that is requested for forgot password. It requires the token (HttpOnly) sent to the browser

**URL**
```
    http://localhost:3000/api/auth/forgot/verify
```

**Request**
```javascript
    const url = "http://localhost:3000/api/auth/verify";
    const body = {
        "userId":"649d548bfd6267de1a90796e",
        "otp":"5878"
    };
    const options = {
        method:"POST",
        credentials:"include",
        body:JSON.stringify(body);
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```


**Response**
```json
{
  "success": true,
  "message": "OTP verified, You can update your password",
  "userId": "649d548bfd6267de1a90796e",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDlkNTQ4YmZkNjI2N2RlMWE5MDc5NmUiLCJpYXQiOjE2ODgwMzU0ODMsImV4cCI6MTY4ODAzNTYwM30.YT4AnsjC5580s67_ZdcmxdoSiWLv5VQ3PGAGWtAbbgM"
}
cookie (HttpOnly)= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDlkNTQ4YmZkNjI2N2RlMWE5MDc5NmUiLCJpYXQiOjE2ODgwMzU0ODMsImV4cCI6MTY4ODAzNTYwM30.YT4AnsjC5580s67_ZdcmxdoSiWLv5VQ3PGAGWtAbbgM"
```

### `POST` Change password

**Description**

The password change route only available with the token (HttpOnly) provided by the verify password change otp for few minutes. You can use that token to update the password

**URL**
```
    http://localhost:3000/api/auth/forgot/update
```

**Request**
```javascript
    const url = "http://localhost:3000/api/auth/forgot/update";
    const body = {
        "userId":"649d548bfd6267de1a90796e",
        "password":"example"
    }
    const options = {
        method:"POST",
        credentials:"include",
        body:JSON.stringify(body);
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```

**Response**
```json
{
    "success":true,
    message:"Password updated successfully"
}
```
> Now the updated password can be used to login the user.

<br>
<br>
<br>

## Expense Tracker
<br>
<br>

### `POST` To post a expense of a user

**Description**
The only endpoint to post expense of a user. All the fields are optional, If the record already exists for that day, It updates the record. If the date is empty the current date is taken as default.

**URL**
```
    http://localhost:3000/api/expense/
```

**Request**
```javascript
    const url = "http://localhost:3000/api/expense";
    const body = {
        date? = Date.now(),
        income? = 123123.00,
        shoppingExpense? = 123,
        payments? = 123,
        foodExpense? = 123,
        others? = 123,
    }
    
    const options = {
        method:"POST",
        credentials:"include",
        body:JSON.stringify(body);
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```

**Response**
```json
{
  "success": true,
  "userId": "6488809ebbeaba9e7c7c1a58",
  "expense": {
    "_id": "648f3d62499f56f5dbb37006",
    "userId": "6488809ebbeaba9e7c7c1a58",
    "__v": 0,
    "createdAt": "2023-06-18T17:22:41.573Z",
    "date": "2023-06-19T14:43:43.468Z",
    "foodExpense": 0,
    "income": 0,
    "others": 6000,
    "payments": 0,
    "shoppingExpense": 0,
    "updatedAt": "2023-06-29T11:17:18.482Z"
  }
}
```


### `GET` To Get the expense of a user.

**URL**
```
    http://localhost:3000/api/expense
```

**Request**
```javascript
    const url = "http://localhost:3000/api/expense" // to get date till date
    // const url = "http://localhost:3000/api/expense?startDate=2023-06-20T13:31:50.940Z&endDate=2023-06-29T13:31:50.940Z" //  to get data between startDate and endDate
    // const url = "http://localhost:3000/api/expense?startDate=2023-06-20T13:31:50.940Z" // to get date from startDate
    // const url = "http://localhost:3000/api/expense?endDate=2023-06-29T13:31:50.940Z" // to get date til endDate
    const options = {
        method:"GET",
        credentials:"include",
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```

**Response**
```json
{
  "success": true,
  "userId": "6488809ebbeaba9e7c7c1a58",
  "expense": [
    {
      "_id": "6490720624d4e9ee00a8e4a9",
      "userId": "6488809ebbeaba9e7c7c1a58",
      "__v": 0,
      "createdAt": "2023-06-19T15:19:33.403Z",
      "date": "2023-06-17T18:30:00.000Z",
      "foodExpense": 0,
      "income": 0,
      "others": 6000,
      "payments": 0,
      "shoppingExpense": 0,
      "updatedAt": "2023-06-19T15:19:33.403Z"
    }]
}
```


### `GET` to get today's expense of a user
**URL**
```
    http://localhost:3000/api/expense/day
```

**Request**
```javascript
    const url = "http://localhost:3000/api/expense/day"
    const options = {
        method:"GET",
        credentials:"include"
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```

**Response**
```json
{
  "success": true,
  "userId": "6488809ebbeaba9e7c7c1a58",
  "expense": null
}
```



### `GET` to get current week expense of a user

**URL**
```
    http://localhost:3000/api/expense/week
```
**Request**
```javascript
    const url = "http://localhost:3000/api/expense/week"
    const options = {
        method:"GET",
        credentials:"include"
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```

**Response**
```json
{
  "success": true,
  "userId": "6488809ebbeaba9e7c7c1a58",
  "expense": []
}
```


### `GET` to get current month expense of a user

**URL**
```
    http://localhost:3000/api/expense/month
```
**Request**
```javascript
    const url = "http://localhost:3000/api/expense/month"
    const options = {
        method:"GET",
        credentials:"include"
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```

**Response**
```json
{
  "success": true,
  "userId": "6488809ebbeaba9e7c7c1a58",
  "expense": [
    {
      "_id": "648f3d62499f56f5dbb37006",
      "userId": "6488809ebbeaba9e7c7c1a58",
      "__v": 0,
      "createdAt": "2023-06-18T17:22:41.573Z",
      "date": "2023-06-19T14:43:43.468Z",
      "foodExpense": 0,
      "income": 0,
      "others": 6000,
      "payments": 0,
      "shoppingExpense": 0,
      "updatedAt": "2023-06-29T11:17:18.482Z"
    },]
}
```

### `GET` to get current year expense of a user

**URL**
```
    http://localhost:3000/api/expense/year
```
**Request**
```javascript
    const url = "http://localhost:3000/api/expense/year"
    const options = {
        method:"GET",
        credentials:"include"
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```

**Response**
```json
{
  "success": true,
  "userId": "6488809ebbeaba9e7c7c1a58",
  "expense": [
    {
      "_id": "648f3d62499f56f5dbb37006",
      "userId": "6488809ebbeaba9e7c7c1a58",
      "__v": 0,
      "createdAt": "2023-06-18T17:22:41.573Z",
      "date": "2023-06-19T14:43:43.468Z",
      "foodExpense": 0,
      "income": 0,
      "others": 6000,
      "payments": 0,
      "shoppingExpense": 0,
      "updatedAt": "2023-06-29T11:17:18.482Z"
    },]
}
```

### `GET` to get total expense of a user

**URL**
```
    http://localhost:3000/api/expense/total
```
**Request**
```javascript
    const url = "http://localhost:3000/api/expense/total" // To get data of total expense and income of a user from the time of registration.
    // const url = "http://localhost:3000/api/expense/total?startDate=2023-06-20T13:31:50.940Z&endDate=2023-06-29T13:31:50.940Z" // to get data of total expense and income of a user between two dates.
    // const url = "http://localhost:3000/api/expense/total?startDate=2023-06-20T13:31:50.940Z" // to get data of total expense and income of a user from the start date.
    // const url = "http://localhost:3000/api/expense/total?endDate=2023-06-29T13:31:50.940Z" // to get data of total expense and income of a user till the end date.
    const options = {
        method:"GET",
        credentials:"include"
    }
    fetch(url,options).then(res=>res.json).then(data=>console.log(data))
```

**Response**
```json
{
  "success": true,
  "userId": "6488809ebbeaba9e7c7c1a58",
  "expense": [
    {
      "_id": null,
      "income": 0,
      "shoppingExpense": 0,
      "payments": 0,
      "foodExpense": 0,
      "others": 12000,
      "totalExpense": 12000
    }
  ]
}
```


### `GET` to get total expense of a user yearly i.e every month data of that year

**URL**
```
    http://localhost:3000/api/expense/yearly
```

**Request**
```javascript
    const url = "http://localhost:3000/api/expense/yearly" // to get current yearly total expense
    // const url =  "http://localhost:3000/api/expense/yearly?year=2020" // to get yearly total expense of that particular
    const options = {
        method:"GET",
        credentials:"include"
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```

**Response**
```json
{
  "success": true,
  "userId": "6488809ebbeaba9e7c7c1a58",
  "expenses": [
    {
      "expense": []
    },
    {
      "expense": []
    },
    {
      "expense": []
    },
    {
      "expense": []
    },
    {
      "expense": []
    },
    {
      "expense": [
        {
          "_id": null,
          "income": 0,
          "shoppingExpense": 0,
          "payments": 0,
          "foodExpense": 0,
          "others": 12000,
          "totalExpense": 12000
        }
      ]
    },
    {
      "expense": []
    },
    {
      "expense": []
    },
    {
      "expense": []
    },
    {
      "expense": []
    },
    {
      "expense": []
    },
    {
      "expense": []
    }
  ]
}
```

### `GET` to get total expense of a user monthly i.e every data data.

**URL**
```
    http://localhost:3000/api/expense/monthly
```

**Request**
```javascript
    const url = "http://localhost:3000/api/monthly" // to get data of  current month & year's monthly total expense of a user 
    // const url = "http://localhost:3000/api/monthly?year=2020&month=6" // to get data of given year and month's monthly total expense of a user.
    const options = {
        method:"GET",
        credentials:"include"
    }
    fetch(url,options).then(res=>res.json()).then(data=>console.log(data))
```

**Response**
```json
{
  "success": true,
  "userId": "6488809ebbeaba9e7c7c1a58",
  "expenses": [
    {
      "01-06-2023": []
    },
    {
      "02-06-2023": []
    },
    {
      "03-06-2023": []
    },
    {
      "04-06-2023": []
    },
    {
      "05-06-2023": []
    },
    {
      "06-06-2023": []
    },
    {
      "07-06-2023": []
    },
    {
      "08-06-2023": []
    },
    {
      "09-06-2023": []
    },
    {
      "10-06-2023": []
    },
    {
      "11-06-2023": []
    },
    {
      "12-06-2023": []
    },
    {
      "13-06-2023": []
    },
    {
      "14-06-2023": []
    },
    {
      "15-06-2023": []
    },
    {
      "16-06-2023": []
    },
    {
      "17-06-2023": []
    },
    {
      "18-06-2023": [
        {
          "_id": null,
          "income": 0,
          "shoppingExpense": 0,
          "payments": 0,
          "foodExpense": 0,
          "others": 6000,
          "totalExpense": 6000
        }
      ]
    },
    {
      "19-06-2023": [
        {
          "_id": null,
          "income": 0,
          "shoppingExpense": 0,
          "payments": 0,
          "foodExpense": 0,
          "others": 6000,
          "totalExpense": 6000
        }
      ]
    },
    {
      "20-06-2023": []
    },
    {
      "21-06-2023": []
    },
    {
      "22-06-2023": []
    },
    {
      "23-06-2023": []
    },
    {
      "24-06-2023": []
    },
    {
      "25-06-2023": []
    },
    {
      "26-06-2023": []
    },
    {
      "27-06-2023": []
    },
    {
      "28-06-2023": []
    },
    {
      "29-06-2023": []
    },
    {
      "30-06-2023": []
    }
  ]
}
```