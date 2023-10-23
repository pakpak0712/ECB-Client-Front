import { useRecoilState } from 'recoil';

import MemberInfo from '@/features/member/MemberInfo';
import { useConfirm } from '@/hooks/useConfirm';
import { useContentsModal } from '@/hooks/useContentsModal';
import useUserInfoFromSession from '@/hooks/useUserInfoFromSession';
import { SecureStorage } from '@/plugin/crypto';
import { memberIdState } from '@/state/member';

export default function Profile() {
	const userInfo = useUserInfoFromSession();
	const secureStorage = new SecureStorage(sessionStorage);
	const [_, setId] = useRecoilState(memberIdState);
	const { openContentModal } = useContentsModal();
	const { confirmMessage } = useConfirm();

	const handleEditClick = async () => {
		setId(userInfo.member_no);
		openContentModal(<MemberInfo />);
	};

	const handleLogout = async () => {
		if (await confirmMessage('정말 로그아웃하실건가요?')) {
			secureStorage.removeItem('user');
			window.location.reload();
		}
	};
	return (
		<>
			<div className="navbar-item navbar-user dropdown">
				<a href="#/" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
					{/*<img src="./scss/default/images/user/user-13.jpg" alt="" />*/}
					<span>{userInfo.member_name} </span>
					<b className="caret ms-1"></b>
				</a>
				<div className="dropdown-menu dropdown-menu-end">
					<span className="dropdown-item cursor-pointer" onClick={handleEditClick}>
						정보 수정
					</span>
					<div className="dropdown-divider"></div>
					<button type="button" className="dropdown-item cursor-pointer" onClick={handleLogout}>
						로그아웃
					</button>
				</div>
			</div>
		</>
	);
}
