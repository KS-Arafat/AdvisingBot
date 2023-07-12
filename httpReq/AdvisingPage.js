import { advisingURL } from "../Directories-URLS/URLS.js";
import axios from "axios";
import { AdvisingPage } from "../Directories-URLS/Directories.js";
import fs from "fs";

const AdvisingDownloader = async (cookie) => {
	const config = {
		method: "post",
		url: advisingURL,
		headers: {
			Cookie: cookie,
		},
	};

	return axios(config).then((res) => {
		if (res.request.path == "/index.php/students/advising") {
			fs.writeFileSync(AdvisingPage, res.data);
			return {
				Path: "./html_Pages/Advising.html",
				Success: true,
			};
		} else {
			return {
				request_Path: res.request.path,
				Success: false,
			};
		}
	});
};

export default AdvisingDownloader;
