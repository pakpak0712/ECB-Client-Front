import { ComponentPropsWithoutRef, ReactNode, useEffect, useState } from 'react';

interface CustomCheckboxProps extends ComponentPropsWithoutRef<'input'> {
	required?: boolean;
	title?: string;
	label?: string;
	name: string;
	defaultValue?: string;
	placeholder?: string;
	children?: ReactNode;
	handleState?: (key: string, value: string | number) => void;
	handlePattern?: (value: string) => string | number;
}

export default function CustomCheckbox(props: CustomCheckboxProps) {
	const {
		required = false,
		title,
		label,
		name,
		defaultValue = '',
		children,
		handleState,
		handlePattern,
		...restAttribute
	} = props;

	const [value, setValue] = useState<string | number>(defaultValue);

	const handleChange = (originValue: string) => {
		const value = handlePattern ? handlePattern(originValue) : originValue;
		setValue(value);
		if (handleState) handleState(name, value);
	};

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return (
		<>
			<div className={title && 'form-content'}>
				{title && (
					<div className="form-content-label">
						{title}
						{required && <span className="hljs-string">&nbsp;*</span>}
					</div>
				)}
				<div className="col-form-box">
					<div className="col-form-tag">
						<input
							type="checkbox"
							name={name}
							id={`${name}-checkbox`}
							className="form-check-input form-content-input me-1"
							value={value}
							onChange={(event) => handleChange(event.target.value)}
							{...restAttribute}
						/>
						{label && (
							<label htmlFor={`${name}-checkbox`} className="form-check-label">
								{label}
							</label>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
