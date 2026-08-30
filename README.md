# jb-fmr-nest

docker run --name mysql -d -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=college -e MYSQL_TCP_PORT=3306 -p 3306:3306 mysql:latest

# generate a basic tsconfig file
tsc --init