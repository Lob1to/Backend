
# Anchetas App Backend

## DEV

1. Clone the repository.
2. Copy the `.env.template` file and rename it to `.env`.
3. Fill in the environment variables in the `.env` file.
4. Install project dependencies with the command `npm i`.
5. Start the server with `npm run dev`.

### Dev Notes

- Do not use the `seed` command found in the package.json in production. This is a destructive command and will delete everything in the database.

## Overview

This document provides detailed information about the modules of our E-commerce API. 

# Authentication Module

## Endpoints

### 1. Register User
- **Endpoint**: POST /auth/register
- **Description**: Registers a new user
- **Request Body**: RegisterUserDto
  - name: string
  - email: string
  - password: string
- **Response**: UserEntity and JWT token
- **Use Case**: RegisterUser
- **Validation**:
  - Name is required
  - Email must be valid and unique
  - Password must meet complexity requirements

### 2. Login User
- **Endpoint**: POST /auth/login
- **Description**: Authenticates a user
- **Request Body**: LoginUserDto
  - email: string
  - password: string
- **Response**: UserEntity and JWT token
- **Use Case**: LoginUser
- **Validation**:
  - Email must be valid
  - Password must be correct

### 3. Validate Email
- **Endpoint**: GET /auth/validate-email/:token
- **Description**: Validates user's email address
- **Params**: token (string)
- **Response**: Success message
- **Use Case**: ValidateToken

### 4. Send Validation Email
- **Endpoint**: POST /auth/send-validation
- **Description**: Sends a validation email to the user
- **Request Body**:
  - email: string
- **Response**: Success message
- **Use Case**: SendEmailValidationLink

### 5. Update User
- **Endpoint**: PUT /auth/update-user
- **Description**: Updates authenticated user's information
- **Request Body**: UpdateUserDto (partial UserEntity)
- **Response**: Updated UserEntity
- **Use Case**: UpdateUser
- **Middleware**: AuthMiddleware.validateJWT

### 6. Admin Update User
- **Endpoint**: PUT /auth/admin/update-user/:id
- **Description**: Admin route to update any user's information
- **Params**: id (string)
- **Request Body**: UpdateUserDto (partial UserEntity)
- **Response**: Updated UserEntity
- **Use Case**: UpdateUser
- **Middleware**: AuthMiddleware.validateAdminRoleWithToken

### 7. Admin Delete User
- **Endpoint**: DELETE /auth/admin/delete-user/:id
- **Description**: Admin route to delete a user
- **Params**: id (string)
- **Response**: Deleted UserEntity
- **Use Case**: DeleteUser
- **Middleware**: AuthMiddleware.validateAdminRoleWithToken

## Data Sources and Repositories

### AuthDatasource
- Interface defining data access methods
- Implemented by AuthDatasourceImpl

### AuthRepository
- Interface defining business logic methods
- Implemented by AuthRepositoryImpl

## Use Cases

1. RegisterUser
2. LoginUser
3. ValidateToken
4. SendEmailValidationLink
5. UpdateUser
6. DeleteUser

## Middleware

### AuthMiddleware
- validateJWT: Ensures the request has a valid JWT token
- validateAdminRoleWithToken: Ensures the request has a valid JWT token and the user has an admin role

## Sample Responses

### Successful Registration
```json
{
  "success": true,
  "message": "Se ha creado la cuenta correctamente.",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": ["USER_ROLE"]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

```

### Successful Login

