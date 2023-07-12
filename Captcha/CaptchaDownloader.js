import fs from "fs";
import axios from "axios";
import { captchaURL } from "../Directories-URLS/URLS.js";
import { ogCaptcha } from "../Directories-URLS/Directories.js";
import GenerateCookie from "../Cookie-Image-OCR/cookieGen.js";

const currentCookie = `PHPSESSID=${GenerateCookie}`;
const DownloadCaptcha = async () => {
	console.time(import.meta.url);

	const config = {
		url: captchaURL,
		method: "get",
		headers: {
			Cookie: currentCookie,
		},
		responseType: "arraybuffer",
	};

	return await axios(config)
		.then(async (response) => {
			fs.writeFileSync(ogCaptcha, response.data);
			console.timeEnd(import.meta.url);
			return currentCookie;
		})
		.catch((err) => console.error(err));
};

export default DownloadCaptcha;
