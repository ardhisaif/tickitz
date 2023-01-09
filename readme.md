# Project Exercise Backend
### Tech Stack
- **Expressjs** => framework nodejs for build backend apps
- **Postgresql** => database relation
- **Bcrypt** => for hashing password
- **Nodemon** => to restart otomatically when there update save
- **Dotenv** => to loads environment variables from .env files
- **Jsonwebtoken** => token to send data to verify authentication user
- **Multer** => middleware for handling multipart/form-data, which is primarily used for uploading files

1. clone repository

```
git clone https://github.com/ardhisaif/tugas-fazztrack.git
```

2. install dependencies
```
npm install
```

3. run the app
```
npm start
```

## Folder Structure
    .
    ├── node_modulse            # Containt installation data
    ├── public                  # Save file data like jpg, png, pdf
    ├── src                     # Source files 
    │   ├── controller          # Bussiness logic to manipulate data and give response
    │   ├── database            # Connect DB, and save sql migrate
    │   ├── helpers             # To help developer with built-in method like response
    │   ├── middleware          
    │   ├── models              # To run sql syntax to database and give response
    │   └── routers             
    ├── .env                    
    ├── .eslintrc               
    ├── package-lock.json
    ├── package.json
    └── server.js               # Main file to running app

---


---

# Otentikasi dan Otorisasi
biasanya menggunakan middleware atau method yang menjembatani akses ke API selanjutnya

## Authentication

    Adalah proses register dan login untuk mendapatkan akses ke situs web,

    Salah satu caranya adalah dengan menggunakan jsonwebtoken untuk mendapatkan token yang menyimpan data user
---
    Ketika login mencocokkan email dan password,
    Untuk mencocokkan password yang sudah di hash bisa menggunakan bcrypt.compareSync()

## Authorization

    Authentication ditambah mennetukan apakah user memiliki role,

    Dan dengan role tersebut user bisa memiliki akses sesuai role tersebut
---
    Ditambahkan middleware isAdmin atau isUser untuk validasi role, dan ketika sukses bisa melanjutkan prosessnya

# JWT(jsonwebtoken)

    Data user yang berhasil login akan digabung dengan jwt key yang akan menjadi token,
    Token tersebut akan disimpan ke locale storage atau cookies browser
    Bisa juga disebut kunci untuk mengakses halaman yang harus login

```
npm install jsonwebtoken
```

# Multer

    Untuk upload file dari request body dengan format form data
```
npm install multer
```

# Changelog

