# Afilio API

[![npm package](https://nodei.co/npm/afilio-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/afilio-api/)

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

let Afilio = require("afilio-api"),
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
