'use strict';
let fs = require("fs");
// let content = fs.readFileSync(__dirname + '/NewHAnim2.json').toString();


let prevobj = { "indentLength": -2, "parent": undefined, "type": "humanoid" };
let rootobj = undefined;

function buildHierarchy(obj, prevobj) {
	// set up parent
	obj.previous = prevobj;
	let parent = undefined;
	if (obj.indentLength === obj.previous.indentLength && obj.previous.type === "site") {
		// assume sibling's parent
		parent = obj.previous.parent;
	} else if (obj.indentLength > obj.previous.indentLength) {
		// the previous node is my parent
		parent = obj.previous;
	} else {
		// we'll have to search backwards
		parent = obj.previous.parent;
		while (parent.indentLength >= obj.indentLength) {  // keep spinning until we find something
			// if (parent.indentLength > obj.indentLength) {
				parent = parent.parent;
			// } else if (parent.type === "segment" && obj.type === "joint") { // parent.indentLength === obj.indentLength.
				// break;  // segment is parent of joint
			// }
		}	
	}
	obj.parent = parent;
	console.error(" ".repeat(parent.indentLength < 0 ? 0 : parent.indentLength), "parent", parent.type, parent[parent.type]);
	console.error(" ".repeat(obj.indentLength < 0 ? 0 : obj.indentLength), "child", obj.type, obj[obj.type]);
	return obj;
}

function createLink(obj, prevobj, prevParent) {
	if (typeof prevobj.parent !== 'undefined') {
		console.error("Found from", obj.From, prevobj.parent[prevobj.parent.type]);
	
	//if (obj.From === prevobj.parent[prevobj.parent.type]) {
	}
}

function processLines(linearray) {
	for (let line in linearray) {
		let lineobj = linearray[line];
		let linestr = Object.keys(lineobj)[0];
		if (typeof linestr !== 'undefined') {
			let obj = lineobj[linestr];
			switch (obj.type) {
				case "joint":
					prevobj = buildHierarchy(obj, prevobj);
					// first time through, set root
					if (typeof rootobj === 'undefined') {
						rootobj = obj;
					}
					break;
				case "segment":
					prevobj = buildHierarchy(obj, prevobj);
					break;
				case "site":
					console.error("processLines", obj[obj.type], obj.type);
					prevobj = buildHierarchy(obj, prevobj);
					break;
				case "link":
					createLink(obj, prevobj, prevobj.parent);
					break;
				default:
					// console.error(obj);
					// ignore
			}
			if (typeof obj.parent !== 'undefined') {
				if (typeof obj.parent.children === 'undefined') {
					obj.parent.children = [];
				}
				obj.parent.children.push(obj);
			}
		}
	}
}

function fmtAxis(node, axis) {
	if (isNaN(node[node.type+axis])) {
		return 0;
	} else {
		return node[node.type+axis];
	}
}
function fmtCoord(field, node) {
	let x = fmtAxis(node, "X");
	let y = fmtAxis(node, "Y");
	let z = fmtAxis(node, "Z");
	if (x === 0 && y === 0 && z === 0) {
		console.error("Potential test failure. check node!"+" "+field+" "+x+" "+y+" "+z+" # test "+node.type+" "+node[node.type]+" "+field+" "+node[node.type+"X"]+" "+node[node.type+"Y"]+" "+node[node.type+"Z"]);
	}
	return field+" "+x+" "+y+" "+z;
}

function fmtJoint(field, segment) {
	let parentJoint = segment.parent;
	console.error("Found", parentJoint.type, parentJoint[parentJoint.type], "parent of", segment.type, segment[segment.type]);
	segment["segmentX"] = parentJoint["jointX"]
	segment["segmentY"] = parentJoint["jointY"]
	segment["segmentZ"] = parentJoint["jointZ"]
	return fmtCoord(field, segment);
}

function printHier (node, indent, approved, joints, segments, sites, parent) {
	if (typeof node !== 'undefined') {
		// console.error(node.type, node[node.type]);
		var nodeFailed = false;
			try { 
				switch (node.type) {
					case "joint":
						// console.log("HAnimJoint", node[node.type], fmtCoord("center", node));
						joints.push(node[node.type]);
						break;
					case "segment":
						// console.log("HAnimSegment", node[node.type], fmtJoint("translation", node));
						segments.push(node[node.type]);
						break;
					case "site":
						// console.log("HAnimSite", node[node.type], fmtCoord("translation", node));
						sites.push(node[node.type]);
						
						break;
					default:
						// console.log(node);
						// ignore
				}
			} catch (e) {
				console.error(node.type, node[node.type], "error, not added.  Detail:", e);
				nodeFailed = true;
			}
		if (typeof node.children !== 'undefined') {
			for (let ch in node.children) {
				// console.log(" ".repeat(indent), node[child.type])
				printHier(node.children[ch], indent+2, approved, joints, segments, sites, node);
			}
		}
	} else {
		// console.error("No hierarchy!");
	}
}


function getApprovedNodes() {
	let content = fs.readFileSync(__dirname + '/Lily73Final0823Test4.x3dv').toString();

	let approvedNodes = new Set();
	let lines = content.split(/\r?\n/);
	let jointPattern = /HAnimJoint/;
	let segmentPattern = /HAnimSegment/;
	let sitePattern = /HAnimSite/;
	let namePattern = /name[\t ]+['"]([^'"]+)['"]/;
	let nodeFound = false;
	let approvedNode = undefined;
	for (let l in lines) {
		let line = lines[l].trim();
		let joint = line.match(jointPattern);
		let segment = line.match(segmentPattern);
		let site = line.match(sitePattern);
		let name = line.match(namePattern);
		if (joint != null || segment != null || site != null) {
			nodeFound = true;
		}
		if (name != null) {
			let approved = name[1];
			if (nodeFound === true) {
				approvedNodes.add(approved);
				// console.error("Approved!", approved);
			} else {
				console.error("Not approved!", approved);
			}
			nodeFound = false;
		}
	}
	return approvedNodes;
}

var content = '';
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });
process.stdin.on('end', function() {
	let linearray = JSON.parse(content);
	processLines(linearray);
	let approved = getApprovedNodes();
	let joints = [];
	let segments = [];
	let sites = [];
	printHier(rootobj, 0, approved, joints, segments, sites, undefined);
	fs.writeFileSync(__dirname + '/Joints.py', 'JOINTS = [\n"'+joints.join('",\n"')+'"\n]\n', 'utf8');
	fs.writeFileSync(__dirname + '/Segments.py', 'SEGMENTS = [\n"'+segments.join('",\n"')+'"\n]\n', 'utf8');
	fs.writeFileSync(__dirname + '/Sites.py', 'SITES = [\n"'+sites.join('",\n"')+'"\n]\n', 'utf8');
});
