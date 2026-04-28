/**
 * @swagger
 * /api/users/{id}/block:
 *   post:
 *     summary: Блокировка пользователя
 *     description: |
 *       Изменяет статус пользователя на `BLOCKED`.
 *
 *       **Правила доступа:**
 *       - 🔹 **Админ (ADMIN)**: может блокировать любого пользователя, включая себя
 *       - 🔹 **Пользователь (USER)**: может заблокировать только свой аккаунт (`id === ваш_id`)
 *
 *       **Поведение:**
 *       - Повторный вызов для уже заблокированного пользователя вернёт информативный ответ без ошибки
 *       - Блокировка не удаляет данные, а только ограничивает доступ к аккаунту
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
 *         description: ID пользователя для блокировки
 *     responses:
 *       200:
 *         description: Операция выполнена успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Пользователь успешно заблокирован"
 *                   enum:
 *                     - "Пользователь успешно заблокирован"
 *                     - "Данный аккаунт уже заблокирован"
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
 *         description: Недостаточно прав (попытка пользователя заблокировать чужой аккаунт)
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
 *                       example: "Вы можете заблокировать только свой аккаунт"
 *       404:
 *         description: Пользователь с указанным ID не найден
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
