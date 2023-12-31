import { useMutation } from '@tanstack/react-query';

import axios from '@/plugin/proxyHandler';

interface Props<T> {
	queryKey: string[];
	params: T;
	filename: string;
}

export default function ButtonExcel<T>({ queryKey, params, filename }: Props<T>) {
	const downloadExcel = async () => {
		const response = await axios.post(queryKey.join('/'), params, {
			responseType: 'blob',
		});

		const blob = new Blob([response.data], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		});
		const url = window.URL.createObjectURL(blob);

		const nowDate = new Date();

		const nowYear = nowDate.getFullYear().toString();
		const nowMonth = ('0' + (1 + nowDate.getMonth())).slice(-2);
		const nowDay = ('0' + nowDate.getDate()).slice(-2);

		const strNowDate = nowYear + '-' + nowMonth + '-' + nowDay;

		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `${filename} (${strNowDate}).xls`);
		document.body.appendChild(link);
		link.click();

		window.URL.revokeObjectURL(url);
	};
	const { mutate } = useMutation(downloadExcel);
	return (
		<>
			<button type="button" className="btn btn-green btn-sm" onClick={() => mutate()}>
				<i className="fa-solid fa-file-excel me-2"></i>
				엑셀 다운로드
			</button>
		</>
	);
}
