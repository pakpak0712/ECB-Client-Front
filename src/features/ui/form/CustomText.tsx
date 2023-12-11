import { ComponentPropsWithoutRef, useEffect } from 'react';

interface PropsType extends ComponentPropsWithoutRef<'input'> {
	isRequired?: boolean;
	labelTitle?: string;
	name?: string;
	text?: string;
	siblings?: JSX.Element;
	handleState?: (...args: any[]) => void;
}

export default function CustomText({ isRequired = false, labelTitle, name, text, siblings, handleState }: PropsType) {
	useEffect(() => {
		if (name && handleState) handleState(name, text);
	}, [text]);

	return (
		<>
			<div className="form-content">
				<div className="col-form-label">
					{labelTitle}
					{isRequired && <span className="required">&nbsp;*</span>}
				</div>
				<div className="col-form-box">
					<p className="form-text">{text}</p>
					{siblings && siblings}
				</div>
			</div>
		</>
	);
}
