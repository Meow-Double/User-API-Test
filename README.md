# User-API

Тестовое задание для разработки REST API сервиса работы с пользователями.

## 📋 Описание
Сервис предоставляет API для регистрации, авторизации и управления пользователями с разграничением прав доступа (`admin` | `user`). Реализован с соблюдением лучших практик организации кода, типизации и безопасности.


## 📚 API Документация

> 💡 **Интерактивная документация**: После запуска сервера откройте url `URL сервера` + `/docs` (Пример:`http://localhost:4000/docs`) для просмотра спецификации OpenAPI, тестирования эндпоинтов и получения примеров запросов.

---

### 🔐 Авторизация и регистрация

#### `POST /api/auth/register` — Регистрация нового пользователя

Создаёт нового пользователя в системе, генерирует JWT-токены для аутентификации.

**🔹 Запрос**

| Параметр | Тип | Обязательный | Описание | Пример |
|----------|-----|--------------|----------|--------|
| `fullName` | `string` | ✅ | ФИО пользователя (3-100 символов) | `"Иванов Иван Иванович"` |
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

```bash
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

```bash
{
  "success": true,
  "message": "User registered",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "01HXYZ123ABC...",
      "email": "user@example.com",
      "fullName": "Иванов Иван Иванович"
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

