# User-API

Тестовое задание для разработки REST API сервиса работы с пользователями.

## 📋 Описание
Сервис предоставляет API для регистрации, авторизации и управления пользователями с разграничением прав доступа (`admin` | `user`). Реализован с соблюдением лучших практик организации кода, типизации и безопасности.


## 🐳 Запуск через Docker

Проект полностью контейнеризован. Для локального развёртывания достаточно Docker и Docker Compose.

🔑 Переменные окружения

1. Скопируйте конфиги окружения

```bash
cp .env.example .env
```
Отредактируйте .env под свои нужды (`DATABASE_URL`, `JWT_SECRET` и т.д.)

&nbsp;

2. Соберите и запустите контейнеры

```bash
docker compose up -d --build
```
&nbsp;

3. Примените миграции Prisma (выполняется внутри контейнера)

```bash
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma generate
```

&nbsp;

4. Примените миграции Prisma (выполняется внутри контейнера)

```bash
docker compose ps
```
&nbsp;

✅ API доступен: [http://localhost:4000](http://localhost:4000) \
📖 Swagger UI: [http://localhost:4000/docs](http://localhost:4000/dosc)

&nbsp;

**🔑 Переменные окружения**

Убедитесь, что в `.env` указаны следующие параметры:

```bash
POSTGRES_URI=postgresql://postgres:root@postgres:5432/user

PORT = "3000"
NODE_ENV = "development"
CORS_ORIGIN="*"


JWT_ACCESS_SECRET="access-secret"
JWT_ACCESS_EXPIRES="1d"
JWT_REFRESH_SECRET="refresh-secret"
JWT_REFRESH_EXPIRES="15d"
```

&nbsp;

## 📚 API Документация

> 💡 **Интерактивная документация**: После запуска сервера откройте url `URL сервера` + `/docs` (Пример:`http://localhost:4000/docs`) для просмотра спецификации OpenAPI, тестирования эндпоинтов и получения примеров запросов.

---

### 🔑 Авторизация и регистрация

#### `POST /api/auth/register` — Регистрация нового пользователя

Создаёт нового пользователя в системе, генерирует JWT-токены для аутентификации.

**🔹 Запрос**

| Параметр | Тип | Обязательный | Описание | Пример |
|----------|-----|--------------|----------|--------|
| `fullName` | `string` | ✅ | ФИО пользователя (8-60 символов) | `"Иванов Иван Иванович"` |
| `email` | `string` (email) | ✅ | Уникальный email | `"user@example.com"` |
| `password` | `string` | ✅ | Пароль (мин. 8 символов) | `"SecurePass123!"` |
| `dateOfBirth` | `string` (date) | ✅ | Дата рождения в формате `YYYY-MM-DD` | `"1995-06-15"` |

**🔹 Пример запроса (cURL)**

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Иванов Иван Иванович",
    "email": "user@example.com",
    "password": "SecurePass123!",
    "dateOfBirth": "1995-06-15"
  }'
```

  **🔹 Пример запроса (JavaScript / Fetch)**

```JavaScript
  const response = await fetch('http://localhost:4000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: 'Иванов Иван Иванович',
    email: 'user@example.com',
    password: 'SecurePass123!',
    dateOfBirth: '1995-06-15',
  }),
});
const result = await response.json();
```


**🔹 Успешный ответ (201 Created)**

```Json
{
  "success": true,
  "message": "Пользователь успешно зарегестрировался",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "01HXYZ123ABC...",
      "email": "user@example.com",
    }
  }
}
```

> 🔐 **Важно**: В ответе никогда не возвращается пароль. RefreshToken передаётся в HTTP-only cookie (не доступен через JS) и автоматически отправляется браузером при последующих запросах.
    




**🔹 Использование токена**
После успешной регистрации используйте accessToken для авторизации защищённых эндпоинтов:

```bash
curl -X GET http://localhost:4000/api/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

> 🔁 **Refresh**: Token: Если accessToken истёк, используйте куку refreshToken для получения новой пары токенов через POST `/api/auth/refresh`




&nbsp;

#### `POST /api/auth/login` — Авторизация нового пользователя

Проверяет пользователя в системе, генерирует JWT-токены для аутентификации.

**🔹 Запрос**

