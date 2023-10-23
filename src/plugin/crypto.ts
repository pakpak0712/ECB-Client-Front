import { AES, SHA256, enc, mode, pad } from 'crypto-js';

// const KEY_TYPE = {
//     DEFAULT: 'DEFAULT',
//     DEVICE: 'DEVICE',
//     SECURE: 'SECURE',
// }

const blackList = ['email', 'name', 'userId', 'gender', 'ssn', 'birth', 'id'];

const generateKeySpec = (salt: any) => {
	return enc.Utf8.parse(salt.slice(0, 16));
};

const generateIV = (salt: any) => {
	return enc.Utf8.parse(salt.slice(0, 16));
};

export const encryptByBlackList = (data: any, salt: any, key?: string) => {
	if (data === null || data === undefined || data === '') return null;
	if (typeof data === 'object' && !Array.isArray(data)) {
		const c_data: any = {};
		for (const c_key in data) {
			if (!Object.prototype.hasOwnProperty.call(data, c_key)) continue;
			// if (!data?.hasOwnProperty(c_key)) continue;
			c_data[c_key] = encryptByBlackList(data[c_key], salt, c_key);
		}
		return c_data;
	}
	if (!key) {
		return AES.encrypt(JSON.stringify(data).replace(/"/g, ''), generateKeySpec(salt), {
			keySize: 128 / 8,
			iv: generateIV(salt),
			mode: mode.CBC,
			padding: pad.Pkcs7,
		}).toString();
	}
	return blackList.includes(key)
		? AES.encrypt(JSON.stringify(data).replace(/"/g, ''), generateKeySpec(salt), {
				keySize: 128 / 8,
				iv: generateIV(salt),
				mode: mode.CBC,
				padding: pad.Pkcs7,
		  }).toString()
		: data;
};

// options?: any
export const encrypt = (data: any, salt: any) => {
	if (data === null || data === undefined || data === '') return null;
	if (typeof data === 'object' && !Array.isArray(data)) {
		const c_data: any = {};
		for (const key in data) {
			if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
			c_data[key] = encrypt(data[key], salt);
		}
		return c_data;
	}

	return AES.encrypt(JSON.stringify(data).replace(/"/g, ''), generateKeySpec(salt), {
		keySize: 128 / 8,
		iv: generateIV(salt),
		mode: mode.CBC,
		padding: pad.Pkcs7,
	}).toString();
};

export const decrypt = (data: any, salt: string) => {
	if (!salt || !data) return data;
	if (typeof data === 'object' && !Array.isArray(data)) {
		const c_data: any = {};
		for (const key in data) {
			c_data[key] = decrypt(data[key], salt);
		}
		return c_data;
	}
	let res = data;
	try {
		res = AES.decrypt(data, generateKeySpec(salt), {
			keySize: 128 / 8,
			iv: generateIV(salt),
			mode: mode.CBC,
			padding: pad.Pkcs7,
		})?.toString(enc.Utf8);
		if (res === '') res = data;
		try {
			res = JSON.parse(res);
		} catch {
			false;
		}
	} catch (err) {
		res = data;
	}
	return res;
};

export const getSecureState = (data: any, salt: string) => {
	if (!salt) return data;
	return decrypt(data, salt);
};
export class SecureStorage {
	storage: any = null;

	constructor(localStorage: any) {
		this.storage = localStorage;
	}

	hash(key: string, salt: any) {
		return SHA256(key, salt).toString();
	}

	encryptBySHA(data: any, salt: any) {
		return SHA256(data, salt).toString();
	}

	getItem(key: string, salt: string) {
		if (!salt) return this.storage.getItem(key);
		const dataBeforeDecrypt = this.storage.getItem(key);
		return decrypt(JSON.parse(dataBeforeDecrypt), salt);
	}

	setItem(key: string, data: any, salt: string) {
		if (!salt) return null;
		// const hashKey = this.hash(key);
		const encryptData = encrypt(data, salt);
		return this.storage.setItem(key, JSON.stringify(encryptData), salt);
	}

	removeItem(key: string) {
		// const hashKey = this.hash(key);
		return this.storage.removeItem(key);
	}

	clear() {
		return this.storage.clear();
	}

	get length() {
		return this.storage.length;
	}
}
