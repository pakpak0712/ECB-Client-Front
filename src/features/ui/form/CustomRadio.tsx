import { Fragment, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

interface ConfigType {
	text: string;
	value: string;
}

interface PropsType {
	title?: string;
	name: string;
	defaultValue?: string;
	config: ConfigType[];
	handleState: (key: string, value: string) => void;
}

export default function CustomRadio({ title, name, defaultValue, config, handleState }: PropsType) {
	const [value, setValue] = useState(defaultValue);

	const handleChange = (originValue: string) => {
		setValue(value);
		if (handleState) handleState(name, originValue);
	};

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return (
		<>
			<div className="form-content">
				{title && <div className="col-form-label">{title}</div>}
				<div className="col-form-box">
					<div className="col-form-tag">
						{config.map((data, index) => {
							const id = `${data.text}-${data.value}`;
							return (
								<Fragment key={id}>
									<input
										type="radio"
										name={name}
										id={id}
										className="form-check-input"
										checked={defaultValue === data.value}
										value={data.value}
										onChange={(event) => handleChange(event.target.value)}
									/>
									<label htmlFor={id} className="form-check-title me-3 ms-2">
										{data.text}
									</label>
								</Fragment>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
