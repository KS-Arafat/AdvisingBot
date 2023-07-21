"use strict";
import DownloadCaptcha from "./Captcha/CaptchaDownloader.js";
import FilterImage from "./Cookie-Image-OCR/FilterImage.js";
import Scanner_tess from "./Cookie-Image-OCR/OCR_Tesseract.js";
import Auth_Cookie from "./httpReq/Authentication.js";
import AdvisingPage from "./httpReq/AdvisingPage.js";
import LaunchScraper from "./Scraping/scraper.js";
import saveAdvsing from "./httpReq/saveAdvising.js";

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
	return await Auth_Cookie(captcha, cookie);
	// if (response.success) return await AdvisingPage(cookie);
	// else return response;
};

const MainBot = async (MAX_TRIES = 5) => {
	var Try = 0;
	var temp = { success: false };
	while (!temp.success && Try < MAX_TRIES) {
		Try++;
		console.log("\nAttempt : " + Try + "/" + MAX_TRIES);
		temp = await Controller();
		console.log(temp);
		setTimeout((_) => _, 1000);
	}
	if (Try == MAX_TRIES) return { success: false, msg: "Authentication Failed" };
	const advres = await AdvisingPage(temp.cookie);
	console.log("Advising Page:", advres);
	const formData = await LaunchScraper(advres.cookie);
	const savedAd = await saveAdvsing(formData, temp.cookie);
	console.log(savedAd);
};
await MainBot();
