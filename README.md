# Afilio API

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/andrehrf/afilio-api-nodejs/master/LICENSE)
[![npm version](https://badge.fury.io/js/afilio-api.svg)](https://badge.fury.io/js/afilio-api)

API integration with Afilio

## Install

```bash
$ npm install afilio-api
```

## Get Token and AffID

* AffID - http://wiki.afilio.com.br/doku.php?id=api_de_relatorios#como_descobrir_seu_siteid
* SiteID - http://v2.afilio.com.br/aff/aff_ban.php?aff_deep_link_info=1&nType=deeplink
* API Token - http://wiki.afilio.com.br/doku.php?id=como_gerar_meu_token

## Usage

```js
"use strict";

let Afilio = require("./index.js"),
    afilio = new Afilio("token", "affid", "siteid");

afilio.programs(function(err, result){
    console.log(result);
});

afilio.coupons(function(err, result){
    console.log(result);
});

afilio.report("2016-01-01", "2016-07-16", function(err, result){
    console.log(result);
});

afilio.deeplink("http://www.pontofrio.com.br/", 768, function(err, url){
    console.log(url); //http://v2.afilio.com.br/tracker.php?banid=4270544&campid=42143;768&siteid=47016&url=http%3A%2F%2Fwww.pontofrio.com.br%2F%3Futm_source%3DAfilio%26utm_medium%3Dhometextlink%26utm_campaign%3DLink%26utm_content%3D47016
});
```

## License

  MIT
  
  Copyright (C) 2016 André Ferreira

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.