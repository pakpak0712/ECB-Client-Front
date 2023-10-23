export const titleDic = [new Option('회원', 'member'), new Option('장비', 'tcs')];

export const memberSearchTypeDic = [
	new Option('아이디', 'member_id'),
	new Option('이름', 'member_name'),
	new Option('전화번호', 'member_phone'),
	new Option('이메일', 'member_email'),
];

export const deviceSearchTypeDic = [
	new Option('설치장소', 'tcs_name'),
	new Option('전화번호', 'tcs_matchPhone'),
	new Option('라우터', 'tcs_serial'),
];
export const deviceTypeDic = [new Option('ECB-ST20VK', 'ECB-ST20VK'), new Option('ECB-ST20T', 'ECB-ST20T')];
export const compAddressDic = [
	new Option('여자화장실', '여자화장실'),
	new Option('고객안전실', '고객안전실'),
	new Option('수유실', '수유실'),
];

export const alertSearchTypeDic = [
	new Option('알람장소', 'alert_name'),
	new Option('알람유형', 'alert_type'),
	new Option('전화번호', 'alert_phone'),
	new Option('라우터', 'alert_serial'),
];
export const aliveSearchTypeDic = [
	new Option('고장장소', 'alive_name'),
	new Option('전화번호', 'alive_phone'),
	new Option('라우터', 'alive_serial'),
];
