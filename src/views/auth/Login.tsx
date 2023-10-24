import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAlert } from '@/hooks/useAlert';
import { SecureStorage } from '@/plugin/crypto';
import { commonQueryKey } from '@/queries/_querykey';
import { postMutationParams } from '@/queries/_utils';

export default function Login() {
	const { alertMessage } = useAlert();

	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const secureStorage = new SecureStorage(sessionStorage);

	const loginMutation = useMutation(
		() => {
			const mutationKey = [...commonQueryKey.login(), { memberId: id, memberPw: password }];
			return postMutationParams(mutationKey);
		},
		{
			onSuccess: (data) => {
				if (data) {
					secureStorage.setItem('user', { ...data, expiry: new Date().getTime() + 60 * 60 * 1000 }, 'data');
					navigate('/');
				} else {
					alertMessage('로그인에 실패했습니다. \n아이디 및 패스워드를 확인해주세요');
				}
			},
		},
	);
	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!id.trim()) return alertMessage('아이디를 입력해 주세요');
		if (!password.trim()) return alertMessage('비밀번호를 입력해 주세요');
		loginMutation.mutate();
	};

	return (
		<div className="login">
			<div className="login-cover"></div>

			<div className="login-container" style={{ maxWidth: '400px' }}>
				<div className="login-header">
					<h1 className="login-title text-center">서울교통공사 비상벨통합관제시스템</h1>
				</div>
				<div className="login-content">
					<form onSubmit={handleLogin} className="login-form row">
						<div className="col-md-8">
							<div className="form-floating">
								<input
									type="text"
									className="login-form-control form-control"
									placeholder="아이디를 입력하세요"
									aria-label="login-id-input"
									value={id}
									onChange={(e) => setId(e.target.value.trim())}
								/>
								<label htmlFor="id" className="login-label">
									아이디
								</label>
							</div>
							<div className="form-floating">
								<input
									type="password"
									className="login-form-control form-control"
									placeholder="비밀번호를 입력하세요"
									aria-label="login-password-input"
									autoComplete="off"
									value={password}
									onChange={(e) => setPassword(e.target.value.trim())}
								/>
								<label htmlFor="password" className="login-label">
									비밀번호
								</label>
							</div>
						</div>
						<div className="col-md-4">
							<button type="submit" className="login-button btn btn-navy" aria-label="login-button">
								로그인
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
