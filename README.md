# Next.js Kubernetes Deployment

This repository contains a Next.js application containerized with Docker and deployed to Kubernetes using GitHub Actions.

## Project Structure

```
.
├── .github/workflows    # GitHub Actions workflow files
├── k8s/                 # Kubernetes manifests
│   ├── deployment.yaml  # Deployment configuration
│   └── service.yaml     # Service configuration
├── Dockerfile           # Docker configuration
├── next.config.js       # Next.js configuration
└── ...                  # Next.js application files
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/get-started)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [GitHub Account](https://github.com/)

## Local Development

### Running the Next.js Application Locally

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at http://localhost:3000.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Docker Setup

### Building the Docker Image Locally

```bash
# Build the Docker image
docker build -t nextjs-k8s-app .

# Run the Docker container
docker run -p 3000:3000 nextjs-k8s-app
```

The containerized application will be available at http://localhost:3000.

## GitHub Actions Setup

This repository uses GitHub Actions to automatically build and push the Docker image to GitHub Container Registry (GHCR) when changes are pushed to the main branch.

### Setting up GitHub Repository

1. Create a new repository on GitHub
2. Push your code to the repository
3. Ensure the repository has the necessary permissions for GitHub Actions to push to GHCR:
   - Go to Settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"

## Kubernetes Deployment with Minikube

### Starting Minikube

```bash
# Start Minikube
minikube start

# Enable the ingress addon (optional)
minikube addons enable ingress
```

### Deploying to Minikube

Before deploying, update the image name in `k8s/deployment.yaml` to match your GitHub username:

```yaml
image: ghcr.io/YOUR_GITHUB_USERNAME/nextjs-k8s-app:latest
```

Then deploy the application:

```bash
# Apply the Kubernetes manifests
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Check the deployment status
kubectl get deployments
kubectl get pods
kubectl get services
```

### Accessing the Deployed Application

```bash
# Get the URL to access the service
minikube service nextjs-app-service --url
```

This will provide a URL that you can use to access the application.

Alternatively, you can access the application through the NodePort (30080):

```bash
# Get the Minikube IP
minikube ip
```

Then access the application at `http://<minikube-ip>:30080`.

## Troubleshooting

### Checking Logs

```bash
# Get pod names
kubectl get pods

# Check logs for a specific pod
kubectl logs <pod-name>
```

### Debugging Pods

```bash
# Describe a pod to get detailed information
kubectl describe pod <pod-name>

# Execute a command in a running pod
kubectl exec -it <pod-name> -- /bin/sh
```

## License

This project is licensed under the MIT License.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
