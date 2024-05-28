
---
# Computer Chat API

The Computer Chat API is a RESTful web service designed to perform CRUD operations on posts, manage comments, and handle user authentication.

## Posts

### Create Post

- **Endpoint:** `POST /post/create`
- **Description:** Creates a new post with the specified title and content.
- **Request Headers:** `Authorisation: <JWT Token>`
- **Request Body:** `{ "username": "testuser", "post": "a second random post of joy" }`

### Get Post

- **Endpoint:** `GET /post/get/:postId`
- **Description:** Retrieves a post by its ID.
- **Request Headers:** `authorise: <JWT Token>`

### Delete Post

- **Endpoint:** `DELETE /post/delete/:postId`
- **Description:** Deletes a post by its ID.
- **Request Headers:** `authorise: <JWT Token>`

### Update Post

- **Endpoint:** `PATCH /post/update/:postId`
- **Description:** Updates a post by its ID with new content.
- **Request Headers:** `authorise: <JWT Token>`
- **Request Body:** `{ "username": "testuser", "post": "a second random post of joy in my soul" }`

## Comments

### Create Comment

- **Endpoint:** `POST /comment/create`
- **Description:** Creates a new comment on a post.
- **Request Headers:** `authorise: <JWT Token>`
- **Request Body:** `{ "username": "testuser", "comment": "a comment on the last post", "postid": "66561a1c60e6d2754faf4437" }`

### Get Comment

- **Endpoint:** `GET /comment/get/:commentId`
- **Description:** Retrieves a comment by its ID.
- **Request Headers:** `authorise: <JWT Token>`

### Delete Comment

- **Endpoint:** `DELETE /comment/delete/:commentId`
- **Description:** Deletes a comment by its ID.
- **Request Headers:** `authorise: <JWT Token>`

## User

### Signup User

- **Endpoint:** `POST /signup`
- **Description:** Creates a new user account.
- **Request Body:** `{ "firstname": "ade", "lastname": "bucky", "email": "olaniyanp11@gmail.com", "username": "testuser", "password": "test" }`

### Login

- **Endpoint:** `POST /login`
- **Description:** Logs in an existing user.
- **Request Body:** `{ "email": "olaniyanp11@gmail.com", "password": "test" }`

### Get User

- **Endpoint:** `GET /user/:userId`
- **Description:** Retrieves user information by ID.
- **Request Headers:** `authorise: <JWT Token>`
