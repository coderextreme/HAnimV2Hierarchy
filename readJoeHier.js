// let fs = require("fs");
// let content = fs.readFileSync(__dirname + '/NewHAnim2.txt').toString();

let readHAnimNodes = require("./updateJoe.js");

let jointMap = readHAnimNodes().jointMap;

// console.log(jointMap);
function toJSONString(buffer, property, value) {
	buffer.push('"'+property+'" : "'+value+'"');
}

function toJSONNumber(buffer, property, value) {
	if (isNaN(value)) {
		toJSONString(buffer, property, value);
	} else {
		buffer.push('"'+property+'" : '+value);
	}
}

var content = '';
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });
process.stdin.on('end', function() {
	let lines = content.split(/\r?\n/);
	let linesBuffer = [];

	for (let l in lines) {
		let line = lines[l];
		// console.error("ORIGINAL", line);
		let jbs = /#[JBS][0-9A-Za-z_]+1?[ \t]*$/g;
		let sn = line.match(jbs);
		// console.error(sn);
		let indentPattern = /^([^A-Za-z_0-9\(\[]+)/;
		let indent = line.match(indentPattern);
		let lineBuffer = [];
		toJSONString(lineBuffer, "line", line);
		if (indent !== null) {
			toJSONString(lineBuffer, "indentString", indent[0]);
			toJSONNumber(lineBuffer, "indentLength", indent[0].length);
		}
		if (line.startsWith("humanoid_root")) {
			toJSONString(lineBuffer, "line", line);
			toJSONString(lineBuffer, "indentString", "");
			toJSONNumber(lineBuffer, "indentLength", 0);
		}
		if (!line.trim().startsWith("joint") && !line.trim().startsWith("segment") && !line.trim().startsWith("(segment") && sn !== null) {
			let jbsi = sn[0][1];
			let id = sn[0].substring(1);
			toJSONString(lineBuffer, "id", id);
			let sitePattern = /([^a-z_0-9]+)\(([a-z_0-9]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]*\)/;
			let site = line.match(sitePattern);
			//let sitePattern2 = /([^a-z_0-9]+)\(([a-z_0-9]+)\)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]*/;
			//let site2 = line.match(sitePattern2);
			//let sitePattern3 = /([^a-z_0-9]+)\(([a-z_0-9]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]*/;
			//let site3 = line.match(sitePattern3);
			if (site !== null && jbsi === "S") {
				if (site[3] === "x") {
					site[3] = "0";
				}
				if (site[4] === "y") {
					site[4] = "0";
				}
				if (site[5] === "z") {
					site[5] = "0";
				}
				toJSONString(lineBuffer, "type", "site");
				toJSONString(lineBuffer, "site", site[2]);
				toJSONNumber(lineBuffer, "siteX", site[3]);
				toJSONNumber(lineBuffer, "siteY", site[4]);
				toJSONNumber(lineBuffer, "siteZ", site[5]);
			} else {
				let jointPattern = /([^a-z_0-9]*)([a-z_0-9]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)/;
				let joint = line.match(jointPattern);
				if (joint !== null && jbsi === "J") {
					/*
					if (joint[3] === "x") {
						joint[3] = "0";
					}
					if (joint[4] === "y") {
						joint[4] = "0";
					}
					if (joint[5] === "z") {
						joint[5] = "0";
					}
					*/
					toJSONString(lineBuffer, "type", "joint");
					toJSONString(lineBuffer, "joint", joint[2]);
					toJSONNumber(lineBuffer, "jointX", joint[3]);
					toJSONNumber(lineBuffer, "jointY", joint[4]);
					toJSONNumber(lineBuffer, "jointZ", joint[5]);
					if (typeof jointMap[joint[2]] !== 'undefined') {
						// console.error(joint[2], jointMap[joint[2]]);
						if (joint[3] !== jointMap[joint[2]].x) {
							console.error("update", joint[2], "X value", "from", '"'+joint[3]+'"', "to", jointMap[joint[2]].x, "?");
						}
						if (joint[4] !== jointMap[joint[2]].y) {
							console.error("update", joint[2], "Y value", "from", '"'+joint[4]+'"', "to", jointMap[joint[2]].y, "?");
						}
						if (joint[5] !== jointMap[joint[2]].z) {
							console.error("update", joint[2], "Z value", "from", '"'+joint[5]+'"', "to", jointMap[joint[2]].z, "?");
						}
					} else {
						console.error("Can't find", joint[2], "in X3DUOM data. In JoeJsonToVRML.js");
					}
				} else {
					let bonePattern = /([^a-z_0-9]+)([a-z_0-9]+)/;
					let bone = line.match(bonePattern);
					if (bone !== null && jbsi === "B") {
						toJSONString(lineBuffer, "type", "segment");
						toJSONString(lineBuffer, "segment", bone[2]);
					} else {
						console.error("what's this "+l+" ?_",line);
					}
				}
			}
		} else {
			let hierPattern = /\[(.*) to (.*)\]/;
			let link = line.match(hierPattern);
			if (link !== null) {
				toJSONString(lineBuffer, "Joint to Joint/Segment (TBD), need Joint to Joint as well", "");
				toJSONString(lineBuffer, "type", "link");
				toJSONString(lineBuffer, "From", link[1]);
				toJSONString(lineBuffer, "To", link[2]);
			} else {
				console.error("what's this "+l+" ?-",line);
			}
		}
		linesBuffer.push('{ "Line '+l+'": {'+lineBuffer.join(",")+'}}');
	}
	let result = "["+linesBuffer.join(",\r\n")+"]\r\n";
	console.log(result);
	//fs.writeFileSync(__dirname + 'NewHAnim2.json', result);
});
