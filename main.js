const fs = require("fs");
const ffmpeg = require("ffmpeg.js/ffmpeg-mp4.js");

module.exports = (duration) => {
	let stdout = "";
	let stderr = "";
	const results = ffmpeg({
		MEMFS: [
			{
				name: 'dummy.jpg',
				data: new Uint8Array(fs.readFileSync("dummy.jpg"))
			}
		],
		arguments: [
			'-loop',
			'1',
			'-i',
			'dummy.jpg',
			'-t',
			duration,
			'-r',
			'1',
			'-c:v',
			'libx264',
			'output.mp4'
		],
		print: function (data) {
			stdout += data + "\n";
		},
		printErr: function (data) {
			stderr += data + "\n";
		},
		onExit: function (code) {
			console.log("Process exited with code " + code);
			console.log(stdout);
			console.log(stderr);
		},
	});

	return results.MEMFS[0].data;
}