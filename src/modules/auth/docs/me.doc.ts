/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Получение профиля текущего пользователя
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Профиль пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 user:
 *                   type: object
 *                   properties:
 *                     id: { type: string }
 *                     fullName: { type: string }
 *                     email: { type: string }
 *                     dateOfBirth: { type: string, format: date }
 *                     role: { type: string, enum: [USER, ADMIN] }
 *                     status: { type: string, enum: [ACTIVE, BLOCKED] }
 *                     createdAt: { type: string, format: date-time }
 *                     updatedAt: { type: string, format: date-time }
 *       401:
 *         description: Неавторизован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 error:
 *                   type: object
 *                   properties:
 *                     code: { type: string, example: "UNAUTHORIZED" }
 *                     message: { type: string }
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 error:
 *                   type: object
 *                   properties:
 *                     code: { type: string, example: "NOT_FOUND" }
 *                     message: { type: string }
 */
