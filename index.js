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
	if (captcha.length != 4)
		return {
			success: false,
			msg: "bad Captcha",
		};
	const response = await Auth_Cookie(captcha, cookie);
	if (response.success) return await AdvisingPage(cookie);
	else return response;
};

const MainBot = async (MAX_TRIES = 5) => {
	var Try = 0;
	var temp = { success: false };
	while (!temp.success && Try < MAX_TRIES) {
		Try++;
		console.log("\nAttempt : " + Try + "/" + MAX_TRIES);
		temp = await Controller();
		console.log(temp);
	}
	setTimeout((_) => _, 1000);
};
await MainBot();
