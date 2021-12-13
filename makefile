start:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
stop:
	docker-compose down -v
