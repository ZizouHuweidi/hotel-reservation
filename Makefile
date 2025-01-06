# Variables
DOCKER_COMPOSE=docker-compose
FRONTEND_DIR=frontend
BACKEND_DIR=backend

# Targets
.PHONY: help up build down clean logs frontend backend db migrate seed test

help: ## Show help for all commands
	@echo "Usage:"
	@echo "  make <command>"
	@echo ""
	@echo "Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

up: ## Build and start the project using Docker Compose
	$(DOCKER_COMPOSE) up --build -d

down: ## Stop and remove all running containers
	$(DOCKER_COMPOSE) down

build: ## Build the project without starting the services
	$(DOCKER_COMPOSE) build

clean: ## Stop, remove containers, and clean volumes
	$(DOCKER_COMPOSE) down -v --remove-orphans

logs: ## Tail logs for all services
	$(DOCKER_COMPOSE) logs -f

frontend: ## Run frontend commands in the container
	cd $(FRONTEND_DIR) && npm run start

frontend-docker: ## Run frontend commands in the container
	docker exec -it hotel_frontend sh

# backend:
# 	npx ts-node backend/src/index.ts

backend:
	cd backend && nodemon src/index.ts

backend-docker: ## Run backend commands in the container
	docker exec -it hotel_backend sh

db: ## Access the PostgreSQL database container
	docker exec -it postgres_db psql -U admin -d hotel_reservation

migrate: ## Run database migrations
	docker exec -it hotel_backend npx knex migrate:latest --knexfile src/knexfile.js

seed: ## Seed the database with sample data
	docker exec -it hotel_backend npx knex seed:run --knexfile src/knexfile.js

test: ## Run tests for backend
	docker exec -it hotel_backend npm test
