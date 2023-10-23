import { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ConfigType {
	[key: string]: {
		name: string;
		value: string | Date | null | undefined;
	};
}

interface PropsType {
	title?: string;
	config: ConfigType;
	handleState: (key: string, value: string | number) => void;
}

export default function CustomStartToEndDatePicker({ title, config, handleState }: PropsType) {
	const handleSelectChange = (date: Date | null) => {
		return (name: string) => {
			if (date) {
				handleState(name, date?.toISOString().slice(0, 10));
			}
		};
	};

	return (
		<>
			<div className="form-content">
				{title && <div className="col-form-label">{title}</div>}
				<div className="col-form-tag">
					{Object.values(config).map((data, index) => {
						const { name, value, ...rest } = data;
						return (
							<Fragment key={index}>
								<DatePicker
									className="form-control w-95px text-center"
									name={name}
									selected={value ? new Date(value) : null}
									dateFormat="yyyy-MM-dd"
									onChange={(date) => handleSelectChange(date)(name)}
									{...rest}
								/>
								{index % 2 === 0 && <div className="w-auto bg-transparent border-0 p-2">~</div>}
							</Fragment>
						);
					})}
				</div>
			</div>
		</>
	);
}