## .env / Environments
### Description :
    to save credentials in environment variable and **don`t push in github**

## 1. Search Movie 
### Description : 
    Using query params to input search name 

**GET:** `{{url}}/movie/search?name=S`
```json
{
    "status": 200,
    "description": "OK",
    "result": [
        {
            "movie_id": 3,
            "name": "Spongebob",
            "directed_by": "Stephen Hillenburg",
            "casts": "patrick",
            "genres": "comedy, education",
            "release_date": null,
            "duration": null,
            "synopsis": "spongebob memasak krabby patty",
            "image": "tes.jpg",
            "created_at": "2022-12-24T22:24:41.844Z",
            "updated_at": null
        },
        {
            "movie_id": 6,
            "name": "Superman",
            "directed_by": "anton",
            "casts": "superman",
            "genres": "education",
            "release_date": null,
            "duration": null,
            "synopsis": "superman mati",
            "image": "superman.jpg",
            "created_at": "2022-12-26T22:12:45.932Z",
            "updated_at": "2022-12-26T22:14:16.402Z"
        }
    ]
}
```

## 2. Sort Movie By Name/ By ID
### Description : 
- using query params to input data allow null
- filter to choose which column to input default `name`
- pagination using page and limit => page default 1, limit default 3

**GET** `{{url}}/movie?filter=name&limit=4&page=1`
```json
{
    "status": 200,
    "description": "OK",
    "result": [
        {
            "movie_id": 18,
            "name": "test",
            "directed_by": "",
            "casts": "burung merah",
            "genres": "Action, magic",
            "release_date": null,
            "duration": null,
            "synopsis": "angrybirds menang",
            "image": "angrybirds.jpg",
            "created_at": "2022-12-27T11:05:26.415Z",
            "updated_at": null
        },
        {
            "movie_id": 17,
            "name": "test",
            "directed_by": "",
            "casts": "burung merah",
            "genres": "Action, magic",
            "release_date": null,
            "duration": null,
            "synopsis": "angrybirds menang",
            "image": "angrybirds.jpg",
            "created_at": "2022-12-27T11:04:56.461Z",
            "updated_at": null
        },
        {
            "movie_id": 16,
            "name": "Miss Farkku-Suomi",
            "directed_by": "Colet",
            "casts": "Cleve",
            "genres": "Drama|Romance",
            "release_date": "2022-10-26T01:14:53.000Z",
            "duration": "13:15:00",
            "synopsis": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.",
            "image": "http://dummyimage.com/244x100.png/5fa2dd/ffffff",
            "created_at": "2022-12-27T08:14:49.596Z",
            "updated_at": null
        },
        {
            "movie_id": 15,
            "name": "Man Who Left His Will on Film, The (Tôkyô sensô sengo hiwa)",
            "directed_by": "Earlie",
            "casts": "Hillyer",
            "genres": "Drama",
            "release_date": "2022-12-26T11:15:28.000Z",
            "duration": "09:27:00",
            "synopsis": "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
            "image": "http://dummyimage.com/181x100.png/cc0000/ffffff",
            "created_at": "2022-12-27T08:14:25.284Z",
            "updated_at": null
        }
    ],
    "meta": {
        "page": "1"
    }
}
```

## 3. Model SQL
### Description :
    Syntax query to manipulate data table, column, value in database

### GET All Movies
* `SELECT * FROM movies` // get all data from table movies 
* `ORDER BY name` // sort by column name 
* `LIMIT 3 OFFSET 0` // page 1

### GET By Name Movies
* `SELECT * FROM movies WHERE name LIKE '%Mi%'` // Get all data from table movie if column name include `Mi`
* `LIMIT 3 OFFSET 0` // page 1

### GET All Booking
* `SELECT * FROM bookings b` // get all data from table booking alias `b`
* `inner join schedules s` // using inner join with table schedule
* `on b.schedule_id = s.schedule_id` // join if schedule id in table movies have same value with table schedule id in table schedule
* `where user_id =3` // only if where user_id =3

## 4. Error Handling
### Auth Register :
```js
register: async(req, res) => {
    try {
        const {email, password, role, first_name, last_name, phone_number} = req.body // Input data email, password, role
        const saltRounds = 10 // The cost of processing data
        const salt = bcrypt.genSaltSync(saltRounds) // Random values, always different even if have same password ; $2b$04$fWAnVTR.nTIhaXIIekbM6.
        const hash = bcrypt.hashSync(password, salt) // Hash password with salt or number saltrounds
        const tokenEmail = crypto.randomBytes(10).toString("hex")
        const picture = req.file.filename
        const imageURL = `http://localhost:8000/public/${picture}`
        const link = `http://localhost:8000/auth/verify/${tokenEmail}`
        const checkEmail = await models.checkEmail(email) // Check if email already Exist
        if (checkEmail[0]) {
            throw response(res, 400, {msg: "email already exist"}) // Throw response in catch block
        }
        const result = await models.register(email, hash, imageURL, role, first_name, last_name, phone_number, tokenEmail)
        sendMail(email, "email verification", link)
        return response(res, 200, result)
    } catch (error) {
        console.log(error);
        const picture = req.file.filename // get picture name
        fs.unlinkSync(`public/${picture}`) // delete file if any errors
        return response(res, 500, error)
    }
}    
```

## 5. User Activation Via Email

### Auth Register :
**POST:**`{{url}}/auth/register`
```json
{
    "status": 200,
    "description": "OK",
    "result": [
        {
            "email": "ardhi354gresik@gmail.com",
            "role": 0,
            "picture": "http://localhost:8000/public/default.png"
        }
    ]
}
```
After success register user get message email verify link

image.png

**POST:**`{{url}}/auth/verify/be24cf2af35399e5f7fb`
```json
{
    "status":200,
    "description":"OK",
    "result":[
        {
            "email_verify":true
        }
    ]
}
```
column email_verify in table user transformed into true

**if email_verify already true**
```json
{
    "status":401,
    "description":"Unauthorized",
    "result":[
        {"msg":"email has been verified"}
    ]
}
```

after user activation via email user can login


**POST:**`{{url}}/auth/login`
```json
{
    "status": 200,
    "description": "OK",
    "result": [
        {
            "user": {
                "user_id": "21",
                "first_name": "ini",
                "last_name": "user",
                "phone_number": "08123456789",
                "email": "ardhi354gresik@gmail.com",
                "picture": "http://localhost:8000/public/default.png",
                "role": 0,
                "created_at": "2023-01-09T03:58:36.455Z",
                "updated_at": null,
                "email_verify": true,
                "token_verify": "cdbe698867f09e6f8156"
            },
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjEiLCJmaXJzdF9uYW1lIjoiaW5pIiwibGFzdF9uYW1lIjoidXNlciIsInBob25lX251bWJlciI6IjA4MTIzNDU2Nzg5IiwiZW1haWwiOiJhcmRoaTM1NGdyZXNpa0BnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3B1YmxpYy9kZWZhdWx0LnBuZyIsInJvbGUiOjAsImNyZWF0ZWRfYXQiOiIyMDIzLTAxLTA5VDAzOjU4OjM2LjQ1NVoiLCJ1cGRhdGVkX2F0IjpudWxsLCJlbWFpbF92ZXJpZnkiOnRydWUsInRva2VuX3ZlcmlmeSI6ImNkYmU2OTg4NjdmMDllNmY4MTU2IiwiaWF0IjoxNjczMjM3ODI2LCJleHAiOjE2NzMyNDE0MjZ9.NVj8UX-7p_KGpdUzn6L7bQI7LbmnK6k-kuSw075Ss5I"
        }
    ]
}
```

if user has not activated email
```json
{
    "status": 401,
    "description": "Unauthorized",
    "result": [
        {
            "msg": "Email must be verified"
        }
    ]
}
```

after login, bearer token can be used