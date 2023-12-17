export interface AlertModalType {
	isShow: boolean;
	content: JSX.Element | string;
}

export interface ConfirmModalType {
	isShow: boolean;
	content: JSX.Element | string;
	handleConfirm: undefined | (() => void);
	handleCancel: undefined | (() => void);
}

export interface ContentsModalType {
	isShow: boolean;
	content: JSX.Element | undefined;
}
export interface PushModalType {
	isShow: boolean;
	isPushShow: boolean;
	push: JSX.Element | undefined;
	pushCount: number;
}
