import { useMutation } from '@tanstack/react-query';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PushModal from '@/features/push/PushModal';
import Footer from '@/features/ui/layout/Footer';
import { useAlert } from '@/hooks/useAlert';
import { useContentsModal } from '@/hooks/useContentsModal';
import { SecureStorage } from '@/plugin/crypto';
import { commonQueryKey } from '@/queries/_querykey';
import { postMutation } from '@/queries/_utils';
import { requestPermission } from '@/utils/firebase';

export default function Login() {
	const [memberId, setMemberId] = useState('');
	const [memberPw, setMemberPw] = useState('');
	const [memberToken, setMemberToken] = useState('');
	const navigate = useNavigate();
	const { alertMessage } = useAlert();

	const secureStorage = new SecureStorage(localStorage);

	const loginMutation = useMutation(
		() => {
			const mutationKey = [...commonQueryKey.login(), { memberId, memberPw, memberToken }];
			return postMutation(mutationKey);
		},
		{
			onSuccess: (data) => {
				if (data) {
					secureStorage.setItem('user-storage', data, 'user-storage');
					navigate('/');
				} else {
					alertMessage('로그인에 실패하였습니다.\n아이디와 비밀번호를 다시한번 확인해주세요.');
				}
			},
		},
	);
	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!memberId.trim()) return alertMessage('아이디를 입력해주세요.');
		if (!memberPw.trim()) return alertMessage('비밀번호를 입력해주세요.');
		if (!memberToken) return alertMessage('잠시 후 다시 시도해주세요.');
		loginMutation.mutate();
	};

	useEffect(() => {
		requestPermission(setMemberToken);
	}, []);

	// 푸시 알림 모달 띄우기
	const { openContentModal } = useContentsModal();
	const bc = new BroadcastChannel('fcm');

	bc.onmessage = function (e) {
		openContentModal(<PushModal data={e} />);
	};

	return (
		<div className="login">
			<div className="login-cover"></div>

			<div className="login-container" style={{ maxWidth: '400px' }}>
				<div className="login-header">
					<h1 className="login-title text-center">(주)세이프티랩 비상벨통합관제시스템</h1>
				</div>
				<div className="login-content">
					<form onSubmit={handleLogin} className="login-form row">
						<div className="col-md-8">
							<div className="form-floating">
								<input
									type="text"
									className="login-form-control form-control"
									placeholder="아이디를 입력해주세요."
									aria-label="login-id-input"
									value={memberId}
									onChange={(e) => setMemberId(e.target.value.trim())}
								/>
								<label htmlFor="id" className="login-label">
									아이디
								</label>
							</div>
							<div className="form-floating">
								<input
									type="password"
									className="login-form-control form-control"
									placeholder="비밀번호를 입력해주세요."
									aria-label="login-password-input"
									autoComplete="off"
									value={memberPw}
									onChange={(e) => setMemberPw(e.target.value.trim())}
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
			<Footer />
		</div>
	);
}
