# REST API description

Markdown file

Resource - todolist

## GET /api/todolist/
Gets all todo items in json format

### 200 OK

Returns:

    [
        {
            "_id": "abcd",
            "_state": 0,
            "_text": "Todo item text"
        },
        ...
    ]

## GET /api/todoilst/{TODO_ID}

Get todo item data by ID from database.
For example, request ``GET /api/todoilst/1`` should return something as follows:

### 200 OK

    {
        "_id": 1,
        "_state": 0,
        "_text": "Todo item text"
    }

### 404 Not found

Returns empty response body

## POST /api/todolist/

Creates new todo item and returns it back to the client.
POST request body should contain new todo item data without id:

    {
        "_state": 0,
        "_text": "New todo item text"
    }

### 200 OK

Backend will return newly created item with ID:

    {
        "_id": 2,
        "_state": 0,
        "_text": "New todo item text"
    }

## DELETE /api/todolist/{TODO_ID}

Deletes todo item by ID from database

### 200 OK

Empty response

### 404 Not found

Empty response

## PUT /api/todolist/{TODO_ID}

Overwrites todo item data with received one inside the PUT request body, for 
example:

    {
        "_state": 1,
        "_text": "Modified text"
    }

### 200 OK

Returns modified todo item:

    {
        "_id": 1,
        "_state": 1,
        "_text": "Modified text"
    }

### 404 Not found

Empty response