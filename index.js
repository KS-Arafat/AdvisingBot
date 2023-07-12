"use strict";
import DownloadCaptcha from "./Captcha/CaptchaDownloader.js";
import FilterImage from "./Cookie-Image-OCR/FilterImage.js";
import Scanner_tess from "./Cookie-Image-OCR/OCR_Tesseract.js";
import Auth_Cookie from "./httpReq/Authentication.js";
import AdvisingPage from "./httpReq/AdvisingPage.js";

import { ogCaptcha, bwCaptcha } from "./Directories-URLS/Directories.js";

const Controller = async () => {
	const cookie = await DownloadCaptcha();
	await FilterImage(ogCaptcha, bwCaptcha);
	const captcha = await Scanner_tess(bwCaptcha);
	if (captcha.length == 4) {
		const response = await Auth_Cookie(captcha, cookie);
		if (response.success) console.log(await AdvisingPage(cookie));
	} else console.error("Wrong Captcha");
	console.log(cookie + " :: " + captcha);
};

await Controller();
