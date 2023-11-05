import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';

interface PropsType extends ComponentPropsWithoutRef<'input'> {
	required?: boolean;
	title?: string;
	name: string;
	defaultValue?: string;
	placeholder?: string;
	readOnly?: boolean;
	siblings?: JSX.Element;
	handleState?: (key: string, value: string) => void;
	handlePattern?: (value: string) => string;
	handleValid?: (value: string) => string;
}

export default function CustomInput({
	required = false,
	title,
	name,
	defaultValue = '\u00A0',
	readOnly,
	siblings,
	handleState,
	handlePattern,
	handleValid,
	...restAttribute
}: PropsType) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState<string>(defaultValue);
	const [error, setError] = useState<string>();

	const handleChange = (originValue: string) => {
		const value = handlePattern ? handlePattern(originValue) : originValue;
		setValue(value);
		setError('');
		if (handleState) handleState(name, value);
	};

	const handleBlur = () => {
		if (handleValid) setError(handleValid(value));
	};

	useEffect(() => {
		if (error) {
			setValue('');
			if (handleState) handleState(name, '');
			inputRef.current?.focus();
		}
	}, [error]);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

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
						{readOnly ? (
							<p className="form-text">{defaultValue}</p>
						) : (
							<>
								<input
									ref={inputRef}
									type={restAttribute.type || 'text'}
									name={name}
									className={`form-control ${!siblings || 'me-2'}`}
									value={value}
									onChange={(event) => handleChange(event.target.value)}
									onBlur={handleBlur}
									{...restAttribute}
								/>
								{siblings && siblings}
							</>
						)}
					</div>
					{error && <p className="form-error">{error}</p>}
				</div>
			</div>
		</>
	);
}