```json
{
  "success": true,
  "message": "Se ha ingresado a la cuenta correctamente.",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": ["USER_ROLE"]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Successful Email Validation

```json
{
  "success": true,
  "message": "Se ha validado el correo correctamente.",
  "data": null
}
```

### Successful Send Validation Email

```json
{
  "success": true,
  "message": "Se ha enviado el correo de validación correctamente",
  "data": null
}
```

### Successful Update User

```json
{
  "success": true,
  "message": "El usuario John Doe ha sido actualizado",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": ["USER_ROLE"]
  }
}
```

### Successful Delete User

```json
{
  "success": true,
  "message": "El usuario John Doe ha sido eliminado",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": ["USER_ROLE"]
  }
}
```

## Error Handling

### All endpoints use custom error handling:

- **400 Bad Request:** For invalid input or parameters
- **401 Unauthorized:** For authentication failures
- **403 Forbidden:** For insufficient permissions
- **404 Not Found:** When requested resource doesn't exist
- **500 Internal Server Error:** For unexpected server errors

### Responses include:

- **success:** boolean
- **message:** string
- **error:** object (optional, includes error code and details)


# Categories Module

## Overview
The Categories module manages the creation, retrieval, updating, and deletion of product categories in the e-commerce system.

## Endpoints

### 1. Create Category
- **Endpoint**: POST /admin/create
- **Description**: Creates a new category
- **Auth**: Requires admin role
- **Request Body**: CreateCategoryDto
  - name: string (required)
  - description: string (optional)
- **Response**: CategoryEntity
- **Use Case**: CreateCategory

### 2. Get All Categories
- **Endpoint**: GET /
- **Description**: Retrieves all categories with pagination
- **Auth**: Requires JWT
- **Query Parameters**:
  - page: number (default: 1)
  - limit: number (default: 10)
- **Response**: Paginated list of CategoryEntity
- **Use Case**: GetCategories

### 3. Update Category
- **Endpoint**: PUT /admin/update/:id
- **Description**: Updates an existing category
- **Auth**: Requires admin role
- **Params**: id (string)
- **Request Body**: UpdateCategoryDto
  - name: string (optional)
  - description: string (optional)
- **Response**: Updated CategoryEntity
- **Use Case**: UpdateCategory

### 4. Delete Category
- **Endpoint**: DELETE /admin/delete/:id
- **Description**: Deletes a category
- **Auth**: Requires admin role
- **Params**: id (string)
- **Response**: Deleted CategoryEntity
- **Use Case**: DeleteCategory

## Data Transfer Objects (DTOs)

### CreateCategoryDto
- name: string (required)
- description: string (optional)

### UpdateCategoryDto
- id: string (required)
- name: string (optional)
- description: string (optional)

## Use Cases

### CreateCategory
Creates a new category in the system.

### GetCategories
Retrieves a paginated list of categories.

### UpdateCategory
Updates an existing category's information.

### DeleteCategory
Removes a category from the system.

## Data Sources and Repositories

### CategoriesDatasource
Interface defining data access methods for categories.

### CategoriesRepository
Interface defining business logic methods for categories.

### CategoriesDatasourceImpl
Implementation of CategoriesDatasource interface.

### CategoriesRepositoryImpl
Implementation of CategoriesRepository interface.

## Middleware

- AuthMiddleware.validateJWT: Ensures the request has a valid JWT token
- AuthMiddleware.validateAdminRoleWithToken: Ensures the request has a valid JWT token and the user has an admin role

## Sample Responses

### Successful Category Creation
```json
{
  "success": true,
  "message": "La categoria Electrónicos ha sido creada",
  "data": {
    "id": "category_id",
    "name": "Electrónicos",
    "description": "Productos electrónicos y gadgets"
  }
}
```

### Successful Categories Retrieval
```json
{
  "success": true,
  "message": "Se obtuvieron las categorias",
  "data": {
    "next": "/api/categories/?page=2&limit=10",
    "prev": null,
    "page": 1,
    "limit": 10,
    "totalPages": 3,
    "totalItems": 25,
    "items": [
      {
        "id": "category_id_1",
        "name": "Electrónicos",
        "description": "Productos electrónicos y gadgets"
      },
      // ... more categories
    ]
  }
}
```

### Successful Category Update
```json
{
  "success": true,
  "message": "La categoria Electrónicos ha sido actualizada",
  "data": {
    "id": "category_id",
    "name": "Electrónicos y Computación",
    "description": "Productos electrónicos, gadgets y equipos de cómputo"
  }
}
```

### Successful Category Deletion
```json
{
  "success": true,
  "message": "La categoria Electrónicos ha sido eliminada",
  "data": {
    "id": "category_id",
    "name": "Electrónicos",
    "description": "Productos electrónicos y gadgets"
  }
}
```

## Error Handling

### All endpoints use custom error handling:

- **400 Bad Request:** For invalid input or parameters
- **401 Unauthorized:** For authentication failures
- **403 Forbidden:** For insufficient permissions
- **404 Not Found:** When requested resource doesn't exist
- **500 Internal Server Error:** For unexpected server errors

### Responses include:

- **success:** boolean
- **message:** string
- **error:** object (optional, includes error code and details)

