import { useNavigate } from 'react-router-dom';

export const AccessDenied = () => {
	const navigate = useNavigate();

	return (
		<div className="error">
			<div className="error-code">401</div>
			<div className="error-content">
				<div className="error-message">접근 권한이 없습니다</div>
				<div className="error-desc mb-4"></div>
				<div>
					<button className="btn btn-info px-3" onClick={() => navigate(-1)}>
						돌아가기
					</button>
				</div>
			</div>
		</div>
	);
};
