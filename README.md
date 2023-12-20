# Mentorin BackEnd 
> API KHUSUS UNTUK MENTORIN 

# ENDPOINT
> https://mentorin.et.r.appspot.com/mentorin/

# Register
- URL
    - /users/register
- Method
    - POST
- Request Body
    - name as string
    - email as string, harus unique
    - password as string, harus 8 karakter, berisi 1 uppercase, lowercase, angka dan simbol
- Response
    ```
    {
    "errors": null,
    "message": "User created",
    "data": {
        "userId": "9171aad7-1966-4019-8cad-9687b626258e",
        "name": "Anjki",
        "email": "y321@gmail.com",
        "study": "Teknik Informatika",
        "role": "Mentor",
        "expireTime": "Wed Dec 20 2023 15:14:17 GMT+0000"
    }
  }
    ```

  # Login
- URL
    - /users/login
- Method
    - POST
- Request Body
    - email as string, harus unique
    - password as string, harus 8 karakter, berisi 1 uppercase, lowercase, angka dan simbol
- Response
    ```
    {
    "errors": [],
    "message": "Login successfully",
    "data": {
        "userId": "124a0155-cc30-45a4-945a-76b381c08bbe",
        "name": "Moh. Yusuf",
        "email": "y123@gmail.com"
    },
    "acessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjRhMDE1NS1jYzMwLTQ1YTQtOTQ1YS03NmIzODFjMDhiYmUiLCJuYW1lIjoiTW9oLiBZdXN1ZiIsImVtYWlsIjoieTEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MDMwOTgyNzgsImV4cCI6MTcwMzE4NDY3OH0.pf3KXwLWjgbqzLOmyE27ETwLJYIdLuc4ddHtutdB8gQ",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjRhMDE1NS1jYzMwLTQ1YTQtOTQ1YS03NmIzODFjMDhiYmUiLCJuYW1lIjoiTW9oLiBZdXN1ZiIsImVtYWlsIjoieTEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MDMwOTgyNzgsImV4cCI6MTcwMzE4NDY3OH0.pqsXhyF3-1VwqXXTs7YmFaoO1lsoNRigkC8yPN7V2SA"
}
    ```
