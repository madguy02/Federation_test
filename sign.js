function SignJson(json_object, signature_name, signing_key) {
var signatures = json_object.pop("signatures", {});
var unsigned = json_object.pop("unsigned", None);
var data = JSON.parse(JSON.stringify(json_object).replace(/"\s+|\s+"/g, '"'));
var message_bytes = data;
var signed = signing_key.sign(message_bytes);
var signature_base64 = new Buffer(signed.signature, "base64");


}
