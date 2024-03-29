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
      "place_name": "place_name",
      "city": "city",
      "price": "price",
      "placeId": "0001",
      "description": "description",
      "category": "category",
      "userId": "6kUyqqwlXRSj6ei8OE3L",
      "lat": "lat",
      "long": "long"
    },
    {
      "place_name": "place_name",
      "city": "city",
      "price": "price",
      "placeId": "0002",
      "description": "description",
      "category": "category",
      "userId": "6kUyqqwlXRSj6ei8OE3L",
      "lat": "lat",
      "long": "long"
    }
  ]
}
```

## Delete Bookmark By PlaceId

- **URL:** `http://34.139.96.186:8080/bookmark`
- **Method:** DELETE

Using authorization header : bearer token

### Example Request

```json
{
  "placeId": "00001"
}
```

### Example Response

```json
{
  "msg": "Bookmark Berhasil dihapus"
}
```

## Add Bookmark By PlaceId

- **URL:** `http://34.139.96.186:8080/bookmark`
- **Method:** POST

Using authorization header : bearer token

### Example Request

```json
{
  "placeId": "00001",
  "category": "category",
  "city": "city",
  "description": "description",
  "lat": "lat",
  "long": "long",
  "place_name": "place_name",
  "price": "price"
}
```

### Example Response

```json
{
  "msg": "Berhasil menambahkan bookmark",
  "data": {
    "placeId": "00001",
    "category": "category",
    "city": "city",
    "description": "description",
    "lat": "lat",
    "long": "long",
    "place_name": "place_name",
    "price": "price"
  }
}
```

### Error

```json
{
  "msg": "Bookmark sudah ada dilist"
}
```
