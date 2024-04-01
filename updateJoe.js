let fs = require("fs");


// Provide lists of Joints, Segments and Sites from HAnim.py from X3DUOM

function readHAnimNodes() {
	let data = fs.readFileSync(__dirname + '/HAnimAll.txt').toString();
	let lines = data.split(/[\r\n]+/);
	// console.error(lines);
	var jointMap = {};
	var siteMap = {};
	var segmentMap = {};
	let jointStart = false;
	let siteStart = false;
	let segmentStart = false;
	let joint = null;
	let site = null;
	let segment = null;

	for (let l in lines) {
		let line = lines[l];
		// console.error(line);
		let columns = line.split(/[ \t,]+/);
		if (line.startsWith("Joints")) {
			console.error("Started Joints");
			jointStart = true;
			siteStart = false;
			segmentStart = false;
		}
		if (line.startsWith("Segments")) {
			console.error("Started Segments");
			jointStart = false;
			siteStart = false;
			segmentStart = true;
		}
		if (line.startsWith("Sites")) {
			console.error("Started Sites");
			jointStart = false;
			siteStart = true;
			segmentStart = false;
		}
		if (jointStart) {
			if (line.trim() === "") {
				jointStart = false;
			} else if (line.startsWith("-----")) {
				joint = null;
			} else if (columns[0] === "X:") {
				jointMap[joint].x = columns[1];
			} else if (columns[0] === "Y:") {
				jointMap[joint].y = columns[1];
			} else if (columns[0] === "Z:") {
				jointMap[joint].z = columns[1];
			} else if (columns[0] === "Parent:") {
				jointMap[joint].parent = columns[1];
			} else if (columns[0] === "Alias:") {
				for (let alias = 1; alias < columns.length; alias++) {
					jointMap[column[alias]] = jointMap[joint];
				}
			} else if (columns[0] === "Index:") {
				jointMap[joint].index = columns[1];
			} else if (columns[0] === "Type:") {
				if (columns[1] === "segment" || columns[1] === "site") {
					console.error("Stopped Joints");
					jointStart = false;
					joint = null;
				} else if (columns[1] === "joint") {
					// console.error("Started Joints");
					jointStart = true;
				}
			} else {
				// found a joint!
				joint = columns[0];
				jointMap[joint] = {};
			}
		}
		if (siteStart) {
			if (line.trim() === "") {
				siteStart = false;
			} else if (line.startsWith("-----")) {
				site = null;
			} else if (columns[0] === "X:") {
				siteMap[site].x = columns[1];
			} else if (columns[0] === "Y:") {
				siteMap[site].y = columns[1];
			} else if (columns[0] === "Z:") {
				siteMap[site].z = columns[1];
			} else if (columns[0] === "Parent:") {
				siteMap[site].parent = columns[1];
			} else if (columns[0] === "Alias:") {
				for (let alias = 1; alias < columns.length; alias++) {
					siteMap[column[alias]] = siteMap[site];
				}
			} else if (columns[0] === "Index:") {
				siteMap[site].index = columns[1];
			} else if (columns[0] === "Type:") {
				if (columns[1] === "segment" || columns[1] === "joint") {
					console.error("Stopped Sites");
					siteStart = false;
					site = null;
				} else if (columns[1] === "site") {
					// console.error("Started Sites");
					siteStart = true;
				}
			} else {
				// found a site!
				site = columns[0];
				siteMap[site] = {};
			}
		}
		if (segmentStart) {
			if (line.trim() === "") {
				segmentStart = false;
			} else if (line.startsWith("-----")) {
				segment = null;
			} else if (columns[0] === "Parent:") {
				segmentMap[segment].parent = columns[1];
			} else if (columns[0] === "Alias:") {
				for (let alias = 1; alias < columns.length; alias++) {
					segmentMap[column[alias]] = segmentMap[site];
				}
			} else if (columns[0] === "Index:") {
				segmentMap[segment].index = columns[1];
			} else if (columns[0] === "Type:") {
				if (columns[1] === "site" || columns[1] === "joint") {
					console.error("Stopped Segments");
					segmentStart = false;
					segment = null;
				} else if (columns[1] === "segment") {
					// console.error("Started Segments");
					segmentStart = true;
				}
			} else {
				// found a segment!
				segment = columns[0];
				segmentMap[segment] = {};
			}
		}
	}
	return { jointMap: jointMap, siteMap: siteMap, segmentMap: segmentMap };
}

module.exports = readHAnimNodes;
