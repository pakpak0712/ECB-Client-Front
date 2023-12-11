import { ComponentPropsWithoutRef, useEffect, useState } from 'react';

import { Option } from '@/class/common';
import CustomOptionAfterFetch from '@/features/ui/form/CustomOptionAfterFetch';

interface PropsType extends ComponentPropsWithoutRef<'select'> {
	isRequired?: boolean;
	labelTitle?: string;
	name?: string;
	defaultValue?: string | number | undefined;
	optionFetch?: {
		queryKey: (string | object | unknown)[];
		dataKey: string;
		enableBlankSelect?: boolean;
	};
	optionDictionary?: Option[];
	enableBlankSelect?: boolean;
	isOnlyText?: boolean;
	siblings?: JSX.Element;
	handleState?: (...args: any[]) => void;
}

export default function CustomSelect({
	isRequired,
	labelTitle,
	name,
	defaultValue,
	optionFetch,
	optionDictionary,
	enableBlankSelect,
	isOnlyText,
	siblings,
	handleState,
	...restAttribute
}: PropsType) {
	const [value, setValue] = useState(defaultValue);
	const [_, setIsOptionFetched] = useState(false);

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
				{labelTitle && (
					<div className="col-form-label">
						{labelTitle}
						{isRequired && <span className="required">&nbsp;*</span>}
					</div>
				)}
				<div className="col-form-box">
					{isOnlyText ? (
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
								{optionDictionary &&
									optionDictionary.map((column, index) => (
										<option key={index} value={column.value}>
											{column.text}
										</option>
									))}
								{optionFetch && <CustomOptionAfterFetch {...optionFetch} setIsOptionFetched={setIsOptionFetched} />}
							</select>
							{siblings && siblings}
						</div>
					)}
				</div>
			</div>
		</>
	);
	// }
}
