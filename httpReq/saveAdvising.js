import axios from "axios";
import FormData from "form-data";
import { saveAdvisingURL } from "../Directories-URLS/URLS.js";

const saveAdvsing = async (form = new FormData(), cookie) => {
	const config = {
		method: "post",
		url: saveAdvisingURL,
		headers: {
			Cookie: cookie,
			...form.getHeaders(),
		},
		data: form,
	};

	return axios(config).then((res) => {
		if (res.status == 200) {
			return {
				msg: res.data,
				success: true,
			};
		} else return { msg: res.data, success: false };
	});
};

export default saveAdvsing;
