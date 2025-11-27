Dear Reviewer,

Thank you for reviewing my assignment.
I would like to share a few important details regarding the deployment environment and how you can run the application anytime using Docker.

🧪 Temporary Lab Environment Disclaimer

This project was deployed in a temporary lab/learning environment (AWS EC2 free-tier).

⚠️ Important:
To avoid unnecessary cost, the server will be automatically stopped after 3 hours.
So the live application might not be reachable after the environment is auto-shutdown.

Example:

http://<public-ip>/


If the VM is offline, you can still test everything using Docker, because all Docker images are public and fully available on Docker Hub.

🐳 Public Docker Images

Both frontend and backend images are publicly available:

Backend:
docker pull hemanthkumarhr3101/dd-backend:latest

Frontend:
docker pull hemanthkumarhr3101/dd-frontend:latest


You can run the application anytime using:

docker-compose pull
docker-compose up -d


The docker-compose.yml file included in the repository automatically sets up:

MongoDB

Backend API

Angular Frontend

⚙️ How to Run the Application (Locally or on Any VM)

Install Docker & Docker Compose:

sudo apt update
sudo apt install -y docker.io docker-compose


Clone repository:

git clone https://github.com/Hemanthhr199/crud-dd-task-mean-app.git
cd crud-dd-task-mean-app


Pull public images from Docker Hub:

docker-compose pull


Start all services:

docker-compose up -d
docker-compose ps


Access the app:

Frontend:

http://<IP>:8081/


Backend:

http://<IP>:8080/api/tutorials

Nginx Reverse Proxy Configuration (Used in My Deployment)

In my cloud deployment, the application is available through Nginx on port 80.

Below is the exact Nginx config I used:

/etc/nginx/sites-available/mean-app

server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8081/;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8080/api/;
    }
}

Install & Enable Nginx:
sudo apt install -y nginx
sudo ln -s /etc/nginx/sites-available/mean-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx


Now the app works at:

http://<server-ip>/

Final Notes

All Docker images are public and verified.

The application can be run on any machine using Docker Compose.

CI/CD, Docker, MongoDB, and Nginx configurations are fully included in the repository.

Thank you for your understanding.
Please feel free to review the code and run the application at your convenience.
