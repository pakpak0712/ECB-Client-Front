import { useEffect, useState } from 'react';

export default function Footer() {
	return (
		<footer id="footer" className="app-footer">
			<LightModeToggle />
			<div className="copyright text-end">
				<small>Copyright SAFETY-LAB CO,LTD Allright Reserved.</small>
			</div>
		</footer>
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
			<label className="form-check-label" htmlFor="check-lightMode">
				라이트모드
			</label>
			<input
				className="form-check-input"
				type="checkbox"
				id="check-lightMode"
				checked={lightMode}
				onChange={(event) => setLightMode(event.target.checked)}
			/>
		</div>
	);
}
