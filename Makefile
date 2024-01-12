SERVER=express_container

.PHONY: up down docker-watch server-it

up:
	docker-compose up -d

down:
	docker-compose down

docker-watch:
	docker compose watch

server-it:
	docker-compose exec -it $(SERVER) sh