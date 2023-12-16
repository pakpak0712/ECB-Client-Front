export const titleDic = [new Option('구매자', 'member'), new Option('비상벨', 'tcs')];

export const memberSearchTypeDic = [
	new Option('아이디', 'member_id'),
	new Option('이름', 'member_name'),
	new Option('전화번호', 'member_phone'),
	new Option('이메일', 'member_email'),
	new Option('관리장소', 'member_viewlist'),
];

export const deviceTypeDic = [
	new Option('ECB-ST-20S', 'ECB-ST10K'),
	new Option('ECB-ST-20T', 'ECB-ST20T'),
	new Option('ECB-ST-20BK', 'ECB-ST20VK'),
	new Option('ECB-ST-20VK', 'ECB-ST20BK'),
	new Option('ECB-ST-30S', 'ECB-ST20VT'),
	new Option('ECB-ST-30T', 'ECB-ST30T'),
	new Option('ECB-ST-T', 'ECB-ST-T'),
];
export const deviceSearchTypeDic = [
	new Option('구매자', 'tcs_name'),
	new Option('설치장소', 'tcs_simpAddr'),
	new Option('설치주소', 'tcs_compAddr'),
	new Option('라우터번호', 'tcs_serial'),
	new Option('전화번호', 'tcs_matchPhone'),
	new Option('MAC', 'tcs_mac'),
];
export const deviceSearchTypeDic2 = [
	new Option('구매자', 'tcs_name'),
	new Option('설치장소', 'tcs_simpAddr'),
	new Option('설치주소', 'tcs_compAddr'),
	new Option('라우터번호', 'tcs_serial'),
	new Option('전화번호', 'tcs_matchPhone'),
];

export const alertSearchTypeDic = [
	new Option('알림장소', 'alert_name'),
	new Option('알림유형', 'alert_type'),
	new Option('라우터번호', 'alert_serial'),
	new Option('전화번호', 'alert_phone'),
	new Option('MAC', 'tcs_mac'),
];
export const alertSearchTypeDic2 = [
	new Option('알림장소', 'alert_name'),
	new Option('알림유형', 'alert_type'),
	new Option('라우터번호', 'alert_serial'),
	new Option('전화번호', 'alert_phone'),
];

export const aliveSearchTypeDic = [
	new Option('고장장소', 'alive_name'),
	new Option('라우터번호', 'alive_serial'),
	new Option('전화번호', 'alive_phone'),
	new Option('MAC', 'tcs_mac'),
];
export const aliveSearchTypeDic2 = [
	new Option('고장장소', 'alive_name'),
	new Option('라우터번호', 'alive_serial'),
	new Option('전화번호', 'alive_phone'),
];
