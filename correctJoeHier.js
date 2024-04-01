var content = '';
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });
process.stdin.on('end', function() {

	let lines = content.split(/\r?\n/);

	let lineBuffer = [];

	function printSite(site, id, match) {
		lineBuffer.push(site[1]+"("+site[2]+" "+site[3]+" "+site[4]+" "+site[5]+")"+site[6]+id);
		// console.error(site[1]+"("+site[2]+" "+site[3]+" "+site[4]+" "+site[5]+")"+site[6]+id);
		// console.error("_"+site[6]+"_", match);
	}

	for (let l in lines) {
		let line = lines[l];
		line = line.replace(/[ \t]+$/, "");
		let jbs = /#[JBS][0-9]+[ \t]*$/g;
		let sn = line.match(jbs);
		let jbsAlpha = /#[JBS][A-Za-z]+1?[ \t]*$/g;
		let snAlpha = line.match(jbsAlpha);
		let id = "";
		let extraId = "";
		let jbsi = "";
		if (sn !== null) {
			jbsi = sn[0][1];
			id = sn[0].trim();
		}
		if (snAlpha !== null) {
			jbsi = snAlpha[0][1];
			id = snAlpha[0].trim();
			extraId = "_"+l;
			// console.error("Hey",jbsi, id+extraId);
		}
		if (!line.trim().startsWith("joint") && !line.trim().startsWith("segment") && !line.trim().startsWith("(segment") && (sn !== null || snAlpha !== null)) {
			let sitePattern = /([^a-z_0-9]+)\(([a-z_0-9]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)\)([ \t]*)/;
			let site = line.match(sitePattern);
			let sitePattern2 = /([^a-z_0-9]+)\(([a-z_0-9]+)\)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)([ \t]*)/;
			let site2 = line.match(sitePattern2);
			let sitePattern3 = /([^a-z_0-9]+)\(([a-z_0-9]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)([ \t]*)/;
			let site3 = line.match(sitePattern3);
			if (site !== null && jbsi === "S") {
				printSite(site, id+extraId, "site1");
			} else if (site2 !== null && jbsi === "S") {
				printSite(site2, id+extraId, "site2");
			} else if (site3 !== null && jbsi === "S") {
				printSite(site3, id+extraId, "site3");
			} else {
				let jointPattern = /([^a-z_0-9]*)([a-z_0-9]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)/;
				let joint = line.match(jointPattern);
				if (joint !== null && jbsi === "J") {
					lineBuffer.push(line+extraId);
				} else {
					let bonePattern = /([^a-z_0-9]+)([a-z_0-9]+)/;
					let bone = line.match(bonePattern);
					if (bone !== null && jbsi === "B") {
						lineBuffer.push(line+extraId);
					} else {
						console.error("?",l,line);
						lineBuffer.push(line);
					}
				}
			}
		} else {
			let hierPattern = /\[(.*) to (.*)\]/;
			let link = line.match(hierPattern);
			if (link !== null) {
				lineBuffer.push(line+extraId);
			} else if (line.trim() === "") {
				lineBuffer.push(line);
			} else {
				console.error("?",l,line);
				lineBuffer.push(line);
			}
		}
	}
	try {
		let result = lineBuffer.join("\r\n");
		console.log(result);
		// fs.writeFileSync(__dirname + '/NewHAnim2.txt', result, 'utf8');
	} catch (e) {
		console.error(e);
	}
});
