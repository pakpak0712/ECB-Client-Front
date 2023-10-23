import { rest } from 'msw';

const userLoginData = {
	value: {
		detail: {
			dambeeYn: 'Y',
			email: '',
			id: 'sysown',
			name: '시스템',
			perms: [],
			role: 'Y',
			uno: 1,
		},
		login: {
			deviceType: null,
			issueAt: '2023-05-04T13:56:51.3',
			loginAt: '2023-05-04T13:56:51.3',
			loginNo: 52809,
			loginType: 'ADMIN',
			loginUser: 1,
			platform: null,
			sessionId: '',
			useYn: 'Y',
		},
		passExpired: 'N',
		token: {
			accessToken: 'testAccessToken',
			authority: 'ROLE_ADMIN',
			clientId: 'best_lc-admin',
			expiration: '2023-05-04T14:56:51',
			issueAt: '2023-05-04T13:56:51.302',
			loginNo: 52809,
			refreshToken: 'testRefreshToken',
			secureKey: 'testSecureKey',
			tokenIssueType: 'ACCESS',
			tokenNo: 58005,
		},
	},
};

const handlers = [
	rest.post('http://172.30.1.250:9100/api/v3/manage/auth/login', (_, res, ctx) => res(ctx.json(userLoginData))),
];

export default handlers;
