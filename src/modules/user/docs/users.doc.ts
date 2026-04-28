/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получение списка пользователей (только для админов)
 *     description: Возвращает пагинированный список всех пользователей. Доступно только роли `ADMIN`.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           example: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *           example: 20
 *         description: Количество записей на странице (макс. 100)
 *     responses:
 *       200:
 *         description: Список пользователей с мета-данными пагинации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, example: "01KQ59P3H4QAN0ZQ1HA8CBHZ2Q" }
 *                       fullName: { type: string, example: "Иванов Иван" }
 *                       email: { type: string, example: "user@example.com" }
 *                       dateOfBirth: { type: string, format: date, example: "1995-06-15" }
 *                       role: { type: string, enum: [USER, ADMIN], example: "USER" }
 *                       status: { type: string, enum: [ACTIVE, BLOCKED], example: "ACTIVE" }
 *                       createdAt: { type: string, format: date-time }
 *                       updatedAt: { type: string, format: date-time }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 20 }
 *                     total: { type: integer, example: 145 }
 *                     totalPages: { type: integer, example: 8 }
 *       401:
 *         description: Неавторизован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "UNAUTHORIZED"
 *                     message:
 *                       type: string
 *                       example: "Требуется авторизация"
 *       403:
 *         description: Недостаточно прав (требуется роль ADMIN)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "FORBIDDEN"
 *                     message:
 *                       type: string
 *                       example: "У вас недостаточно прав"
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "INTERNAL_ERROR"
 *                     message:
 *                       type: string
 *                       example: "Внутренняя ошибка сервера"
 */
