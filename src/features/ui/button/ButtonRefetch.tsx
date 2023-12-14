import { getTodayTime } from '@/utils/dateUtils';

export default function ButtonRefetch() {
	return (
		<>
			<button type="button" className="btn btn-skyblue btn-sm" onClick={() => window.location.reload()}>
				<i className="fa-solid fa-arrows-rotate me-2"></i>
				새로고침
			</button>
			<p className="mt-1 mb-0">
				<small>
					마지막 업데이트 일시: <span className="">{getTodayTime()}</span>
				</small>
			</p>
		</>
	);
}
