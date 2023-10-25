export interface MemberListType {
	[key: string]: string | number;
	no: number;
	member_id: string;
	member_enable: string;
	member_tms: string;
	member_phone: string;
	member_no: number;
	member_email: string;
	member_viewlist: string;
	member_flag: string;
	member_pw: string;
	member_name: string;
}

export interface MemberInfoDataType {
	[key: string]: string;
	memberId: string;
	memberPw: string;
	memberName: string;
	memberPhone: string;
	memberEmail: string;
	memberViewlist: string;
	memberFlag: string;
}
