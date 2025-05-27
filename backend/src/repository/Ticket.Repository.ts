import { connectToSqlServer } from "../DB/config";
import { IRequestCreate, IresponseRepositoryService, ITicketModel } from "../interface/Ticket.Interface";
import Ticket from "../models/ticket.model";

// import { sequelize } from '../db/connection'; // Asegúrate de tener la instancia sequelize aquí
import { connectionSequelizeSql } from '../DB/config'; // Asegúrate de tener la instancia sequelize aquí

export const createTicket = async (request: ITicketModel): Promise<IresponseRepositoryService> => {
    try {
        // Desestructurar los campos que deseas insertar manualmente
        const {
            codigoEmpleado,
            nombreSolicitud,
            nombreArchivo,
            rutaArchivo,
            linkurl,
            observaciones,
            fechaSolicitud,
            fechaMaxima,
            fechaEdicion,
            tiposolicitud,
            idUsuarios,
            idStatus,
            email,
            idClientHoneSolutions,
            userLoggedIn
        } = request;

        const query = `
            INSERT INTO TB_tickets (
                codigoEmpleado,
                nombreSolicitud,
                nombreArchivo,
                rutaArchivo,
                linkurl,
                observaciones,
                fechaSolicitud,
                fechaMaxima,
                fechaEdicion,
                tiposolicitud,
                idUsuarios,
                idStatus,
                email,
                idClientHoneSolutions,
                userLoggedIn
            )
            VALUES (
                :codigoEmpleado,
                :nombreSolicitud,
                :nombreArchivo,
                :rutaArchivo,
                :linkurl,
                :observaciones,
                :fechaSolicitud,
                :fechaMaxima,
                :fechaEdicion,
                :tiposolicitud,
                :idUsuarios,
                :idStatus,
                :email,
                :idClientHoneSolutions,
                :userLoggedIn
            )
        `;

        await connectionSequelizeSql.query(query, {
            replacements: {
                codigoEmpleado,
                nombreSolicitud,
                nombreArchivo,
                rutaArchivo,
                linkurl,
                observaciones,
                fechaSolicitud,
                fechaMaxima,
                fechaEdicion,
                tiposolicitud,
                idUsuarios,
                idStatus,
                email,
                idClientHoneSolutions,
                userLoggedIn
            }
        });

        return {
            code: 200,
            message: { translationKey: "company.created", translationParams: { name: "createTicket" } },
            data: ""
        };
    } catch (err: any) {
        console.error("Error: ", err);
        console.error(err.original?.info?.message || err.message);
        return {
            code: 400,
            message: { translationKey: "ticket.error_server", translationParams: { name: "createTicket" } },
        };
    }
};

export const getTicketData = async (): Promise<IresponseRepositoryService> => {
    try {
        const db = await connectToSqlServer();
        const query = `SELECT * FROM TB_tickets`;
        const result = await db?.request().query(query);

        return {
            code: 200,
            message: { translationKey: "weightData.found", translationParams: { name: "getTicketData" } },
            data: result?.recordset || []
        };
    } catch (err) {
        console.log("Error fetching box dimensions", err);
        return {
            code: 500,
            message: { translationKey: "weightData.error_server", translationParams: { name: "getTicketData" } },
        };
    }
};

export const updateTicket = async (request: ITicketModel): Promise<IresponseRepositoryService> => {
    try {
        const {
            idTickets,
            codigoEmpleado,
            nombreSolicitud,
            nombreArchivo,
            rutaArchivo,
            linkurl,
            observaciones,
            fechaSolicitud,
            fechaMaxima,
            fechaEdicion,
            tiposolicitud,
            idUsuarios,
            idStatus,
            email,
            idClientHoneSolutions,
            userLoggedIn
        } = request;

        if (!idTickets) {
            return {
                code: 400,
                message: { translationKey: "ticket.id_required", translationParams: { name: "updateTicket" } },
            };
        }

        const query = `
            UPDATE TB_tickets SET
                codigoEmpleado = :codigoEmpleado,
                nombreSolicitud = :nombreSolicitud,
                nombreArchivo = :nombreArchivo,
                rutaArchivo = :rutaArchivo,
                linkurl = :linkurl,
                observaciones = :observaciones,
                fechaSolicitud = :fechaSolicitud,
                fechaMaxima = :fechaMaxima,
                fechaEdicion = :fechaEdicion,
                tiposolicitud = :tiposolicitud,
                idUsuarios = :idUsuarios,
                idStatus = :idStatus,
                email = :email,
                idClientHoneSolutions = :idClientHoneSolutions,
                userLoggedIn = :userLoggedIn
            WHERE idTickets = :idTickets
        `;

        await connectionSequelizeSql.query(query, {
            replacements: {
                idTickets,
                codigoEmpleado,
                nombreSolicitud,
                nombreArchivo,
                rutaArchivo,
                linkurl,
                observaciones,
                fechaSolicitud,
                fechaMaxima,
                fechaEdicion,
                tiposolicitud,
                idUsuarios,
                idStatus,
                email,
                idClientHoneSolutions,
                userLoggedIn
            }
        });

        return {
            code: 200,
            message: { translationKey: "ticket.updated", translationParams: { name: "updateTicket" } },
            data: ""
        };
    } catch (err: any) {
        console.error("Error: ", err);
        console.error(err.original?.info?.message || err.message);
        return {
            code: 400,
            message: { translationKey: "ticket.error_server", translationParams: { name: "updateTicket" } },
        };
    }
};

export const deleteTicket = async (idTickets: number): Promise<IresponseRepositoryService> => {
    try {
        if (!idTickets) {
            return {
                code: 400,
                message: { translationKey: "ticket.id_required", translationParams: { name: "deleteTicket" } },
            };
        }
        const query = `DELETE FROM TB_tickets WHERE idTickets = :idTickets`;
        await connectionSequelizeSql.query(query, {
            replacements: { idTickets }
        });
        return {
            code: 200,
            message: { translationKey: "ticket.deleted", translationParams: { name: "deleteTicket" } },
            data: ""
        };
    } catch (err: any) {
        console.error("Error: ", err);
        console.error(err.original?.info?.message || err.message);
        return {
            code: 400,
            message: { translationKey: "ticket.error_server", translationParams: { name: "deleteTicket" } },
        };
    }
};
