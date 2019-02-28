const lamejs = require('lamejs')

module.exports = (duration) => {
	const mp3Data = [];
	const mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128);
	const samples = new Int16Array(44100 * duration);
	let mp3Tmp = mp3encoder.encodeBuffer(samples);

	mp3Data.push(mp3Tmp);

	mp3Tmp = mp3encoder.flush();

	mp3Data.push(mp3Tmp);

	return mp3Data;
}