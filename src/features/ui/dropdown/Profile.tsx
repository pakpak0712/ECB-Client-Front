import { useRecoilState } from 'recoil';

import MemberInfo from '@/features/member/MemberInfo';
import { useConfirm } from '@/hooks/useConfirm';
import { useContentsModal } from '@/hooks/useContentsModal';
import { SecureStorage } from '@/plugin/crypto';
import { memberIdState } from '@/state/member';

export default function Profile() {
	const secureStorage = new SecureStorage(localStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');
	const [_, setId] = useRecoilState(memberIdState);
	const { openContentModal } = useContentsModal();
	const { confirmMessage } = useConfirm();

	const handleEditClick = async () => {
		setId(userInfo.member_no);
		openContentModal(<MemberInfo />);
	};

	const handleLogout = async () => {
		if (await confirmMessage('정말 로그아웃하실건가요?')) {
			secureStorage.removeItem('user-storage');
			window.location.reload();
		}
	};

	return (
		<>
			<div className="navbar-item navbar-user dropdown">
				<a href="#/" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
					<span>{userInfo.member_name} </span>
					<b className="caret"></b>
				</a>
				<div className="dropdown-menu">
					<button type="button" className="dropdown-item" onClick={handleEditClick}>
						정보 수정
					</button>
					<div className="dropdown-divider"></div>
					<button type="button" className="dropdown-item" onClick={handleLogout}>
						로그아웃
					</button>
				</div>
			</div>
		</>
	);
}
