/**
 * Afilio API interface for Node.js
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @see http://wiki.afilio.com.br/doku.php?id=como_se_cadastrar (Create account)
 * @see http://wiki.afilio.com.br/doku.php?id=api_de_relatorios#como_descobrir_seu_siteid (affid)
 * @see http://wiki.afilio.com.br/doku.php?id=como_gerar_meu_token (token)
 */

"use strict";

let Afilio = require("./index.js"),
    afilio = new Afilio("token", "affid");

afilio.programs(function(err, result){
    console.log(result);
});

afilio.coupons(function(err, result){
    console.log(result);
});

afilio.report("2016-01-01", "2016-07-16", function(err, result){
    console.log(result);
});