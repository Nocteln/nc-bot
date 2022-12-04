const mysql = require("mysql")

module.exports = async () => {

    let db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "discord bot 1"
    })

    return db
}
/*const mysql = require("mysql")

module.exports = async () => {

    let db = await mysql.createConnection({
        host: "str3.ccshield.fr",
        user: "u417_zYsqRTCY3o",
        password: "G6TkQ1HW6=lyoDHMeS@kwj.g",
        database: "s417_bot"
    })

    return db
}*/