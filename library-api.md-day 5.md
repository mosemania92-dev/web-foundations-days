# Library API Design

A REST API for a library's `books` resource. The URL names the resource (a noun) and the HTTP method says the action.

## Endpoints

### 1. List books
- **Method:** `GET`
- **Path:** `/books`
- **Description:** Returns all books in the library.
- **Request body:** none
- **Success status:** `200 OK`

### 2. Get one book
- **Method:** `GET`
- **Path:** `/books/{id}`
- **Description:** Returns the book with the given id.
- **Request body:** none
- **Success status:** `200 OK`

### 3. Create a book
- **Method:** `POST`
- **Path:** `/books`
- **Description:** Adds a new book to the library.
- **Example request body:**
  ```json
  {
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "year": 1958,
    "isbn": "9780385474542"
  }
  ```
- **Success status:** `201 Created`

### 4. Replace a book
- **Method:** `PUT`
- **Path:** `/books/{id}`
- **Description:** Replaces the whole book record with the data sent.
- **Example request body:**
  ```json
  {
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "year": 1958,
    "isbn": "9780385474542"
  }
  ```
- **Success status:** `200 OK`

### 5. Update part of a book
- **Method:** `PATCH`
- **Path:** `/books/{id}`
- **Description:** Updates only the fields sent, leaving the rest unchanged.
- **Example request body:**
  ```json
  {
    "year": 1959
  }
  ```
- **Success status:** `200 OK`

### 6. Delete a book
- **Method:** `DELETE`
- **Path:** `/books/{id}`
- **Description:** Removes the book with the given id.
- **Request body:** none
- **Success status:** `204 No Content`

### 7. List books by an author
- **Method:** `GET`
- **Path:** `/books?author=Chinua%20Achebe`
- **Description:** Returns only the books written by the given author, using the `author` query parameter.
- **Request body:** none
- **Success status:** `200 OK`

## Error codes

### 400 Bad Request
- The client sent data the server cannot accept.
- **Example:** `POST /books` with a body that is missing the required `title` field, or with `"year": "abc"` instead of a number.

### 404 Not Found
- The requested resource does not exist.
- **Example:** `GET /books/9999` when no book has id 9999, or `DELETE /books/9999` for a book that was already deleted.