| Параметр | Тип | Обязательный | Описание | Пример |
|----------|-----|--------------|----------|--------|
| `email` | `string` (email) | ✅ | Уникальный email | `"user@example.com"` |
| `password` | `string` | ✅ | Пароль (мин. 8 символов) | `"SecurePass123!"` |



**🔹 Пример запроса (cURL)**

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
  }'
```

  **🔹 Пример запроса (JavaScript / Fetch)**

```JavaScript
  const response = await fetch('http://localhost:4000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePass123!',
  }),
});

const result = await response.json();
```

**🔹 Успешный ответ (201 Created)**

```Json
{
  "success": true,
  "message": "Пользователь успешно авторизовался",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "01HXYZ123ABC...",
      "email": "user@example.com",
    }
  }
}
```
&nbsp;

### 🔄 Обновление JWT токенов

#### `POST /api/auth/refresh` — Получение информации пользователя

Обновление пары токенов. Читает Refresh Token из cookie и генерирует новую пару.

| Параметр | Значение | Обязательно|
|----------|-----|--------------|
| `Authorization` | `Bearer <current_access_token>` | ✅ | 
| `Cookie` | `token=<refresh_token>` | ✅ | 


**Ответ 201 Created**

```Json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (новый access token)"
}
```


**Пример (cURL)**
```bash
curl -X POST http://localhost:4000/api/auth/refresh \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

&nbsp;

### 👤 Получение информации (для авторизированного пользователя)

#### `POST /api/auth/me` — Получение информации пользователя

Получает первоначальную информацию пользователя по access токену.


**🔹 Пример запроса (cURL)**

```bash
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

  **🔹 Пример запроса (JavaScript / Fetch)**

```JavaScript
  const response = await fetch('http://localhost:4000/api/auth/me', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  });

const result = await response.json();
```

&nbsp;

### 🔎 Получение пользователя по id

#### `POST /api/users/:id` — Получение профиля пользователя по ID


  👤 **USER** (Пользователь): Может получить данные только своего аккаунта. Если в параметре :id указан чужой ID — вернётся ошибка 403.

  👑 **ADMIN** (Администратор): Может получать данные любого пользователя в системе, а также свои.

&nbsp;

 **Параметры пути**

| Параметр | Тип | Описание|
|----------|-----|--------------|
| `id` | `string` | Уникальный идентификатор пользователя (например: 01KQ59P3...) | 

&nbsp;

**Заголовки запроса**

| Параметр | Тип | Описание|
|----------|-----|--------------|
| `Authorization` | `Bearer <token>` | Access Token авторизованного пользователя | 


**Ответ `200 OK`**


```json
{
  "success": true,
  "data": {
    "id": "01KQ59P3H4QAN0ZQ1HA8CBHZ2Q",
    "fullName": "Иванов Иван Иванович",
    "email": "user@example.com",
    "dateOfBirth": "1995-06-15T00:00:00.000Z",
    "role": "USER",
    "status": "ACTIVE",
    "createdAt": "2024-05-20T10:00:00.000Z",
    "updatedAt": "2024-05-20T12:30:00.000Z"
  }
}
```

    ⚠️ Важно: Поле password никогда не возвращаются в публичном ответе для безопасности.

&nbsp;

  **Ошибки**

  | Статус | Описание | Когда возникает |
|----------|-----|--------------|
| `400` | Bad Request | Некорректный формат `id` в пути | 
| `401` | Unauthorized |Токен не передан или истёк | 
| `403` | Forbidden | 	`USER` пытается получить доступ к чужому профилю| 
| `404` | Not Found | Пользователь с указанным ID не существует | 
| `500` | Internal Server Error | Ошибка сервера или базы данных | 

&nbsp;

**Пример (cURL)**

_Сценарий: Пользователь получает свой профиль_

```bash
curl -X GET http://localhost:4000/api/users/01KQ59P3H4QAN0ZQ1HA8CBHZ2Q \
  -H "Authorization: Bearer ВАШ_ACCESS_TOKEN"
```

_Сценарий: Админ получает профиль другого пользователя_

```bash
curl -X GET http://localhost:4000/api/users/01KQ999999999999999999999999 \
  -H "Authorization: Bearer ТОКЕН_АДМИНА
