import { Router } from "express";
import { createTicket, getTicketDataController } from "../controllers/Ticket.Controller";
import { CreateTicketSchema } from "./schemas/ticket.schema";
import { check, checkSchema } from "express-validator";
const ticketDataRouter = Router();

/**
 * @swagger
 * /createTicket:
 *   post:
 *     tags:
 *       - Ticktet Data
 *     summary: Add a new ticket
 *     description: Add a new ticket to the system.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
  *              codigoEmpleado:
 *                type: string
 *              nombreSolicitud:
 *                type: string
 *              nombreArchivo:
 *               type: string
 *              rutaArchivo:
 *               type: string
 *              linkurl:
 *               type: string
 *              observaciones:
 *                type: string
 *              fechaSolicitud:
 *                type: string
 *              fechaMaxima:
 *                type: string
 *              fechaEdicion:
 *                type: string
 *              tiposolicitud:
 *                type: string
 *              idUsuarios:
 *                type: integer
 *              idStatus:
 *                type: integer
 *              email:
 *                type: string
 *              idClientHoneSolutions:
 *                type: integer
 *              userLoggedIn:
 *               type: integer
 *     responses:
 *       200:
 *         description: Ticket added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: object
 *                   properties:
 *                     translationKey:
 *                       type: string
 *                       example: ticket.created
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: object
 *                   properties:
 *                     translationKey:
 *                       type: string
 *                       example: ticket.error_invalid_data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
ticketDataRouter.post("/createTicket", createTicket);

/**
 * @swagger
 * /updateTicket:
 *   put:
 *     tags:
 *       - Ticktet Data
 *     summary: Update an existing ticket
 *     description: Update a ticket in the system by idTickets.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idTickets:
 *                 type: integer
 *               codigoEmpleado:
 *                 type: string
 *               nombreSolicitud:
 *                 type: string
 *               nombreArchivo:
 *                 type: string
 *               rutaArchivo:
 *                 type: string
 *               linkurl:
 *                 type: string
 *               observaciones:
 *                 type: string
 *               fechaSolicitud:
 *                 type: string
 *               fechaMaxima:
 *                 type: string
 *               fechaEdicion:
 *                 type: string
 *               tiposolicitud:
 *                 type: string
 *               idUsuarios:
 *                 type: integer
 *               idStatus:
 *                 type: integer
 *               email:
 *                 type: string
 *               idClientHoneSolutions:
 *                 type: integer
 *               userLoggedIn:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: object
 *                   properties:
 *                     translationKey:
 *                       type: string
 *                       example: ticket.updated
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: object
 *                   properties:
 *                     translationKey:
 *                       type: string
 *                       example: ticket.error_invalid_data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
ticketDataRouter.put("/updateTicket", require("../controllers/Ticket.Controller").updateTicket);

/**
 * @swagger
 * /ticketData:
 *   get:
 *     tags:
 *       - Weight Data 
 *     summary: Retrieve all weight data
 *     description: Returns a list of all tickets.
 *     responses:
 *       200:
 *         description: Successfully retrieved weight data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: object
 *                   properties:
 *                     translationKey:
 *                       type: string
 *                       example: weightData.found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idTickets:
 *                         type: integer
 *                       tiposolicitud: 
 *                        type: string
 *                       idusuarios: 
 *                        type: integer
 *                       idClientHoneSolutions: 
 *                        type: integer
 *                       idStatus: 
 *                        type: integer
 *                       userLoggedIn: 
 *                        type: integer
 *                       nombreSolicitud:
 *                         type: string
 *                       codigoEmpleado:
 *                         type: string
 *                       fechaSolicitud:
 *                         type: string
 *                       fechaMaxima:
 *                         type: string
 *                       fechaEdicion:
 *                         type: string
 *                       observaciones:
 *                         type: string
 *                       nombreArchivo:
 *                         type: string
 *                       rutaArchivo:
 *                         type: string
 *                       linkurl:
 *                         type: string
 *                       email:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
ticketDataRouter.get("/ticketData", getTicketDataController);

/**
 * @swagger
 * /deleteTicket/{idTickets}:
 *   delete:
 *     tags:
 *       - Ticktet Data
 *     summary: Delete a ticket
 *     description: Delete a ticket by idTickets.
 *     parameters:
 *       - in: path
 *         name: idTickets
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: object
 *                   properties:
 *                     translationKey:
 *                       type: string
 *                       example: ticket.deleted
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: object
 *                   properties:
 *                     translationKey:
 *                       type: string
 *                       example: ticket.error_invalid_data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
ticketDataRouter.delete("/deleteTicket/:idTickets", require("../controllers/Ticket.Controller").deleteTicket);

export default ticketDataRouter;
