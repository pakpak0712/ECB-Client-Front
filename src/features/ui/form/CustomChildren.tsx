import { ReactNode } from 'react';

interface PropsType {
	isRequired?: boolean;
	title: string;
	siblings?: JSX.Element;
	children?: ReactNode;
}

export default function CustomChildren({ isRequired = false, title, children, siblings }: PropsType) {
	return (
		<>
			<div className="form-content">
				{title && (
					<div className="col-form-label">
						{title}
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
