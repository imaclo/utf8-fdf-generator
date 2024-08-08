var fs = require('fs');
var iconv = require('iconv-lite');

exports.generator = function(data, fileName) {
  var header, body, footer, dataKeys;

  header = Buffer([]);
  header = Buffer.concat([ header, Buffer.from("%FDF-1.2\n") ]);
  header = Buffer.concat([ header, Buffer.from((String.fromCharCode(226)) + (String.fromCharCode(227)) + (String.fromCharCode(207)) + (String.fromCharCode(211)) + "\n") ]);
  header = Buffer.concat([ header, Buffer.from("1 0 obj \n") ]);
  header = Buffer.concat([ header, Buffer.from("<<\n") ]);
  header = Buffer.concat([ header, Buffer.from("/FDF \n") ]);
  header = Buffer.concat([ header, Buffer.from("<<\n") ]);
  header = Buffer.concat([ header, Buffer.from("/Fields [\n") ]);

  footer = Buffer([]);
  footer = Buffer.concat([ footer, Buffer.from("]\n") ]);
  footer = Buffer.concat([ footer, Buffer.from(">>\n") ]);
  footer = Buffer.concat([ footer, Buffer.from(">>\n") ]);
  footer = Buffer.concat([ footer, Buffer.from("endobj \n") ]);
  footer = Buffer.concat([ footer, Buffer.from("trailer\n") ]);
  footer = Buffer.concat([ footer, Buffer.from("\n") ]);
  footer = Buffer.concat([ footer, Buffer.from("<<\n") ]);
  footer = Buffer.concat([ footer, Buffer.from("/Root 1 0 R\n") ]);
  footer = Buffer.concat([ footer, Buffer.from(">>\n") ]);
  footer = Buffer.concat([ footer, Buffer.from("%%EOF\n") ]);

  dataKeys = Object.keys(data);

  body = Buffer([]);

  for(var i=0; i<dataKeys.length; i++) {
    var name = dataKeys[i];
    var value = data[name];

    body = Buffer.concat([ body, Buffer.from("<<\n") ]);
    body = Buffer.concat([ body, Buffer.from("/T (") ]);
    body = Buffer.concat([ body, iconv.encode(name.toString(), 'UTF-16') ]);
    body = Buffer.concat([ body, Buffer.from(")\n") ]);
    body = Buffer.concat([ body, Buffer.from("/V (") ]);
    body = Buffer.concat([ body, iconv.encode(value.toString(), 'UTF-16') ]);
    body = Buffer.concat([ body, Buffer.from(")\n") ]);
    body = Buffer.concat([ body, Buffer.from(">>\n") ]);
  }

  fs.writeFileSync(fileName, Buffer.concat([ header, body, footer ]));
}
