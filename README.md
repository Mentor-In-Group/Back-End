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
