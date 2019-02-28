const ffmpeg = require("ffmpeg.js/ffmpeg-mp4.js");
const dummyJpg = require("./dummy-jpg.js");

module.exports = (duration) => {
	const jpegBuffer = dummyJpg();
	let stdout = "";
	let stderr = "";

	const results = ffmpeg(
		{
			MEMFS: [
				{
					name: 'dummy.jpg',
					data: jpegBuffer,
				}
			],
			arguments: [
				'-loop',
				'1',
				'-i',
				'dummy.jpg',
				'-t',
				`${duration}`,
				'-pix_fmt',
				'yuv420p',
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
		}
	);

	return results.MEMFS[0].data;
}