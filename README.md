# Project Setup Instructions

## Getting Started

### 1. Clone the Project
After cloning this project, follow the steps below to set it up.

### 2. Create a `.env` File
Add a `.env` file in the root directory with the following content:

```bash
PORT_NUM=3000
ME_CONFIG_MONGODB_URL="mongodb://root:pass@mongodb:27017"
ME_CONFIG_MONGODB_ADMINUSERNAME="root"
ME_CONFIG_MONGODB_ADMINPASSWORD="pass"
MONGO_INITDB_ROOT_USERNAME="root"
MONGO_INITDB_ROOT_PASSWORD="pass"
```

### 3. Run the Project with Docker
To start the project using Docker, use the following command:
```bash
docker-compose up --build
```
### 5. Stopping the Application
To stop the running Docker containers, press CTRL + C in the terminal where the containers are running. To remove stopped containers and networks, you can run:
```bash
docker-compose down
```
