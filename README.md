Simple browser/node module to generate a dummy mp4 file of a specific duration. The mp4 file contains a fixed black image and a silent audio track.

## Installation
    $ npm install mp4-dummy

## Usage
    const mp4Dummy = require('mp4-dummy');

	// Generates a 10 second mp4 file
	const mp4File = mp4Dummy(10)

## API
    mp4Dummy(nbSeconds: number): ArrayBuffer