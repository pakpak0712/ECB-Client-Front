import { ReactNode } from 'react';

interface PropsType {
	isRequired?: boolean;
	labelTitle: string;
	siblings?: JSX.Element;
	children?: ReactNode;
}

export default function CustomChildren({ isRequired = false, labelTitle, children, siblings }: PropsType) {
	return (
		<>
			<div className="form-content">
				{labelTitle && (
					<div className="col-form-label">
						{labelTitle}
						{isRequired && <span className="required">&nbsp;*</span>}
					</div>
				)}
				<div className="col-form-box">
					<div className="col-form-tag">
						{children}
						{siblings && siblings}
					</div>
				</div>
			</div>
		</>
	);
}
