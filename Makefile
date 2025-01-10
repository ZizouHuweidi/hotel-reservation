# Variables
DOCKER_COMPOSE=docker-compose

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

dev:
	nodemon src/index.ts

backend: ## Run backend commands in the container
	docker exec -it hotel_backend sh

db: ## Access the PostgreSQL database container
	docker exec -it postgres_db psql -U admin -d hotel_reservation

migrate-dev: ## Run database migrations
	knex migrate:latest --knexfile knexfile.js

migrate: ## Run database migrations
	docker exec -it hotel_backend npx knex migrate:latest --knexfile knexfile.js

seed: ## Seed the database with sample data
	docker exec -it hotel_backend npx knex seed:run --knexfile knexfile.js

test: ## Run tests for backend
	docker exec -it hotel_backend npm test