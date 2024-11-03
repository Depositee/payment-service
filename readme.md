docker run -d --name paymentDB -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=guest -e POSTGRES_DB=postgres -p 5433:5432 -v postgres_data:/var/lib/postgres
