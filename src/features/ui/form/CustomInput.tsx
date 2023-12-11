import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';

interface PropsType extends ComponentPropsWithoutRef<'input'> {
	isisRequired?: boolean;
	labelTitle?: string;
	name: string;
	defaultValue?: string;
	placeholder?: string;
	isOnlyText?: boolean;
	siblings?: JSX.Element;
	handleState?: (key: string, value: string) => void;
	handlePattern?: (value: string) => string;
	handleValid?: (value: string) => string;
}

export default function CustomInput({
	isisRequired = false,
	labelTitle,
	name,
	defaultValue = '\u00A0',
	isOnlyText,
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
				{labelTitle && (
					<div className="col-form-label">
						{labelTitle}
						{isisRequired && <span className="isRequired">&nbsp;*</span>}
					</div>
				)}
				<div className="col-form-box">
					<div className="col-form-tag">
						{isOnlyText ? (
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
