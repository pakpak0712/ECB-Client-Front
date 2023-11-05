export interface DeviceListType {
	[key: string]: string | number;
	tcs_mac: string;
	tcs_no: number;
	tcs_simpAddr: string;
	tcs_serial: string;
	tcs_memo: string;
	tcs_name: string;
	tcs_ALdate: string;
	tcs_flag: number;
	tcs_matchPhone: string;
	tcs_compAddr: string;
}

export interface DeviceInfoDataType {
	[key: string]: string;
	tcsDeviceType: string;
	tcsName: string;
	tcsDate: string;
	tcsMatchPhone: string;
	tcsSimpAddr: string;
	tcsCompAddr: string;
	tcsSttCompAddr: string;
	tcsMac: string;
	tcsSerial: string;
	tcsMemo: string;
}
