export interface ImessageComposed {
    translationKey: string,
    translationParams: object
}

export interface IresponseRepositoryService {
    code: number,
    message:  ImessageComposed | string,
    data?: any
}

export interface IResponse<T> {
    code: number,
    message: string | { translationKey: string },
    data?: T | unknown
}

export interface IResponseCreate {
    code: number,
    message: string | { translationKey: string }
    data: {}
}

export interface IRequestCreate {
    requestName: string,
    employeeCode: string,
    description: string,
    typeRequest: number,
    userId: number,
    email: string,
    idClientHone: number,
    requestDate: Date,
    maxDate: Date,
    idRole: number,
    userLogged: number
}

export interface ITicketModel {
    idTickets?: number,
    codigoEmpleado: string,
    nombreSolicitud: string,
    nombreArchivo: string,
    rutaArchivo: string,
    linkurl: string,
    observaciones: string,
    fechaSolicitud: string,
    fechaMaxima: string,
    fechaEdicion?: string,
    tiposolicitud: string,
    idUsuarios: number,
    idStatus?: number,
    email: string,
    idClientHoneSolutions: number,
    userLoggedIn: number
}