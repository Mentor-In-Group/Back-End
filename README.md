# Mentorin BackEnd 
> API KHUSUS UNTUK MENTORIN 

# ENDPOINT
> https://mentorin.et.r.appspot.com/mentorin

# Register
- URL
    - /users/register
- Method
    - POST
- Request Body
    - name as string
    - email as string, harus unique
    - password as string, harus 8 karakter, berisi 1 uppercase, lowercase, angka dan simbol
    - study as string
    - role as string
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
    - email as string harus unique
    - password as string harus 8 karakter, berisi 1 uppercase, lowercase, angka dan simbol
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

# Daftar Schedule
- URL
    - /schedules/scheduling
- Method
    - POST
- Request Body
   - nameMentor as string
   - codeClass as string
   - start_at as string
   - end_at as string
   - date as string
  
- Response
    ```
    {
        "errors": null,
        "message": "Schedule Created",
        "data": {
            "nameMentor": "Anji",
            "codeClass": "USA-01",
            "start_at": "18.00",
            "end_at": "19.30",
            "date": "21-12-2023"
        }
    }   
    ```


# List Schedule
- URL
    - /schedules
- Method
    - GET
- Request Body
    - email as string, harus unique
    - password as string, harus 8 karakter, berisi 1 uppercase, lowercase, angka dan simbol
- Response
    ```
{
    "errors": [],
    "message": "Schedule retrieved successfully",
    "data": [
    
        {
            "scheduleId": "8add91ab-a2fe-4afc-83f6-8db8dae2a359",
            "codeClass": "AS-01",
            "nameMentor": "Dicky",
            "start_at": "18.00",
            "end_at": "19.30",
            "date": "21-12-2023",
            "createdAt": "2023-12-20T18:11:16.000Z",
            "updatedAt": "2023-12-20T18:11:16.000Z"
        },
        {
            "scheduleId": "e31f41ac-577e-4d90-8fed-c6b393c5b3f4",
            "codeClass": "USA-01",
            "nameMentor": "Anji",
            "start_at": "18.00",
            "end_at": "19.30",
            "date": "21-12-2023",
            "createdAt": "2023-12-20T19:01:43.000Z",
            "updatedAt": "2023-12-20T19:01:43.000Z"
        }
    ]
}
    ```

    

