# Next.js Kubernetes Deployment

I built a sample next.js application as simple visitor entry and exit trackin system. Here react is also used for component-based UI development and Tailwind CSS for styling. This application is a single-page application that allows users to track visitor entry and exit times. 


## Project Structure

```
.
├── .github/workflows    
├── k8s/                
│   ├── deployment.yaml  
│   └── service.yaml     
├── Dockerfile           
├── next.config.js       
└── ...                  
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/get-started)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [GitHub Account](https://github.com/sudarshanJ18)

## Local Development

### Running the Next.js Application Locally
Install dependencies and run the development server
```bash
npm install

npm run dev
```

The application will be available at http://localhost:3000.


## Docker Setup
Implemented Docker using a multi-stage build approach for enhanced optimization and efficiency. The Dockerfile is structured into three distinct stages: 
    -the dependencies stage, which installs all required npm packages; 
    -the build stage, which compiles the Next.js application; and 
    -the production stage, which creates a minimal runtime image for deployment. 
Used Node.js 20 Alpine as the base image to reduce image size, implementing a non-root user for improved security, enabling dependency caching to accelerate build times, and configuring the Next.js standalone output mode for optimized Docker images.
### Building the Docker Image Locally

```bash

docker build -t <dockerhub-username>/nextjs-k8s-app:latest .

docker run -p 3000:3000 <dockerhub-username>/nextjs-k8s-app
```

The containerized application will be available at http://localhost:3000.

## GitHub Actions Setup

CI/CD pipeline is designed to automate the entire build and deployment process efficiently. It begins by checking out the repository code, ensuring the latest version is available for the workflow. Next, Docker Buildx is configured to enable multi-platform image builds, enhancing compatibility across different environments. The pipeline then securely logs in to the GitHub Container Registry (GHCR) to allow seamless image storage and distribution. After that, it extracts Docker metadata to automatically generate versioned and descriptive tags for the image. Finally, the system builds and pushes the Docker image to the registry using caching mechanisms that significantly reduce build time and resource consumption.

### Setting up GitHub Repository

1. Create a new repository on GitHub
2. Push your code to the repository
3. Ensure the repository has the necessary permissions for GitHub Actions to push to GHCR:
   - Go to Settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"

## Kubernetes Deployment with Minikube
The application is fully configured for Kubernetes deployment, ensuring scalability, reliability, and efficient resource utilization. All Kubernetes manifests are organized within the k8s/ directory, including deployment.yaml, which defines how the application is deployed, and service.yaml, which exposes the application to external users. 

### Starting Minikube

```bash

minikube start

```

### Deploying to Minikube

Before deploying, update the image name in `k8s/deployment.yaml` to match your GitHub username:

```yaml
image: ghcr.io/sudarshanJ18/nextjs-k8s-app:v1
```

Then deploy the application:
--Apply all manifest files and configure Ingress services for external access if needed.
```bash

kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```
Verify the deployments and pods are running correctly or not.
```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

### Accessing the Deployed Application

```bash

minikube service nextjs-app-service --url
```

This will provide a URL that you can use to access the application.

Alternatively, you can access the application through the NodePort (30080):

```bash

minikube ip
```

Then access the application at `http://<minikube-ip>:30080`.
