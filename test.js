
var https = require("https");
var request = require('request');
var fs = require('fs');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var keys = fs.readFileSync('./key.pem');
var certs = fs.readFileSync('./server.crt');
console.log(keys);
console.log(String.fromCharCode.apply(null, new Uint16Array(keys)));
console.log(String.fromCharCode.apply(null, new Uint16Array(certs)));
console.log(certs);
var headersOpt = {  
    "content-type": "application/json",
	'Content-Length': '321',
	"Authorization": "X-Matrix",
	//"origin" : "\"maguy02:my.domain.name\"",
	"key": "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0wwA4GgfugxFT7wJKvzgIfx1s6ongIWSwwwaZZCUFJ0YFGtL1ETw6fFvMMwkiTjiHmsKBZ+q9XaEv9oD4vts60K3Z8mEHby/G+qOY9+cbxi6XP4LfkZSwAPb80TJkRt/Ndqend+k7I2fzRGqnV7gQJ/Ss7x0lqssD1rVIr95PoJbga3kzpYhitHuzM4a1RdFRPPstRpi9GjBjmu3DgpDaPglthbGMZ2U7ySIrywM6cyapqx/KDB0rWp9i9WfDpPlf9nO+4uOhjJc7Jt4IlbKbj2oppD1xoUDWwqJIw4dUgigGgXb48CWERMI3UbDUO8H0L4ggn6MBRoEuWsUBonYTAgMBAAECggEAMCH4rfeogwddltb+6j5uwjxu7nCplAfwUu0rla7H+M5TY8qXv+/99KjmnMI+PWdMwDcicejk5dXHtQjToOjZYZjtoipbUep2c2qMI5BndsrX3yhnRfby+8bV/c4KuA7zSze8Pui8LyYnaOyf5b2C4rJxAZeOUFhhRL1oellyPgtXFgoJV7erziKDPQgnyDaXZ9ULO9uUd7FUSz8/uTZgqtoBjz0T+/9KMG3SZDJS6KEhn1dEfCUmudv1Ss2vENzD7xp3hHZjMxsO4FwWiKTNiqvbBwXhA8Dynz8ikPYVFHGmW/h1PtKk62ahj0hZ1vhMqnedMORObFiYAaEmh50agQKBgQDoywRUIqi4daqFUsIPqUwHEJZZ1CXwNwpbPp14wb9O9LDFr9MHRd0oU4lHSiFh3CTnQ4VI86/USnunAvV7FspYf2HU0eVyGVWvxiobxzIXPuYu8TTvZc12VvYPFgLHu4+Jhe44hvmK6dxdGCIwKZOX56pULG6sbUr7FRJYjl+RwQKBgQDGyB8U9nMwR225pqz7heABo4/NpuTjrq9hPu7F7rwV8WyiHzZdryjucYNeCuN04ENydQZCDT62ap+jngX4ZyV2FnxRmmL6IOv1CPInetwdhM5ZlqFE5dGdSNXkmUUCZTJ6oDhkQmfqghAR1C5TxdZzy/DASnxJhnx3ABuEe4pU0wKBgBG0HsgnOp2MlUM+X/PA9D81S7nZIGl8RhVaVa9xTJM8mJTwIiRTc9Y1RCNfx9ohW80anXBG2ABVCcJRv0l1Gj5Qsaf1rnVW5+VONLWYGH8cEXVQcq4iF9YAFwZeridyZCAZR1yVJzUhQ9jwlOkEwGy0+YcdOe1zAljF6XdCnJIBAoGAOTkOyYgQrMtDKPh0P4vQamhdU0RCC9ETp5joP450EpUHQrxdeCaeT9XZjU7xH4oXoHFTtdv+O6ECB6XL7jAzNoVOkGczKvIjOsyyeO8DQnQiuuOD1UObTf3TpRUCKqhbGbXZxfLf20BJw/gixfbjvz3sNk667KeMWO1s/nxZ3AUCgYEAuGIsm5oi90B1c7QXDobPPnhMnr8wVs2whsMCj30acH+OBM+PPlPVcWJMK4VsvTJeILmrCZasUqUoj9E6mR13VXeuhp1MTTzXZZDYO00hj30X2k7C84t8a1lbYW55TjRj6aJ5jMtp6TE64hXjzMPYtSsDYKfa9zPocKMrV9lDLC8=",
	"cert": "MIIDsDCCApgCCQC90NEkVEmOcjANBgkqhkiG9w0BAQsFADCBmTELMAkGA1UEBhMCSU4xEjAQBgNVBAgMCUthcm5hdGFrYTEUMBIGA1UEBwwLU2luZ2FzYW5kcmExEzARBgNVBAoMClJvY2tldGNoYXQxEDAOBgNVBAsMB3NlY3Rpb24xDzANBgNVBAMMBm1hbmlzaDEoMCYGCSqGSIb3DQEJARYZbWFuaXNoa2Frb3RpNjg4QGdtYWlsLmNvbTAeFw0xNzA4MjEwMzU5MjNaFw0xODA4MjEwMzU5MjNaMIGZMQswCQYDVQQGEwJJTjESMBAGA1UECAwJS2FybmF0YWthMRQwEgYDVQQHDAtTaW5nYXNhbmRyYTETMBEGA1UECgwKUm9ja2V0Y2hhdDEQMA4GA1UECwwHc2VjdGlvbjEPMA0GA1UEAwwGbWFuaXNoMSgwJgYJKoZIhvcNAQkBFhltYW5pc2hrYWtvdGk2ODhAZ21haWwuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtMMAOBoH7oMRU+8CSr84CH8dbOqJ4CFksMMGmWQlBSdGBRrS9RE8OnxbzDMJIk44h5rCgWfqvV2hL/aA+L7bOtCt2fJhB28vxvqjmPfnG8Yulz+C35GUsAD2/NEyZEbfzXanp3fpOyNn80Rqp1e4ECf0rO8dJarLA9a1SK/eT6CW4Gt5M6WIYrR7szOGtUXRUTz7LUaYvRowY5rtw4KQ2j4JbYWxjGdlO8kiK8sDOnMmqasfygwdK1qfYvVnw6T5X/ZzvuLjoYyXOybeCJWym49qKaQ9caFA1sKiSMOHVIIoBoF2+PAlhETCN1Gw1DvB9C+IIJ+jAUaBLlrFAaJ2EwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAyHxQuTwu2cCYV5y4WjqbVvtossDlJ0t1GIanMm5U57nv/I6tlm0z0G7qOeK1fynhaNAlaIMedFNO2TzzAjIULBXEdyPj/CI1g1DqkiV7dKnBa9bYBvbDSQZRWMQGR6L6kfaTqqgXsF9lpVBB2jr4nktEUKHYTHydc5jiZRCko1N46iWajAwq8wbH/ub+Hhk4LZ2lIdZAxofaLqRjiHMj/ecGVL5JE1smbT9lHp0xbwZ3pnipWtYpGJ8ee2+EOPdmiovO0VQ8SUDUCZIfhS2ftaa7uCc7n4Vl3EqCFsmx3zrvqGlFtPmclpQdMVMq4LmkdDIHt5ymjN6FGN32mFBnI"
	//"sig": "\"7vt4vP/w8zYB3Zg77nuTPwie3TxEy2OHZQMsSa4nsXZzL4/qw+DguXbyMy3BF77XvSJmBt+Gw+fU6T4HId7fBg\"
};

var bodyString = JSON.stringify({
    'username': 'thefourtheye'
});

var options = {
	
     	method: "GET",
	path: "/_matrix/federation/v1/query/directory?room_alias=!xUmIwqsJKyZMobSsOb:matrix.org",
	host: "matrix.org",
	headers: headersOpt
 
}; 

/*var opts = {
	
	method: 'PUT',
	host: 'localhost',
	port: 8448,
	path: '/_matrix/federation/v1/send/HTTP/1.1',
	headers: headersOpt
	
}; */

console.log('Start');
console.log("Federating to matrix......");



var x = https.request(options, function(res){
    console.log('Connected');
    res.on('data', function(data){
        console.log(data);
	console.log(String.fromCharCode.apply(null, new Uint16Array(data)));
	
    });

});
x.end();
/*console.log("Posting data to Matrix instance....");
var callback = function(response) {
var str = 'ok ok';

response.on('data', function(chunk) {
str += chunk;
});

response.on('end', function() {
console.log(str);
});
};

https.request(opts, callback).write(bodyString); */
