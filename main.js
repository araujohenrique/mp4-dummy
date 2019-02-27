const ffmpeg = require("ffmpeg.js/ffmpeg-mp4.js");
const jpeg = require("jpeg-js");

module.exports = (duration) => {
	const JPG_WIDTH = 320;
	const JPG_HEIGHT = 180;
	const jpegBuffer = new Buffer(JPG_WIDTH * JPG_HEIGHT * 4);
	var i = 0;
	while (i < jpegBuffer.length) {
		jpegBuffer[i++] = 0xFF; // red
		jpegBuffer[i++] = 0x00; // green
		jpegBuffer[i++] = 0x00; // blue
		jpegBuffer[i++] = 0xFF; // alpha - ignored in JPEGs
	}
	const jpegImageData = jpeg.encode(
		{
			data: jpegBuffer,
			width: JPG_WIDTH,
			height: JPG_HEIGHT
		},
		1,
	)

	let stdout = "";
	let stderr = "";
	const results = ffmpeg(
		{
			MEMFS: [
				{
					name: 'dummy.jpg',
					data: jpegImageData.data,
				}
			],
			arguments: [
				'-loop',
				'1',
				'-i',
				'dummy.jpg',
				'-t',
				`${duration}`,
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
		}
	);

	return results.MEMFS[0].data;
}