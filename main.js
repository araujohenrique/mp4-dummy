const ffmpeg = require("ffmpeg.js/ffmpeg-mp4.js");
const dummyJpg = require("./dummy-jpg.js");
const dummyMp3 = require("./dummy-mp3.js");

module.exports = (duration) => {
	const jpegFile = dummyJpg();
	const mp3File = dummyMp3(duration)[0];
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