import "simpledotcss/simple.css";

const base64UrlToHex = (base64urlStr: string): string => {
	let base64 = base64urlStr.replace(/-/g, "+").replace(/_/g, "/");
	while (base64.length % 4) {
		base64 += "=";
	}
	const binaryString = atob(base64);
	return Array.from(binaryString)
		.map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
		.join("");
};

const urlInput = document.getElementById("url") as HTMLInputElement;
const uuidInput = document.getElementById("uuid") as HTMLInputElement;
const urlError = document.getElementById("url-error") as HTMLSpanElement;
const uuidError = document.getElementById("uuid-error") as HTMLSpanElement;

const fromUrlToUuid = () => {
	const rawUrl = urlInput.value;
	try {
		const url = new URL(rawUrl);
		const noteId = url.pathname.substring(1).split("/").shift();
		if (!noteId || noteId.length !== 22) {
			console.error("Invalid Note URL");
			urlError.textContent = "Invalid Note URL";
			return;
		}
		const b64 = base64UrlToHex(noteId);
		const idParts = [
			b64.substring(0, 8),
			b64.substring(8, 12),
			b64.substring(12, 16),
			b64.substring(16, 20),
			b64.substring(20, 32),
		];
		uuidInput.value = idParts.join("-");
		urlError.textContent = "";
		uuidError.textContent = "";
	} catch (error) {
		console.error("Invalid URL", error);
		urlError.textContent = "Invalid URL";
	}
};

const fromUuidToUrl = () => {
	const rawUuid = uuidInput.value;
	const uuid = rawUuid.replace(/-/g, "");
	if (uuid.length !== 32) {
		console.error("Invalid UUID");
		uuidError.textContent = "Invalid UUID";
		return;
	}
	const b64 = uuid
		.match(/.{1,2}/g)
		?.map((byte) => String.fromCharCode(Number.parseInt(byte, 16)))
		.join("");
	if (!b64) {
		console.error("Invalid UUID");
		uuidError.textContent = "Invalid UUID";
		return;
	}
	const noteId = btoa(b64)
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=/g, "");
	const url = new URL("https://demo.hedgedoc.org/");
	url.pathname = noteId;
	urlInput.value = url.toString();
	urlError.textContent = "";
	uuidError.textContent = "";
};

urlInput.addEventListener("input", fromUrlToUuid);
uuidInput.addEventListener("input", fromUuidToUrl);
