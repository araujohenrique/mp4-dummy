const ffmpeg = require("ffmpeg.js/ffmpeg-mp4.js");
const mp3Dummy = require('mp3-dummy');
const jpgDummy = require("jpg-dummy");

module.exports = (nbSeconds) => {
	const jpegFile = jpgDummy(100, 100);
	const mp3File = mp3Dummy(nbSeconds);
	let stdout = "";
	let stderr = "";

	const results = ffmpeg(
		{
			MEMFS: [
				{
					name: 'dummy.jpg',
					data: jpegFile,
				},
				{
					name: 'dummy.mp3',
					data: mp3File,
				},
			],
			arguments: [
				'-loop',
				'1',
				'-i',
				'dummy.jpg',
				'-i',
				'dummy.mp3',
				'-t',
				`${nbSeconds}`,
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
				// console.log(stderr)
			},
		}
	);

	return results.MEMFS[0].data.buffer;
}