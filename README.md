# itelect2-project
My IT Elective 2 backend web development project.


## API Testing

![GET Request](images/get.png)
![POST Request](images/post.png)
![PUT Request](images/put.png)
![DELETE Request](images/delete.png)

## Module4_Session8 Screenshots

![GET TASKS](images/Session8_GET_TASKS.png)
![GET TASKS/1](images/Session8_GET_TASKS1.png)
![GET TASKS/999](images/Session8_GET_TASKS999.png)
![GET USERS](images/Session8_GET_API_USERS.png)
![POST TASKS](images/Session8_POST_TASKS.png)
![DELETE TASKS ID](images/Session8_DELETE_TASKS_ID.png)

## Module4_Session9 Screenshots

![SUCCESSFUL_REGISTRATION](images/Successful%20Registration%20(POST%20apiauthregister).png)
![SUCCESSFUL_LOGIN](images/Successful%20Login%20(POST%20apiauthlogin).png)
![AUTHORIZED_ACCESS](images/Authorized%20Access%20(GET%20apitasks%20With%20Token).png)

## Module5_Session10: Role-Based Authorization

### Implemented Functionality
- Extended registration logic (`POST /api/auth/register`) to accept a `role` field (`member` or `admin`).
- Updated `User` model (`models/user.cjs`) to support the `role` attribute with default value `'member'`.
- Applied authorization middleware to protect the `DELETE /api/tasks/:id` endpoint so that only users with `role: "admin"` can perform deletions.

### Test Verification Results

| Test Case | Method & Endpoint | Auth Header / Role | Expected Status | Result |
| :--- | :--- | :--- | :--- | :--- |
| **Test Case 1** | `DELETE /api/tasks/:id` | No Token | `401 Unauthorized` | PASSED |

![Test Case 1](images/image6.png)

| **Test Case 2** | `DELETE /api/tasks/:id` | Bearer Token (`member`) | `403 Forbidden` | PASSED |

![Test Case 2](images/image7.png)

| **Test Case 3** | `DELETE /api/tasks/:id` | Bearer Token (`admin`) | `200 OK` / `204 No Content` | PASSED |

![Test Case 3](images/image8.png)