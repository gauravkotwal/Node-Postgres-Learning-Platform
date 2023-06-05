## Node-Postgres-Learning-Platform

Welcome to the Node-Postgres-Learning-Platform repository! This project is a learning platform built with Node.js and PostgreSQL.

## Getting Started

To get started with the project, you need to fork the repository to your GitHub account. After forking, you can clone the forked repo to your local machine using the following command:
```console
git clone https://github.com/YourUsername/Node-Postgres-Learning-Platform.git` 
```

Once you have cloned the repository, navigate to the root folder and follow the steps below :

1.  Install Dependencies
```console
  * Run the following command to install all the project dependencies:
    
    # npm install 
```
    
2.  Download and Install pgAdmin
```console
  * Download and install pgAdmin, a PostgreSQL administration and management tool, from the official website : 
    # [pgadmin.org](https://www.pgadmin.org/download/pgadmin-4-windows/)
```  
3.  Configure pgAdmin
```console
  * After installing pgAdmin, update the following details in the `.env` file located in your cloned project:
    
    #   `USERNAME`: Set your PostgreSQL username.
    #   `PASSWORD`: Set your PostgreSQL password.
    #   `PORT`: Set the port number on which your PostgreSQL database is running.
    #   `DATABASE`: Set the name of the database you want to use for the project.
```
5.  Database Setup
```console    
  * Once you have configured pgAdmin, run the following command to create the necessary tables in your database:
    
    # npm run setup 
    
    Note: If the tables are not created successfully, make sure to check the database connection configuration in `app\db\dev\dbConnection.js`.
```    
6.  Starting the Application
```console    
  * After installing the required packages and completing the setup, you can start using the application with the following command:
    
    # npm start 
```
    
7.  Postman Collection
```console    
  * We have provided a Postman collection with predefined API requests. You can find the collection file attached to this repository.
```   
8.  Swagger
```console     
  * The Swagger documentation for the API is still in progress and will be available soon.
```       

That's it! You have now set up the "Node-Postgres-Learning-Platform" project and can start using it. If you have any questions or run into any issues, please refer to the project documentation or reach out to the project contributors for assistance.

Enjoy coding 🙏🙏