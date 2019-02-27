const sharp = require('sharp');

module.exports = () => {
	const dummyBuffer = Buffer.from('<svg><rect width="200" height="200"/></svg>');

	return sharp(dummyBuffer).jpeg().toBuffer();
}