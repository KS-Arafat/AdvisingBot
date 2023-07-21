import { advisingURL } from "../Directories-URLS/URLS.js";

import FormData from "form-data";
import puppeteer from "puppeteer-core";

import * as env from "dotenv";

env.config();
if (process.env.ID_hash == undefined) {
	console.error(".env file needed ");
	process.abort();
}

const LaunchScraper = async (cookie = "") => {
	const form = new FormData();
	const Browser = await puppeteer.launch({
		headless: true,
		timeout: 10000,
		executablePath: process.env.browserPath,
	});
	const cookies = [
		{
			name: "PHPSESSID",
			value: cookie.split("=")[1],
			domain: "rds3.northsouth.edu",
			path: "/",
			expires: -1,
			size: 35,
			httpOnly: false,
			secure: false,
			session: true,
			sameParty: false,
			sourceScheme: "Secure",
			sourcePort: 443,
		},
	];
	let myCourese = "";
	let readvNo = "";
	try {
		const page = await Browser.newPage();

		await page.setCookie(...cookies);
		await page.goto(advisingURL, { waitUntil: "networkidle0" });
		readvNo = await page.$eval("#readvising", (el) => el.value); // got the readvising value

		page.on("console", async (msg) => {
			const msgArgs = msg.args();
			myCourese = await msgArgs[0].jsonValue();
			myCourese = myCourese.toString().replace("0,0,0,0;", "");
		});
		await page.evaluate(() => {
			let mycrs = "";
			advisedArray.forEach(
				(e) =>
					(mycrs +=
						e["courseCode"] +
						"," +
						e["section"] +
						"," +
						e["courseCredit"] +
						"," +
						e["fees"] +
						";")
			);
			console.log(mycrs);
		});
	} catch (error) {
		console.error(error);
	}
	setTimeout(async () => {
		await Browser.close();
	}, 3000);
	form.append("studentID", process.env.ID);
	form.append("courses", myCourese);
	form.append("readvising", readvNo);
	console.log("Readvsing Count: " + readvNo);
	return form;
};

export default LaunchScraper;
