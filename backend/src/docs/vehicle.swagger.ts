/**
 * @openapi
 * tags:
 *   - name: Veículos
 *     description: Rotas relacionadas aos veículos
 */

/**
 * @openapi
 * /vehicle/register:
 *   post:
 *     tags:
 *       - Veículos
 *     summary: Cadastrar veículo
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Veículo cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */

/**
 * @openapi
 * /vehicles/pagination/{user_id}:
 *   get:
 *     tags:
 *       - Veículos
 *     summary: Listar veículos paginados de um usuário
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de veículos retornada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       401:
 *         description: Não autenticado
 */

/**
 * @openapi
 * /vehicle/{id}:
 *   get:
 *     tags:
 *       - Veículos
 *     summary: Buscar veículo por ID
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
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Veículo não encontrado
 *       401:
 *         description: Não autenticado
 */

/**
 * @openapi
 * /vehicle/{id}:
 *   put:
 *     tags:
 *       - Veículos
 *     summary: Atualizar veículo
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Veículo atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Veículo não encontrado
 *       401:
 *         description: Não autenticado
 */

/**
 * @openapi
 * /vehicle/{id}:
 *   delete:
 *     tags:
 *       - Veículos
 *     summary: Remover veículo
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
 *         description: Veículo removido com sucesso
 *       404:
 *         description: Veículo não encontrado
 *       401:
 *         description: Não autenticado
 */
export {}
