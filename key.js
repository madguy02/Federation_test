var nacl = require('tweetnacl');

function GenerateSigningKey(version) {
var key = nacl.sign.keyPair();
key.version = version;
return key;
}

function GetVerifyKey(signing_key) {
var verify_key = signing_key.verify_key;
verify_key = signing_key.version;
return verify_key;
}

function DecodeSigningKeyBase64(key_base64) {
var key_bytes = new Buffer(key_base64, 'base64').toString('ascii');
var key = nacl.sign.keyPair(key_bytes);
return key;
}

function EncodeSigningKeyBase64(key) {
var encoded = new Buffer(key).toString('base64');
return Buffer(key).toString('base64');
}

function EncodeVerifyKeyBase64(key) {
var encoded = new Buffer(key).toString('base64');
return encoded;
}

function IsSigningSupportedAlgorithm(key_id) {
if (key_id.startswith("ed25519" + ":")) {
return true;
}
else{
return false;
}
	}

function DecodeVerifyKeyBytes(key_id, key_bytes) {
if (key_id.startswith("ed25519"+ ":")) {
 var key = nacl.signing.VerifyKey(key_bytes);
key.version = version;
return key;


	}
}

function ReadSigningKeys(stream) {
var keys = [];
for (line in stream) {
key_base64 = line.split();
key = new Buffer(key_base64, 'base64').toString('ascii');
keys.append(key);
	}
}

function WriteSigningKeys(stream, keys) {
for (key in keys) {
key_base64 = new Buffer(key, 'base64').toString('ascii');
stream.write(" %s\n" % ( key_base64));
}
}
var my_version = "my_version";
var key = GenerateSigningKey(my_version);
console.log(key);
var newkey = key.toString('utf-8');

var key_base64 = EncodeSigningKeyBase64(newkey);
var verify_key = GetVerifyKey(key);
console.log(key_base64);
console.log(verify_key);

var newkeybase64 = key_base64.toString('utf-8');
var decoder = DecodeSigningKeyBase64(newkeybase64);
console.log(decoder);

//var signing_key_seed = DecodeSigningKeyBase64("YJDBA9Xnr2sVqXD9Vj7XVUnmFZcZrlw8Md7kMW+3XA1");
var seed = "YJDBA9Xnr2sVqXD9Vj7XVUnmFZcZrlw8Md7kMW+3XA1";
var b = new Buffer(seed,"base64");
var s = b.toString();
console.log(s);
var setup = nacl.sign.keyPair.fromSeed(b).toString();

console.log(setup);
//console.log(signing_key_seed);


