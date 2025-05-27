import dotEnv from "dotenv";
// utilizar variables de entorno
dotEnv.config();

export default {
    port: process.env.PORT || "8080",
    server_name_sql: process.env.SERVER_NAME_SQL || "",
    user_server_sql: process.env.USER_SERVER_SQL || "",
    password_sql: process.env.PASSWORD_SQL || "",   // ← ✅ Agregado
    name_database_sql: process.env.NAME_DATABASE_SQL || "",
    db_table_name_ticket: "TB_tickets",
}

// export default {
//     port: process.env.PORT  || "8080",
//     server_name_sql: process.env.SERVER_NAME_SQL || "",
//     user_server_sql: process.env.USER_SERVER_SQL || "",
//     name_database_sql: process.env.NAME_DATABASE_SQL || "",
//     db_table_name_ticket: "TB_tickets",
// }


// export default {
//     port: process.env.PORT  || "8080",
//     server_name_sql: process.env.SERVER_NAME_SQL || "",
//     user_server_sql: process.env.USER_SERVER_SQL || "",
//     name_database_sql: process.env.NAME_DATABASE_SQL || ""
// }