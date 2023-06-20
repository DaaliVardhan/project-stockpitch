# Stock Pitch


## Authentication Endpoints
<br>
<br>

| HTTP Methods | Endpoints | Request Body | Request Cookies | Response Body | Response Cookie |Description | 
| --- | --- | --- | --- | --- | --- | --- |
| POST | `/api/auth/register` | `{email,password,phone}` | NA | `{userId}` | `otpToken` |Endpoint to create New user and OTP will be sent to email and cookie will be sent to client |
| POST |`/api/auth/verifyEmailOTP` | `{userId,otp}` | `otpToken` required | `{userId}` | NA | Endpoint to verify Email and to successfully create a user | 
| POST | `/api/auth/login` | `{email,password}` | NA | `{email,name,accessToken}` | `accessToken, refreshToken` | Endpoint to login an existing user |
| POST | `/api/auth/refresh` | NA | `refreshToken` required | `{accessToken}` | `accessToken,refreshToken` | Endpoint to refresh the accessToken using refreshToken |
| POST | `/api/auth/resendOTP` | `{email,password}` | NA | `{userId}` | `otpToken` | Endpoint to resent otp to verify email, Same `verifyEmailOTP` endpoint can be used to verify otp |
| POST | `/api/auth/logout` | NA | NA | NA | NA | Endpoint to logout user |
| POST | `/api/auth/forgot` | `{email}` | NA | `{userId}` | `otpToken` | Endpoint to send request for forgot password |
| POST | `/api/auth/forgot/verify` | `{userId,otp}` | `otpToken` | `{userId}` |`updateToken` | Endpoint to verify Otp for forgot password request |
| POST | `/api/auth/forgot/update` | `{userId,password}` | `updateToken` | NA | Endpoint to update forgot password request |
| GET | `/auth/google/` | NA | NA | NA | NA | Opens the Google consent window |
| GET | `/auth/google/success` | NA | NA | `{profile}` | NA | If the User successfully logins this route contain the user data |
| GET | `/auth/google/failed` | NA | NA | `{error}` | NA | if the user failed to login this route contain the data of failure |
| GET | `/auth/facebook/` | NA | NA | NA | NA | Opens the facebook consent window `but it is not working ` |
| GET | `/auth/facebook/success` | NA | NA | NA | NA | NA `not  working` |
| GET | `/auth/facebook/failed` | NA | NA | NA | NA | NA `not working` |



<br>
<br>

## Expense Management Endpoints
<br>
<br>


| HTTP Methods | Endpoints | Query Params |  Request Body | Request Cookies | Response Body | Description | 
| --- | --- | --- | --- | --- | --- | --- | 
| POST | `/api/expense` | NA | `{date?,income?,shoppingExpense?,payments?,foodExpense?,others?}` | `refreshToken,accessToken` | `expenses` | It will post the data into databases , if date not provided it posts the data on today's date |
| GET | `/api/expense/` | `startDate=''&endDate=''` | NA | `refreshToken,accessToken` | `expenses` | If not query provided then it lists all the available expenses, If both provided then it lists all the available expenses between two dates `(ISO date format)` | 
| GET | `/api/expense/day` | NA | NA |`refreshToken,accessToken` | `expenses` | It provides today's expenses |
| GET | `/api/expense/week` | NA | NA | `refreshToken,accessToken` | `expenses` | It provides this week's expenses |
| GET | `/api/expense/month` | NA | NA | `refreshToken,accessToken` | `expenses` | It provides this month's expenses |
| GET | `/api/expense/year` | NA | NA | `refreshToken,accessToken` | `expenses` | It provides this year's expenses | 
| GET | `/api/expense/total` | `startDate=''&endDate=''` | NA | `refreshToken,accessToken` | `expenses` | It provides the total income and expenses between the dates, if not provided It provides the total income and expenses till the date |
| GET | `/api/expense/yearly` | `year` | NA | `refreshToken,accessToken` | Every month `expenses`| It provides total income and expenses month wise |
| GET | `/api/expense/monthly` | `{year,month}` | NA | `refreshToken,accessToken` | Every day `expenses` | It provides total income and expenses day wise |