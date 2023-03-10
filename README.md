# Inventory Companies Server

## Getting start

_These instructions let get a copy of project for testing and developing._

## Requirements

_Clone the project in your PC:_

- Clone the [InventoryCompaniesServer](https://github.com/leoerickp/InventoryCompaniesServer.git).

## Config

_Into the project folder, it must create de file .env and add the following information:_

```javascript
STATE = dev;
DB_PASSWORD = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;
DB_NAME = inventoryCompaniesDB;
DB_HOST = inventoryDB;
DB_PORT = 5432;
DB_USERNAME = postgres;
JWT_SECRET = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;
PORT = 3000;
```

---

## Run

_Into the project folder:_

- Execute the following command:

```console
yarn install
```

```console
docker compose up -d
```

```console
tsc
```

```console
yarn start
```

- if you prefer execute using docker compose you can execute the following command:

```console
docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build
```

- To init database with test data you can execute:
  **http://localhost:3000/api/seed**

## Frontend InventoryCompaniesFrontend

_The Frontend code repostory is available in:_ [InventoryCompaniesFrontend](https://github.com/leoerickp/InventoryCompaniesFrontend.git).

## Author

- [Leo Erick Pereyra Rodriguez](https://leoerickp.cf/).
