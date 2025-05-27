import { RequestHandler } from "express";
import * as repository from '../repository/Ticket.Repository';
import { parseMessageI18n } from '../utils/parse-messga-i18';
import { IResponse, IResponseCreate, IresponseRepositoryService } from "../interface/Ticket.Interface";


export const createTicket: RequestHandler = async (req, res) => {
    try {
        // const { code, message, ...resto }: IResponse<IResponseCreate> = await repository.createTicket(req?.body);
        console.log("Body recibido:", req.body);
        const { code, message, ...resto }: IresponseRepositoryService = await repository.createTicket(req?.body);
        res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};


export const getTicketDataController: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IresponseRepositoryService = await repository.getTicketData();
        res.status(code).json({ message: parseMessageI18n(message, req), ...resto });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: parseMessageI18n("error_server", req) });
    }
};


export const updateTicket: RequestHandler = async (req, res) => {
    try {
        const { code, message, ...resto }: IresponseRepositoryService = await repository.updateTicket(req.body);
        res.status(code).json({ message: parseMessageI18n(message, req), ...resto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};


export const deleteTicket: RequestHandler = async (req, res) => {
    try {
        const idTickets = Number(req.params.idTickets);
        const { code, message, ...resto }: IresponseRepositoryService = await repository.deleteTicket(idTickets);
        res.status(code).json({ message: parseMessageI18n(message, req), ...resto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: parseMessageI18n('error_server', req) });
    }
};