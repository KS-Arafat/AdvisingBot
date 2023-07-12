import { cryptoRandomStringAsync } from "crypto-random-string";
const GenerateCookie = await cryptoRandomStringAsync({
	length: 26,
	characters: "asdfghjklmnbvcxzqwertyuiop0147963258",
});

export default GenerateCookie;
