"use strict";

const url = require("url"),
      request = require("request");

module.exports = function(token, affid, siteid){
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
         * Function to encode URL
         * 
         * @see http://locutus.io/php/url/urlencode/
         * @param str
         * @return str
         */
        urlencode: function(str){
            str = (str + '');
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
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
            this.getinapi("http://v2.afilio.com.br/api/leadsale_api.php?mode=list&type=sale&dateType=transaction&format=JSON&token=" + token + "&affid=" + affid + "&dateStart=" + datestart + "&dateEnd=" + dateend, cb);
        },
        
        /**
         * Create tracking links
         * 
         * @param string url
         * @param integer progid
         * @return void
         */
        deeplink: function(url, progid, cb){
            request("http://v2.afilio.com.br/api/deeplink.php?token="+token+"&affid="+affid+"&progid="+progid+"&bantitle=deeplink&bandesc=deeplink&siteid="+siteid+"&desturl=" + this.urlencode(url), (error, response, body) => { 
                if(error){
                    cb(error, null);
                }
                else{                    
                    try{
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(body, "text/xml");
                        cb(false, xmlDoc.getElementsByTagName("link")[0].childNodes[0].nodeValue.match(/href=[\'\"](.*?)[\'\"]/)[1]);
                    }
                    catch(e){
                        cb({"msg": "Invalid link to this program."}, null);
                    }
                }
            });
        }
    }
}
