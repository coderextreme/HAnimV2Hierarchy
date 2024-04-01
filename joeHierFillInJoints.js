// let fs = require("fs");
// let content = fs.readFileSync(__dirname + '/NewHAnim2.txt').toString();
let readHAnimNodes = require("./updateJoe.js");

let nodes = readHAnimNodes();
let jointMap = nodes.jointMap;
let siteMap = nodes.siteMap;
let segmentMap = nodes.segmentMap;

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
				/*
				if (site[3] === "x") {
					site[3] = "0";
				}
				if (site[4] === "y") {
					site[4] = "0";
				}
				if (site[5] === "z") {
					site[5] = "0";
				}
				*/
				if (typeof siteMap[site[2]] !== 'undefined') {
					console.error("site", site[2], "x", site[3], "y", site[4], "z", site[5]);
					if (site[3] !== siteMap[site[2]].x && site[3] === "x" && siteMap[site[2]].x !== "x") {
						console.error("updating site", site[2], "X value", "from", '"'+site[3]+'"', "to", siteMap[site[2]].x);
						site[3] = siteMap[site[2]].x;
					}
					if (site[4] !== siteMap[site[2]].y && site[4] === "y" && siteMap[site[2]].y !== "y") {
						console.error("updating site", site[2], "Y value", "from", '"'+site[4]+'"', "to", siteMap[site[2]].y);
						site[4] = siteMap[site[2]].y;
					}
					if (site[5] !== siteMap[site[2]].z && site[5] === "z" && siteMap[site[2]].z !== "z") {
						console.error("updating site", site[2], "Z value", "from", '"'+site[5]+'"', "to", siteMap[site[2]].z);
						site[5] = siteMap[site[2]].z;
					}
					if ("#S"+siteMap[site[2]].index !== "#"+id) {
						console.error("For", site[2], "conflict between Joe, #"+id, "and X3DUOM", "#S"+siteMap[site[2]].index);
					}
				} else {
					console.error("Can't find site", site[2], "in X3DUOM data. this = joeHierFillInJoints");
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
					if (typeof jointMap[joint[2]] !== 'undefined') {
						console.error("joint Joe", joint[2], "x", joint[3], "y", joint[4], "z", joint[5]);
						let jm = jointMap[joint[2]];
						console.error("jointMap X3DOM", "x", jm.x, "y", jm.y, "z", jm.z);
						if (joint[3] !== jm.x && joint[3] === "x" && jm.x !== "x") {
							console.error("updating joint", joint[2], "X value", "from", '"'+joint[3]+'"', "to", jm.x);
							joint[3] = jm.x;
						}
						if (joint[4] !== jm.y && joint[4] === "y" && jm.y !== "y") {
							console.error("updating joint", joint[2], "Y value", "from", '"'+joint[4]+'"', "to", jm.y);
							joint[4] = jm.y;
							/*
						} else {
							console.error("Not updating joint Joe", joint[2], "x", joint[3], "y", joint[4], "z", joint[5]);
							console.error("Not updating jointMap X3DOM", "x", jm.x, "y", jm.y, "z", jm.z);
							*/
						}
						if (joint[5] !== jm.z && joint[5] === "z" && jm.z !== "z") {
							console.error("updating joint", joint[2], "Z value", "from", '"'+joint[5]+'"', "to", jm.z);
							joint[5] = jm.z;
						}
						if ("#J"+jm.index !== "#"+id) {
							console.error("For", joint[2], "conflict between Joe, #"+id, "and X3DUOM", "#J"+jm.index);
						}
					} else {
						console.error("Can't find joint", joint[2], "in X3DUOM data. this = joeHierFillInJoints");
					}
					toJSONString(lineBuffer, "type", "joint");
					toJSONString(lineBuffer, "joint", joint[2]);
					toJSONNumber(lineBuffer, "jointX", joint[3]);
					toJSONNumber(lineBuffer, "jointY", joint[4]);
					toJSONNumber(lineBuffer, "jointZ", joint[5]);
				} else {
					let bonePattern = /([^a-z_0-9]+)([a-z_0-9]+)/;
					let bone = line.match(bonePattern);
					if (bone !== null && jbsi === "B") {
						if (typeof segmentMap[bone[2]] !== 'undefined') {
							if ("#B"+segmentMap[bone[2]].index !== "#"+id) {
								console.error("For", bone[2], "conflict between Joe, #"+id, "and X3DUOM", "#B"+segmentMap[bone[2]].index);
							}
						} else {
							console.error("Can't find bone", bone[2], "in X3DUOM data. this = joeHierFillInJoints");
						}
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
