# API For Front-End

## Sign Up

- **URL:** `http://34.139.96.186:8080/auth/signUp`
- **Method:** POST

### Example Request

```json
{
  "name": "John Doe",
  "username": "example_username",
  "password": "example_password",
  "email": "example_email"
}
```

### Example Response

```json
{
  "user": {
    "name": "John Doe",
    "username": "example_username",
    "password": "example_password",
    "email": "example_email"
  },
  "token": "example_token"
}
```

### Errror

```json
{
  "msg": "Username telah digunakan!"
}
```

## Sign In

- **URL:** `http://34.139.96.186:8080/auth/signIn`
- **Method:** POST

### Example Request

```json
{
  "username": "example_username",
  "password": "example_password"
}
```

### Example Response

```json
{
  "user": {
    "name": "John Doe",
    "email": "example_email",
    "username": "example_username"
  },
  "token": "example_token"
}
```

### Errror

```json
{
  "msg": "Kredensial Invalid"
}
```

## Get Bookmark By UserId

- **URL:** `http://34.139.96.186:8080/bookmark`
- **Method:** GET

Using authorization header : bearer token

### Example Response

```json
{
  "bookmarks": [
    {
      "wisataId": "00001",
      "userId": "6kUyqqwlXRSj6ei8OE3L"
    },
    {
      "wisataId": "00002",
      "userId": "6kUyqqwlXRSj6ei8OE3L"
    }
  ]
}
```

## Add Bookmark By WisataId

- **URL:** `http://34.139.96.186:8080/bookmark`
- **Method:** POST

Using authorization header : bearer token

### Example Request

```json
{
  "wisataId": "00001"
}
```

### Example Response

```json
{
  "msg": "Berhasil menambahkan bookmark"
}
```

## Delete Bookmark By WisataId

- **URL:** `http://34.139.96.186:8080/bookmark`
- **Method:** DELETE

Using authorization header : bearer token

### Example Request

```json
{
  "wisataId": "00001"
}
```

### Example Response

```json
{
  "bookmarks": [
    {
      "wisataId": "00001",
      "userId": "6kUyqqwlXRSj6ei8OE3L"
    },
    {
      "wisataId": "00002",
      "userId": "6kUyqqwlXRSj6ei8OE3L"
    }
  ]
}
```
