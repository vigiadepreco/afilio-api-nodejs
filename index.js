"use strict";

const url = require("url"),
      request = require("request");

module.exports = function(token, affid){
    return {
        /**
         * Function to generate the API request
         *
         * @param string URL 
         * @param function cb
         */
        getinapi: function(URL, cb) {   
            request(URL, (error, response, body) => { 
                if(body)
                    body = JSON.parse(body);
                
                cb(error, body); 
            });
        },
        
        /**
         * Function to generate application link
         *
         * @see http://stackoverflow.com/questions/22678346/convert-javascript-object-to-url-parameters
         * @param string URLbase
         * @param object params
         * @return string
         */
        createurl: function(URLbase, params) {
            let paramsStr = Object.keys(params).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
            }).join('&');

            return URLbase + ((URLbase.indexOf("?") >= 0) ? "" : "?") + paramsStr;
        },
        
        /**
         * Get advertiser programs
         *
         * @see http://wiki.afilio.com.br/doku.php?id=api_de_campanhas
         * @param function cb
         */
        programs: function(cb) {
            this.getinapi("http://v2.afilio.com.br/api/prog_api.php?token=" + token + "&affid= " + affid, cb);
        },
        
        /**
         * Get coupons, including their tracking links
         * 
         * @see http://wiki.afilio.com.br/doku.php?id=api_de_cupons
         * @param function cb
         */
        coupons: function(cb){            
            this.getinapi("http://v2.afilio.com.br/api/feedproducts.php?token=" + token + "&mode=dl&format=JSON&siteid=" + affid + "&affid=" + affid, cb);
        },
        
        /**
         * Returns basic statistics of clicks, views, leads and sales
         * 
         * @see http://wiki.afilio.com.br/doku.php?id=api_de_relatorios
         * @param string datestart Query start date in AAAA-MM-DD format
         * @param string dateend Query end date in AAAA-MM-DD format
         * @param function cb
         */
        report: function(datestart, dateend, cb){
            this.getinapi("http://v2.afilio.com.br/api/leadsale_api.php?mode=list&type=sale&format=JSON&token=" + token + "&affid=" + affid + "&dateStart=" + datestart + "&dateEnd=" + dateend, cb);
        }
    }
}
