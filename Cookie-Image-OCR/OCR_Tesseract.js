import { bwCaptcha } from "../Directories-URLS/Directories.js";
import { createWorker, OEM } from "tesseract.js";

const Scanner_tess = async (imgURL = bwCaptcha) => {
	// console.time(import.meta.url);
	const worker = await createWorker({});
	await worker.loadLanguage("eng");
	await worker.initialize("eng");
	await worker.setParameters({});
	const {
		data: { text },
	} = await worker.recognize(imgURL, {
		lang: "eng",
		init_oem: OEM.TESSERACT_ONLY,
		rotateAuto: true,
		tessedit_char_whitelist: "0123456789",
	});
	const data = text.replace(/[^0-9]/gi, "");
	await worker.terminate();
	// console.timeEnd(import.meta.url);
	return Promise.resolve(data);
};

export default Scanner_tess;
