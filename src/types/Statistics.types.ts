export interface AlertListType {
	[key: string]: string | number;
	alertNo: number;
	alertDevicetype: string;
	alertType: string;
	alertSerial: string;
	alertMac: string;
	alertName: string;
	alertPhone: string;
	alertSimpaddr: string;
	alertDate: string;
	alertState: string;
	alertStateUser: string;
	alertStateSlave: string;
}

export interface AliveListType {
	[key: string]: string | number;
	aliveNo: number;
	aliveDevicetype: string;
	aliveSerial: string;
	aliveMac: string;
	aliveName: string;
	alivePhone: string;
	aliveSimpaddr: string;
	aliveDate: string;
}
