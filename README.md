## Authentication in a Microservice Architecture

Hello there, I recently got into the realm of microservices and made a boilerplate template for authentication service using NodeJS in a microservice architecture using the following technologies,

- NodeJS (Run time env)
- ExpressJS (Server-side framework)
- Typescript (Primary language)
- MongoDB / Mongoose (NoSQL Database)
- Jest (Library for testing)
- Docker & Kubernetes (Containers)
- Ingress (Load balancer)

Microservices is an architectural style of building applications that has a collection of services that are independent to each other, loosely coupled, highly maintainable & testable, and can be deployed independently into its own container and this is where Docker comes into play, Docker is a tool that makes it easy to create, run and deploy an application using containers.

Before we get into knowing what these containers are we should know about docker-image a docker-image is a template that contains a set of instructions on how a container should look like, so once a docker-image is created of your application you can run containers based on that image, basically, images can exist without containers, whereas a container needs to run an image to exist.

So now what is a container, well a container is a running instance of a docker-image, a container is a process, or a set of processes that has a group of resources specifically assigned to it like a kernel, system tools, system libraries, etc. An Ingress controller acts as a load balancer here to distribute the incoming traffic evenly running containers.

In an MS architecture, Kubernetes helps us to manage all independent services efficiently, in other words, we can cluster together groups of hosts running containers, and Kubernetes helps us manage those clusters in an easy and efficient way. So therefore I've managed to make an authentication service that could be used as a boilerplate template for any microservices application that you're making using NodeJS and as always PR's and issues are always welcomed.
