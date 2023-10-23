import { ComponentPropsWithoutRef, ReactNode, useEffect, useState } from 'react';

import { Option } from '@/class/common';

interface PropsType extends ComponentPropsWithoutRef<'select'> {
	required?: boolean;
	title?: string;
	name?: string;
	defaultValue?: string | number | undefined;
	children?: ReactNode;
	childrenOption?: Option[];
	enableBlankSelect?: boolean;
	readOnly?: boolean;
	siblings?: JSX.Element;
	handleState?: (...args: any[]) => void;
}

export default function CustomSelect({
	required,
	title,
	name,
	defaultValue,
	children,
	childrenOption,
	enableBlankSelect,
	readOnly,
	siblings,
	handleState,
	...restAttribute
}: PropsType) {
	const [value, setValue] = useState(defaultValue);

	const handleChange = (value: string) => {
		setValue(value);
		if (handleState) {
			name ? handleState(name, value) : handleState(value);
		}
	};

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
					{readOnly ? (
						<p className="form-text">{defaultValue}</p>
					) : (
						<div className="col-form-tag">
							<select
								className={`form-select ${!siblings || 'me-2'}`}
								name={name}
								value={value}
								onChange={(event) => handleChange(event.target.value)}
								{...restAttribute}
							>
								{enableBlankSelect && (
									<option disabled value="">
										선택
									</option>
								)}
								{childrenOption
									? childrenOption.map((column, index) => (
											<option key={index} value={column.value}>
												{column.text}
											</option>
									  ))
									: children}
							</select>
							{siblings && siblings}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
