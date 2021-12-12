start:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
stop:
	docker-compose down -v
