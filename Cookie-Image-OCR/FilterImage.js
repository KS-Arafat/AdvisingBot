import jimp from "jimp";

const FilterImage = async (
	ogCaptcha = "./Captcha/ogTest.png",
	bwCaptcha = "./images/bwTest.png"
) => {
	// console.time(import.meta.url);
	let img = await jimp.read(ogCaptcha);
	// img = img.contrast(1);
	// img = img.grayscale();
	img.scan(0, 0, img.bitmap.width, img.bitmap.height, (x, y, idx) => {
		if (img.bitmap.data[idx] < 70) {
			img.bitmap.data[idx] = 255;
			img.bitmap.data[idx + 1] = 255;
			img.bitmap.data[idx + 2] = 255;
		} else {
			img.bitmap.data[idx] = 0;
			img.bitmap.data[idx + 1] = 0;
			img.bitmap.data[idx + 2] = 0;
		}
	});
	img.contrast(0.1);
	img.quality(90);

	return new Promise((res) => {
		// console.timeEnd(import.meta.url);
		res(img.writeAsync(bwCaptcha));
	});
};

export default FilterImage;
