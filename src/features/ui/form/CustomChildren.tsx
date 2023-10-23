import { ReactNode } from 'react';

interface PropsType {
	required?: boolean;
	title: string;
	siblings?: JSX.Element;
	children?: ReactNode;
}

export default function CustomChildren({ required = false, title, children, siblings }: PropsType) {
	return (
		<>
			<div className="form-content">
				{title && (
					<div className="col-form-label">
						{title}
						{required && <span className="required">&nbsp;*</span>}
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
