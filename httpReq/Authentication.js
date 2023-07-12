import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { HomePage } from "../Directories-URLS/Directories.js";
import { authURL } from "../Directories-URLS/URLS.js";
import * as env from "dotenv";

env.config();
if (process.env.ID_hash == undefined) {
	console.error(".env file needed ");
	process.abort();
}
const ID_hash = process.env.ID_hash;
const Pwd = process.env.Pwd;

const Auth_Cookie = async (captchaCode, cookie) => {
	// console.time(import.meta.url);
	const form = new FormData();
	form.append("password", Pwd);
	form.append("captcha", captchaCode);
	form.append("username", ID_hash);
	form.append("commit", "Login");

	// console.log(`${captchaCode}  ${cookie}`);
	const config = {
		method: "post",
		url: authURL,
		headers: {
			Cookie: cookie,
			...form.getHeaders(),
		},
		data: form,
	};
	// console.log(config);
	return axios(config)
		.then((res) => {
			// console.timeEnd(import.meta.url);
			fs.writeFileSync(HomePage, res.data);
			if (res.request.path == "/index.php/students/landing") {
				return {
					msg: "Captcha was good",
					success: true,
					cookie: cookie,
				};
			} else {
				return {
					msg: "Wrong Captcha / Pwd / ID_hash",
					success: false,
				};
			}
		})
		.catch((err) => {
			return {
				msg: "API error occurd",
				error: err,
			};
		});
};

export default Auth_Cookie;
