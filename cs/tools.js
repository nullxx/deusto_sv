var request = require('request');
var Cookie = require('request-cookies').Cookie;
const Config = require('../config')
module.exports.getCookie = () => {
    return new Promise((s, f) => {
        var options = {
            'method': 'GET',
            'url': Config.baseUrl,
            'encoding': Config.encoding,
            'headers': {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:72.0) Gecko/20100101 Firefox/72.0',
                'Accept': '*/*',
                'Cache-Control': 'no-cache',
                'Host': Config.origin,
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var rawcookies = response.headers['set-cookie'];
            var requiredCookie = null
            for (var i in rawcookies) {
                var cookie = new Cookie(rawcookies[i]);
                if (cookie.key == 'JSESSIONID') {
                    requiredCookie = cookie
                }
            }
            if (requiredCookie != null) {
                s(requiredCookie)
                Config.sessionCookie = requiredCookie
            } else {
                f("Cookie is not found")
            }
        });
    })
}
module.exports.loginRequest = (username, password) => {
    return new Promise((s, f) => {
        this.getCookie().then(cookie => {
            var options = {
                'method': 'POST',
                'url': Config.loginUrl,
                'encoding': Config.encoding,
                'headers': {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:72.0) Gecko/20100101 Firefox/72.0',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Origin': Config.originUrl,
                    'Connection': 'keep-alive',
                    'Referer': Config.baseUrl,
                    'Upgrade-Insecure-Requests': '1',
                    'Cookie': 'JSESSIONID=' + cookie.value
                },
                form: {
                    'idUsuario': username,
                    'password': password
                }
            };

            request(options, function (error, response) {
                if (error) f(error);
                if (response){ 
                    s(response.body);
                } else {
                    f("No response on request");
                }
            });
        })
    })
}
module.exports.getHTML = (url, referer) => {
    return new Promise((s, f) => {
        var options = {
            'method': 'GET',
            'url': url,
            'encoding': Config.encoding,
            'headers': {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:72.0) Gecko/20100101 Firefox/72.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': Config.originUrl,
                'Connection': 'keep-alive',
                'Referer': referer,
                'Upgrade-Insecure-Requests': '1',
                'Cookie': 'JSESSIONID=' + Config.sessionCookie.value
            }
        };

        request(options, function (error, response) {
            if (error) f(error);
            if (response){ 
                s(response.body);
            } else {
                f("No response on request");
            }
        });

    })
}
module.exports.gtS = (string) => {
    return new Promise((s, f) => {
        let one = string.split("('")[1]
        let two = one.split("')")[0]
        if (two != null) {
            s(two)
        } else {
            f("URL was not found")
        }
    })
}
module.exports.gtA = (htmlString) => {
    return new Promise((s, f) => {
        let one = htmlString.split('$("#frameApp").attr("src", "')[1]
        let two = one.split('");')[0]
        if (two != null) {
            s(two)
        } else {
            f('Error getting frameURL')
        }

    })
}
module.exports.parseText = (htmlString) => {
    if (htmlString != null) {
        let fixed = htmlString.replace(/(\r\n|\n|\r)/gm, "").trim();
        if (fixed.length == 0) {
            return null
        } else {
            return fixed
        }
    }
}
