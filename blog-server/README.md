**🦊BLOG with Express and TDD**
----
  
## List of API Routers
Route | HTTP | Description
----- | ---- | -----------
/register | POST | Register a user
/login | POST | User to login
/articles | GET | Show all Article
/articles/detail/:ArticleId | GET | Get Article Detail
**👉 Register**
----
  Add user to the database and returns json response.
* **URL**       

        /register
* **Method:**
  
  `POST`
* **URL Params**
  Not required
* **Data Params**
  fist_name<br />
  last_name<br />
  Email<br />
  Password<br />
* **Success Response:**
  * **Code:** 201 ✔️<br />
    **Content:** `{ message: 'user has successfully created!' }`
* **Error Response:**
  * **Code:** 400 BAD REQUEST ERROR 💢<br />
    **Content:** `{ err : error object }`

**👉 Login**
----
  Check user's authentication and returns token if data is valid.
* **URL**

        /login
* **Method:**

  `POST`
* **URL Params**
  Not required
* **Data Params**

  email<br />
  password<br />
* **Success Response:**
  * **Code:** 200 ✔️<br />
    **Content:** `{ token: jsonwebtoken }`
* **Error Response:**
  * **Code:** 400 BAD REQUEST ERROR 💢<br />
    **Content:** `{ message: 'email / password is wrong!' }`

    OR
  * **Code:** 500 INTERNAL SERVER ERROR 💢<br />
    **Content:** `{ err : error object }`
   
**📰 Show Article**
----
  Show All Article.
* **URL**

        /articles
* **Method:**
  
  `GET`
* **URL Params**
  None required
* **Data Params**
  None required
* **Success Response:**
  * **Code:** 200 ✔️<br />
    **Content:** `{ data: data }`
* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR 💢<br />
    **Content:** `{ err : error object }`

**Get Article Detail**
----
  Get detail Article.
* **URL**

        /articles/detail/:ArticleId
* **Method:**
  
  `GET`
* **URL Params**

  articleId
* **Data Params**
   none required
* **Success Response:**
  * **Code:** 200 ✔️<br />
    **Content:** `{ data:data }`
* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR 💢<br />
    **Content:** `{ err : error object }`  