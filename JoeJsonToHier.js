let fs = require("fs");
var content = '';
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });
process.stdin.on('end', function() {
	let lines = content.split(/\r?\n/);
	// let content = fs.readFileSync(__dirname + '/NewHAnim3.json').toString();

	let linearray = JSON.parse(content);

	function ntrim(number, dd) {
		if (typeof dd === 'undefined') {
			dd = 4;
		}
		if (isNaN(number)) {
			return number;
		} else {
			// return parseFloat(number).toFixed(dd);
			return number;
		}
	}

	function cr(line) {
		console.log(line+"\r");
	}
	cr("New version by John Carlson 08/29/2023");

	for (let line in linearray) {
		let lineobj = linearray[line];
		let linestr = Object.keys(lineobj)[0];
		if (typeof linestr !== 'undefined') {
			obj = lineobj[linestr];
			if (typeof obj.indentString === 'undefined') {
				cr(obj.line);
			} else {
				let newline = "";
				switch (obj.type) {
					case "joint":
						newline += obj.indentString+obj[obj.type]+"  "+ ntrim(obj.jointX)+" "+ntrim(obj.jointY)+" "+ntrim(obj.jointZ);
						newline += " ".repeat(131 - newline.length)
						break;
					case "segment":
						newline += obj.indentString+obj[obj.type];
						newline += " ".repeat(132 - newline.length)
						break;
					case "site":
						newline += obj.indentString+"("+obj[obj.type]+"  "+ntrim(obj.siteX)+" "+ntrim(obj.siteY)+" "+ntrim(obj.siteZ)+")";
						newline += " ".repeat(133 - newline.length)
						break;
					case "link":
						newline += obj.indentString+"["+obj.From+" "+"to"+" "+obj.To+"]";
						break;
					default:
						newline += obj.line;
				}
				if (obj.id) {
					newline += "#"+obj.id
					cr(newline);
				} else {
					cr(obj.line);
				}
			}
		}
	}
});
