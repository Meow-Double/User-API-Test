/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получение профиля пользователя по ID
 *     description: |
 *       Возвращает публичные данные пользователя.
 *       - **Админ** может смотреть любого пользователя
 *       - **Обычный пользователь** может смотреть только свой профиль
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "01KQ59P3H4QAN0ZQ1HA8CBHZ2Q"
 *         description: ID пользователя (ULID)
 *     responses:
 *       200:
 *         description: Профиль пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "01KQ59P3H4QAN0ZQ1HA8CBHZ2Q"
 *                 fullName:
 *                   type: string
 *                   example: "Иванов Иван Иванович"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                   example: "1995-06-15"
 *                 role:
 *                   type: string
 *                   enum: [USER, ADMIN]
 *                   example: "USER"
 *                 status:
 *                   type: string
 *                   enum: [ACTIVE, BLOCKED]
 *                   example: "ACTIVE"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Некорректный формат ID
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
 *                       example: "BAD_REQUEST"
 *                     message:
 *                       type: string
 *                       example: "Некорректный формат параметра"
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
 *         description: Нет прав для просмотра этого профиля
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
 *                       example: "Нет прав для просмотра этого профиля"
 *       404:
 *         description: Пользователь не найден
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
 *                       example: "NOT_FOUND"
 *                     message:
 *                       type: string
 *                       example: "Пользователь не найден"
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
