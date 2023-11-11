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
					최근 업데이트 시간: <span className="">{getTodayTime()}</span>
				</small>
			</p>
		</>
	);
}
