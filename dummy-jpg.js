const jpeg = require('jpeg-js');

module.exports = () => {
	const width = 100;
	const height = 100;
	const data = new Buffer(width * height * 4);

	return jpeg.encode({ data, width, height }).data;
}