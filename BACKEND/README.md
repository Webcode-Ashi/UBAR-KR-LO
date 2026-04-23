# UBAR Backend API Documentation

## Overview
This is the backend API for the UBAR application built with Node.js and Express. It provides endpoints for user authentication and management.

---

## User Registration Endpoint

### Endpoint Details
- **Route**: `/user/register`
- **Method**: `POST`
- **Description**: Registers a new user with email and password. The endpoint validates the input data, hashes the password using bcrypt, creates a new user record in the database, and returns an authentication token.

---

## Request Format

### URL
```
POST http://localhost:<PORT>/user/register
```

### Content-Type
```
application/json
```

### Request Body
```json
{
  "fullname": {
    "firstname": "string (required, min 3 characters)",
    "lastname": "string (optional, min 3 characters if provided)"
  },
  "email": "string (required, must be valid email)",
  "password": "string (required, min 6 characters)"
}
```

### Field Validation Rules
| Field | Type | Requirements | Example |
|-------|------|--------------|---------|
| `fullname.firstname` | String | Required, minimum 3 characters | "John" |
| `fullname.lastname` | String | Optional, minimum 3 characters if provided | "Doe" |
| `email` | String | Required, must be a valid email format | "john@example.com" |
| `password` | String | Required, minimum 6 characters | "password123" |

---

## Request Example

```bash
curl -X POST http://localhost:5000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

---

## Response Format

### Success Response (201 Created)

**Status Code**: `201`

```json
{
  "user": {
    "_id": "mongo_user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password_string",
    "socketId": null,
    "__v": 0
  },
  "token": "jwt_auth_token"
}
```

### Error Response - Validation Failed (400 Bad Request)

**Status Code**: `400`

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `201` | Created | User successfully registered. Response includes user object and authentication token. |
| `400` | Bad Request | Validation failed. Missing or invalid fields in the request body. Check the errors array for details. |
| `500` | Internal Server Error | Server error occurred while processing the registration. |

---

## Error Scenarios

### Missing Required Fields
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### Invalid Email Format
```json
{
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Password Too Short
```json
{
  "errors": [
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## User Login Endpoint

### Endpoint Details
- **Route**: `/user/login`
- **Method**: `POST`
- **Description**: Authenticates a user with email and password. The endpoint validates the input data, verifies the password against the stored hash, and returns an authentication token upon successful login.

---

## Request Format

### URL
```
POST http://localhost:<PORT>/user/login
```

### Content-Type
```
application/json
```

### Request Body
```json
{
  "email": "string (required, must be valid email)",
  "password": "string (required, min 6 characters)"
}
```

### Field Validation Rules
| Field | Type | Requirements | Example |
|-------|------|--------------|---------|
| `email` | String | Required, must be a valid email format | "john@example.com" |
| `password` | String | Required, minimum 6 characters | "password123" |

---

## Request Example

```bash
curl -X POST http://localhost:5000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

---

## Response Format

### Success Response (200 OK)

**Status Code**: `200`

```json
{
  "user": {
    "_id": "mongo_user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  },
  "token": "jwt_auth_token"
}
```

### Error Response - Validation Failed (400 Bad Request)

**Status Code**: `400`

```json
{
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Error Response - Invalid Credentials (401 Unauthorized)

**Status Code**: `401`

```json
{
  "error": "Invalid email or password"
}
```

---

## Login Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | User successfully authenticated. Response includes user object and authentication token. |
| `400` | Bad Request | Validation failed. Missing or invalid fields in the request body. Check the errors array for details. |
| `401` | Unauthorized | Invalid email or password. User not found or password does not match. |
| `500` | Internal Server Error | Server error occurred while processing the login. |

---

## Login Error Scenarios

### Missing Required Fields
```json
{
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Invalid Email Format
```json
{
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### User Not Found or Invalid Password
```json
{
  "error": "Invalid email or password"
}
```

---

## Authentication Token

Upon successful registration, a JWT (JSON Web Token) is generated and returned. This token should be used for authenticated requests.

**Token Details:**
- Contains the user's MongoDB `_id`
- Signed with `JWT_SECRET` from environment variables
- Used for future API requests in the `Authorization` header

**Usage:**
```bash
Authorization: Bearer <jwt_auth_token>
```

---

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with 10 salt rounds
2. **Email Validation**: Email format is validated using express-validator
3. **JWT Authentication**: Secure token generation for authenticated sessions
4. **Input Validation**: All fields are validated before processing

---

## Database Schema

User data is stored in MongoDB with the following schema:

```javascript
{
  fullname: {
    firstname: String (required, min 3 chars),
    lastname: String (optional, min 3 chars)
  },
  email: String (required, unique),
  password: String (required, hashed),
  socketId: String (optional, for real-time features)
}
```

---

## Environment Variables

Make sure the following environment variable is set:

```
JWT_SECRET=your_secret_key_here
MONGODB_URI=your_mongodb_connection_string
```

---

## Notes

- Emails must be unique in the system
- Passwords are hashed and never stored in plain text
- The returned token should be stored by the client for future authenticated requests
- First name and last name are required to be at least 3 characters if provided
