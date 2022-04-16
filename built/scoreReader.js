// import * as fs from 'fs'; 
// export function getHighScores(fname, players) {
// 	let fScores = processFileScores(fname);
// 	let pScores = processPlayerScores(players);
// 	let scores = Object.assign({}, fScores, pScores);
// 	let highScores = getHighestScores(scores);
// 	// let lineW = highScores[0][0] + " " + highScores[0][1] + "\n";
// 	// lineW +=  highScores[1][0] + " " + highScores[1][1] + "\n";
// 	// lineW += highScores[2][0] + " " + highScores[2][1];
// 	//console.log(highScores);
// 	let s = buildString(highScores);
// 	if(s !== undefined){
// 		fs.writeFile(fname, s, function (err) {
//   			if (err) 
//   				throw err;
//   			//console.log('Replaced!');
// 		});
// 	}
// 	// update the high score file
// 	// send name: score pairs to server.js to updat DOM
// }
// function processFileScores(fname) {
// 	let fileScores = {};
// 	try {
//     	const data = fs.readFileSync(fname, 'UTF-8');
//     	const lines = data.split(/\r?\n/);
//     	lines.forEach((line) => {
// 			let ns_pair = line.split(" ");
// 			fileScores[ns_pair[0]] = parseInt(ns_pair[1]);    	
// 		});
// 	} 
// 	catch (err) {
//     	console.error(err);
// 	}
// 	return fileScores;
// }
// function processPlayerScores(players) {
// 	let playerScores = {};
// 	for(let p in players) {
// 		let n = players[p].name;
// 		let s = players[p].bounces / 2;
// 		playerScores[n] = s;
// 	}
// 	return playerScores;
// }
// // TODO: this sometimes returns { '': NaN }. Find out why so I can get rid of the conditional in buildstring
// function getHighestScores(scores) {
// 	let sArr = [];
// 	for (let s in scores) {
// 		if(s !== '')
// 	    	sArr.push([s, scores[s]]);
// 	}
// 	sArr.sort(function(a, b) {
//     	return b[1] - a[1];
// 	});
// 	sArr.splice(3); 
// 	let scoresSorted = {};
// 	sArr.forEach(function(item){
//     	scoresSorted[item[0]]=item[1];
//     })
//     return scoresSorted;
// }
// function buildString(highScores) {
// 	if(Object.keys(highScores)[0] === undefined || Object.keys(highScores)[1] === undefined || Object.keys(highScores)[2] === undefined){
// 		return;
// 	}
// 	let lineW = "";
// 	lineW += Object.keys(highScores)[0].toString() + " " + highScores[Object.keys(highScores)[0].toString()] + "\n";
// 	lineW += Object.keys(highScores)[1].toString() + " " + highScores[Object.keys(highScores)[1].toString()] + "\n";
// 	lineW += Object.keys(highScores)[2].toString() + " " + highScores[Object.keys(highScores)[2].toString()];
// 	return lineW;
// }
// function writeFileScores(fname, item) {
// 	console.log("writing...");
// 	fs.writeFile(fname, item, err => {
//   		if (err) {
//     		console.error(err);
//     		return;
//   		}
// 	})
// }
//# sourceMappingURL=scoreReader.js.map