const ffmpeg = require("ffmpeg.js/ffmpeg-mp4.js");
const mp3Dummy = require('mp3-dummy');
const jpgDummy = require("./dummy-jpg.js");

module.exports = (duration) => {
	const jpegFile = jpgDummy();
	const mp3File = mp3Dummy(duration);
	let stdout = "";
	let stderr = "";

	const results = ffmpeg(
		{
			MEMFS: [
				{
					name: 'dummy.mp3',
					data: mp3File,
				},
				{
					name: 'dummy.jpg',
					data: jpegFile,
				},
			],
			arguments: [
				'-y',
				'-i',
				'dummy.mp3',
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
			},
		}
	);

	return results.MEMFS[0].data.buffer;
}