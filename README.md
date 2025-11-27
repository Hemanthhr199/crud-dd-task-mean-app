CRUD MEAN Application
Dockerized Deployment + GitHub Actions CI/CD + Nginx Reverse Proxy

This repository contains a fully containerized CRUD MEAN (MongoDB + Express + Angular + Node.js) application deployed using:

Docker & Docker Compose

Docker Hub image registry

GitHub Actions CI/CD Pipeline

Ubuntu Virtual Machine (AWS EC2)

Nginx Reverse Proxy (Port 80)

This README includes complete setup, deployment guide, CI/CD explanation, and required screenshots.

Project Structure
crud-dd-task-mean-app/
│
├── backend/               # Node.js + Express API
│   ├── Dockerfile
│   └── app/config/db.config.js
│
├── frontend/              # Angular UI
│   ├── Dockerfile
│   └── src/app/services/
│
├── docker-compose.yml     # Orchestration of Mongo, Backend, Frontend
│
├── .github/workflows/     # CI/CD Pipeline
│   └── deploy.yml
│
├── screenshots/           # CI/CD, Docker, Nginx, UI screenshots
│
└── README.md

🚀 1. Local Development Setup (Optional)
Backend (Express API)
cd backend
npm install
npm start

Frontend (Angular)
cd frontend
npm install
npm start

🐳 2. Docker Setup
Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]

Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "8081"]

📤 3. Build & Push Docker Images to Docker Hub
Login to Docker Hub
docker login

Backend
docker build -t <dockerhub-username>/dd-backend:latest backend/
docker push <dockerhub-username>/dd-backend:latest

Frontend
docker build -t <dockerhub-username>/dd-frontend:latest frontend/
docker push <dockerhub-username>/dd-frontend:latest

⚙️ 4. Docker Compose Deployment (Local or VM)

The docker-compose.yml runs:

Mongo database

Backend API

Angular Frontend

Start all services:
docker-compose pull
docker-compose up -d
docker-compose ps

Access:

Frontend → http://<server-ip>:8081

Backend → http://<server-ip>:8080/api/tutorials

🖥️ 5. Deploy on Ubuntu VM (AWS EC2)
Install Docker & Compose
sudo apt update
sudo apt install -y docker.io docker-compose git
sudo systemctl enable docker
sudo systemctl start docker

Clone Project
git clone https://github.com/<your-github-username>/crud-dd-task-mean-app.git
cd crud-dd-task-mean-app
docker-compose pull
docker-compose up -d

🌐 6. Nginx Reverse Proxy (Port 80)
Install Nginx
sudo apt install -y nginx

Create Reverse Proxy Config
sudo nano /etc/nginx/sites-available/mean-app


Paste:

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

Enable config
sudo ln -s /etc/nginx/sites-available/mean-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

Access application:
http://<your-vm-public-ip>/

🔁 7. CI/CD Pipeline — GitHub Actions Automatic Deployment

This project includes a complete CI/CD pipeline at:

.github/workflows/deploy.yml

Pipeline Steps:

Checkout repository

Login to Docker Hub

Build backend & frontend Docker images

Push images to Docker Hub

SSH into VM

Pull latest code and images

Restart Docker Compose services

Required Secrets (GitHub → Settings → Secrets → Actions)
Secret Name	Description
DOCKERHUB_USERNAME	Docker Hub username
DOCKERHUB_TOKEN	Docker Hub access token
VM_HOST	EC2 Public IP
VM_USER	ubuntu
VM_SSH_KEY	Private SSH key used for EC2 login
