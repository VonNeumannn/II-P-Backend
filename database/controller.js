const conn = require('../database/connection')
/*
Function to call SP FilterByAmount
*/
const filterByAmount = async(req, res) => {
    const pool = await conn.getConnection();
    const result = await pool.request()
        .input('inAmount', req.body.inAmount)
        .input('inPostUser', req.body.inPostUser)
        .input('inPostIp', req.body.inPostIp)             
        .output('outResultCode', 0)
        .execute('FilterByAmount')
    res.json(result.recordset)
};  
/*
Function to call SP FilterByArticleType
*/
const filterByArticleType = async(req, res) => {
    const pool = await conn.getConnection();
    const result = await pool.request()
        .input('inName', req.body.inName)
        .input('inPostUser', req.body.inPostUser)
        .input('inPostIp', req.body.inPostIp)             
        .output('outResultCode', 0)
        .execute('FilterByArticleType')
    res.json(result.recordset)
};
/*
Function to call SP FilterByName
*/
const filterByName = async(req, res) => {
    const pool = await conn.getConnection();
    const result = await pool.request()
        .input('inName', req.body.inName)
        .input('inPostUser', req.body.inPostUser)
        .input('inPostIp', req.body.inPostIp)             
        .output('outResultCode', 0)
        .execute('FilterByName')
    res.json(result.recordset)
};
/*
Function to call SP InsertArticle
*/
const insertArticle = async(req, res) => {
    const pool = await conn.getConnection();
    const result = await pool.request()
        .input('inName', req.body.inName)     
        .input('inPrice', req.body.inPrice)
        .input('inType', req.body.inType)
        .input('inPostUser', req.body.inPostUser)
        .input('inPostIp', req.body.inPostIp)               
        .output('outResultCode', 0)
        .execute('InsertArticle');
        if (result.output.outResultCode == 50001) {
            res.json({
                access: "Inserción Fallida",
                message: "El articulo ya existe"
            })
        } else if (result.output.outResultCode == 0){
            res.json({
                access: "Inserción Existosa",
                message: "Articulo insertado exitosamente"
            })
        } else {
            res.json({
                access: "Inserción Fallida",
                message: "Verifique que los datos ingresados sean correctos"
            })
        }
};  
/*
Function to call SP Login
*/
const login = async(req, res) => {
    const pool = await conn.getConnection();
    const result = await pool.request()
        .input('inUser', req.body.inUser)
        .input('inPassword', req.body.inPassword)
        .input('inPostUser', req.body.inPostUser)
        .input('inPostIp', req.body.inPostIp)
        .output('outLoginSuccess', 0)             
        .output('outResultCode', 0)
        .execute('LoginDB');
        if (result.output.outResultCode == 0 && result.output.outLoginSuccess == 0){
            res.json({
                access: "Login Exitoso",
                message: "Inicio de sesión exitoso"
            })
        } else {
            res.json({
                access: "Login Fallido",
                message: "Usuario o contraseña incorrectos"
            })
        }
};
/*
Function to call SP GetArticleTypes
*/
const getArticleTypes = async(req, res) => {
    const pool = await conn.getConnection();
    const result = await pool.request()             
        .output('outResultCode', 0)
        .execute('GetArticleTypes')
    res.json(result.recordset)
};  
exports.filterByAmount = filterByAmount;
exports.filterByArticleType = filterByArticleType;
exports.filterByName = filterByName;
exports.insertArticle = insertArticle;
exports.login = login;
exports.getArticleTypes = getArticleTypes;
