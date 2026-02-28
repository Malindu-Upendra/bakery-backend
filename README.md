# Bakery Backend

REST API for the Madushan Bakery management system. Built with Node.js, Express, Sequelize ORM, and MySQL.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| ORM | Sequelize v6 |
| Database | MySQL (mysql2) |
| Authentication | JWT (access token + refresh token) |
| Password hashing | bcrypt |
| Rate limiting | express-rate-limit |
| Email | Nodemailer (Gmail) |

---

## Getting Started

### Prerequisites

- Node.js v16+
- MySQL running locally

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3500

# Database
DB_HOST=localhost
DB_NAME=bakery
DB_USER=root
DB_PASS=your_password

# JWT secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Email (Nodemailer / Gmail)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### Run

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server starts on `http://localhost:3500`.

---

## Project Structure

```
bakery-backend/
├── config/
│   ├── allowedOrigins.js   # CORS whitelist
│   ├── corsOptions.js      # CORS config with credentials support
│   └── dbConn.js           # Sequelize MySQL connection
├── controllers/
│   ├── authController.js   # Login, refresh, logout
│   └── usersController.js  # User CRUD and management
├── middleware/
│   ├── logger.js           # Request logger
│   ├── errorHandler.js     # Global error handler
│   ├── loginLimiter.js     # Rate limiter for login endpoint
│   └── verifyJWT.js        # JWT authentication middleware
├── models/
│   ├── User.js             # User model
│   └── UserRoles.js        # UserRoles model
├── routes/
│   ├── root.js
│   ├── authRoutes.js
│   └── userRoutes.js
├── views/
│   └── 404.html
├── server.js
└── .env
```

---

## API Reference

### Authentication — `/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth` | None | Login — returns access token |
| GET | `/auth/refresh` | Cookie | Refresh access token using httpOnly cookie |
| POST | `/auth/logout` | Cookie | Logout and clear refresh token cookie |

#### POST `/auth` — Login

**Rate limited:** 5 requests per minute per IP.

Request:
```json
{
  "username": "john",
  "password": "secret"
}
```

Response `200`:
```json
{
  "accessToken": "<jwt>",
  "result": true
}
```

Response `401/403` (invalid credentials / unauthorised account):
```json
{
  "result": false,
  "message": "Unauthorized"
}
```

The refresh token is set as an **httpOnly cookie** (`jwt`) that expires in 7 days.

---

#### GET `/auth/refresh` — Refresh Token

Reads the `jwt` httpOnly cookie and returns a new access token (expires in 15 min).

Response `200`:
```json
{ "accessToken": "<new_jwt>" }
```

---

#### POST `/auth/logout` — Logout

Clears the `jwt` httpOnly cookie.

Response `200`:
```json
{ "message": "Cookie cleared" }
```

---

### Users — `/users`

All endpoints require `Authorization: Bearer <accessToken>` unless noted.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/get-all-users` | Get paginated users with search & filter |
| GET | `/users/logged-in-user` | Get the currently authenticated user |
| POST | `/users` | Create a new user |
| PATCH | `/users` | Update user details |
| DELETE | `/users/:userid` | Soft-delete a user |
| PATCH | `/users/updateMember/:id` | Approve a pending user (sends email with credentials) |

---

#### POST `/users/get-all-users`

Request:
```json
{
  "currentPage": 1,
  "searchText": "",
  "status": ""
}
```

- `status`: `""` = all, `4` = enabled, `-4` = disabled
- Searches across: `userName`, `firstName`, `lastName`, `city`, `email`, `phone`
- Returns 10 records per page

Response `200`:
```json
{
  "totalRecords": 42,
  "totalPages": 5,
  "users": [ ...User ]
}
```

---

#### GET `/users/logged-in-user`

Returns the user whose ID is embedded in the access token.

Response `200`:
```json
{
  "result": true,
  "user": { ...User }
}
```

---

#### POST `/users` — Create User

Request:
```json
{
  "username": "john",
  "firstName": "John",
  "lastName": "Doe",
  "city": "Colombo",
  "birthdate": "1995-06-15",
  "phone": "0771234567",
  "email": "john@example.com",
  "password": "secret123",
  "userType": "Admin"
}
```

Response `201`:
```json
{ "result": true, "message": "User john created successfully." }
```

---

#### PATCH `/users` — Update User

Request:
```json
{
  "_id": 5,
  "firstName": "John",
  "lastName": "Doe",
  "city": "Kandy",
  "birthDate": "1995-06-15",
  "email": "john@example.com",
  "phone": "0771234567",
  "roles": "Admin"
}
```

---

#### DELETE `/users/:userid` — Soft Delete

Sets `deleted = true` and `active = false`. The record is retained in the database.

Response `200`:
```json
{ "result": true, "reply": "User deleted." }
```

---

#### PATCH `/users/updateMember/:id` — Approve Member

Activates a pending user, generates a random password, and emails login credentials to the user.

Response `200`:
```json
{ "result": true, "message": "Member approved." }
```

---

## Data Models

### User

| Field | Type | Notes |
|---|---|---|
| id | INTEGER | PK, auto-increment |
| userName | STRING | Required, unique |
| firstName | STRING | Required |
| lastName | STRING | Required |
| city | STRING | |
| birthdate | DATEONLY | Required |
| email | STRING | |
| phone | STRING | Required |
| password | STRING | bcrypt hashed, never returned in responses |
| status | INTEGER | `4` = enabled, `-4` = disabled, `0` = pending |
| roleId | INTEGER | FK → UserRoles |

### UserRoles

| Field | Type | Notes |
|---|---|---|
| id | INTEGER | PK, auto-increment |
| role | STRING | e.g. `admin`, `user` |

---

## Security

- **Access token** expires in 300 minutes. Sent in the `Authorization: Bearer` header.
- **Refresh token** expires in 7 days. Stored in an httpOnly, secure, sameSite=None cookie.
- Passwords are hashed with **bcrypt** (10 salt rounds) and never returned in any response.
- Login endpoint is **rate limited** to 5 attempts per minute per IP.
- CORS is restricted to whitelisted origins (see `config/allowedOrigins.js`).
