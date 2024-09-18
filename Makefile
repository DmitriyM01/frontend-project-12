install:
	npm install
	npm run postinstall

build:
	npm run build

start:
	npm run start
#########################################

start-frontend:
	make -C frontend start
	make -C frontend build

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

build:
	make -C frontend build