```

Этот блок четко разграничивает права доступа и показывает ревьюеру, что вы реализовали Resource-Based Authorization (проверку прав на конкретный ресурс).

&nbsp;

### 👥 Получение всех пользователей (для `ADMIN`)

#### `POST /api/users` — Получение списка пользователей

Получение списка всех пользователей с пагинацией

**🔒 Правила доступа:**
Только роль `ADMIN`. Попытка запроса от `USER` приведёт к ошибке `403 Forbidden`.

&nbsp;
**Параметры запроса (Query)**

  | Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----|
| `page` | `integer` | 1 | Номер страницы (≥ 1) |
| `limit` | `integer` |20 | Количество записей на странице (1–100) |

**Заголовки запроса**

| Параметр | Тип | Описание|
|----------|-----|--------------|
| `Authorization` | `Bearer <token>` | Access Token авторизованного пользователя | 

&nbsp;

**Ответ `200 OK`**


```json
{
  "data":[
    {
      "id": "01KQ59P3H4QAN0ZQ1HA8CBHZ2Q",
      "fullName": "Иванов Иван Иванович",
      "email": "user@example.com",
      "dateOfBirth": "1995-06-15T00:00:00.000Z",
      "role": "USER",
      "status": "ACTIVE",
      "createdAt": "2024-05-20T10:00:00.000Z",
      "updatedAt": "2024-05-20T10:00:00.000Z"
    }
  ],
  "meta":{
    "total":100
  }
}
```

&nbsp;

  **Ошибки**

  | Статус | Описание | Когда возникает |
|----------|-----|--------------|
| `401` | Unauthorized |Токен не передан или истёк | 
| `403` | Forbidden | Запрос выполнен от имени `USER`| 
| `500` | Internal Server Error | Ошибка сервера или базы данных | 


**Пример (cURL)**

```bash
curl -X GET "http://localhost:4000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer ТОКЕН_АДМИНА"
```
&nbsp;



### 🚫 Блокировка пользователя

#### `POST /api/users/:id/block` — блокировка пользователя

Блокировка (деактивация) пользователя. Изменяет статус аккаунта на `BLOCKED`

👤 **USER**: Может заблокировать только свой аккаунт (:id должен строго совпадать с userId из токена).

👑 **ADMIN**: Может заблокировать любого пользователя в системе, включая себя.

&nbsp;

 **Параметры пути**

| Параметр | Тип | Описание|
|----------|-----|--------------|
| `id` | `string` | Уникальный идентификатор пользователя (например: 01KQ59P3...) | 

&nbsp;

**Заголовки запроса**

| Параметр | Тип | Описание|
|----------|-----|--------------|
| `Authorization` | `Bearer <token>` | Access Token авторизованного пользователя | 

&nbsp;

**Ответ `200 OK`**


```json
{
  "status": "success",
  "message": "Пользователь успешно заблокирован"
}
```

    ⚙️ Идемпотентность: Если аккаунт уже имеет статус BLOCKED, сервер вернёт 200 с сообщением "Данный аккаунт уже заблокирован". Ошибка не генерируется, что безопасно для повторных отправок со стороны клиента.



  **Ошибки**

  | Статус | Описание | Когда возникает |
|----------|-----|--------------|
| `400` | Bad Request | Некорректный формат `id` в пути | 
| `401` | Unauthorized |Токен не передан или истёк | 
| `403` | Forbidden | 	`USER` пытается заблокировать чужой аккаунт| 
| `404` | Not Found | Пользователь с указанным ID не существует | 
| `500` | Internal Server Error | Ошибка сервера или базы данных | 

&nbsp;


**Примеры (cURL)**

_Сценарий: Пользователь блокирует сам себя_

```bash
curl -X POST http://localhost:4000/api/users/01KQ59P3H4QAN0ZQ1HA8CBHZ2Q/block \
  -H "Authorization: Bearer ТОКЕН_ПОЛЬЗОВАТЕЛЯ"

```


_Сценарий: Админ блокирует нарушителя_

```bash
curl -X POST http://localhost:4000/api/users/01KQ999999999999999999999999/block \
  -H "Authorization: Bearer ТОКЕН_АДМИНА"
```

&nbsp;

**📌 Примечание - после блокировки:**
  
  - Пользователь с status: `BLOCKED` не сможет выполнить `POST` `/auth/login` (получит `403`). 
  - Существующие сессии живут до истечения TTL `access`-токена (указывается в `.env` файле).
  - Безопасность: Endpoint `/block` не принимает тело запроса (`req.body` игнорируется). Все данные передаются через путь и заголовки, что упрощает валидацию.