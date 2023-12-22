import { Link, useRouteError } from 'react-router-dom';

const PageNotFound = () => {
	const error = useRouteError();
	console.error(error);

	return (
		<div className="error">
			<div className="error-code">404</div>
			<div className="error-content">
				<div className="error-message">존재하지 않는 페이지입니다.</div>
				<div className="error-desc mb-4">경로를 다시 확인해주세요.</div>
				<div>
					<Link to="/" className="btn btn-info px-3">
						홈화면으로
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
