export interface DeviceListType {
	[key: string]: string | number;
	tcs_no: number;
	tcs_deviceType: string;
	tcs_mac: string;
	tcs_matchPhone: string;
	tcs_name: string;
	tcs_simpAddr: string;
	tcs_compAddr: string;
	tcs_moreAddr: string;
	tcs_num: string;
	tcs_ALdate: string;
	tcs_memo: string;
	tcs_serial: string;
	tcs_flag: number;
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
