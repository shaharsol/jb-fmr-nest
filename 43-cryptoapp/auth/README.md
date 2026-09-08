npm i @nestjs/config @nestjs/typeorm typeorm mysql2 class-validator class-transformer @nestjs/jwt bcrypt


docker run --name mysql_cryptoapp_auth -d -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=crypto_auth -e MYSQL_TCP_PORT=3306 -p 3306:3306 mysql:latest