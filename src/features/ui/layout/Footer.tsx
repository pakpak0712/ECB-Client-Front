import { useEffect, useState } from 'react';

export default function Footer() {
	return (
		<div id="footer" className="app-footer">
			<LightModeToggle />
			<div className="copyright text-end">Copyright SAFETY-LAB CO,LTD Allright Reserved.</div>
		</div>
	);
}

function LightModeToggle() {
	const [lightMode, setLightMode] = useState(false);

	useEffect(() => {
		if (lightMode) document.body.classList.remove('dark-mode');
		else document.body.classList.add('dark-mode');
	}, [lightMode]);

	return (
		<div className="form-check form-switch">
			<label className="form-check-label" htmlFor="btn_lightMode_toggle">
				라이트모드
			</label>
			<input
				className="form-check-input"
				type="checkbox"
				id="btn_lightMode_toggle"
				checked={lightMode}
				onChange={(event) => setLightMode(event.target.checked)}
			/>
		</div>
	);
}
