/**
 * @openapi
 * tags:
 *   - name: Usuários
 *     description: Rotas relacionadas aos usuários
 */

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Registrar um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Realizar login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: mateus@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @openapi
 * /user/session:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Verificar sessão do usuário
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Sessão válida
 *       401:
 *         description: Sessão inválida ou expirada
 */

/**
 * @openapi
 * /user/logout:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Logout do usuário
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Buscar usuário por ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Não autenticado
 */
export {}
