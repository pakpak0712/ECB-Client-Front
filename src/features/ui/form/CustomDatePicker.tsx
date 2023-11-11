import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePicker {
	isRequired?: boolean;
	title?: string;
	name: string;
	defaultValue?: string | Date;
	handleState?: (key: string, value: string | number) => void;
}

export default function CustomDatePicker(props: CustomDatePicker) {
	const { isRequired = false, title, name, defaultValue, handleState, ...rest } = props;

	const handleSelectChange = (date: Date | null) => {
		return (name: string) => {
			if (date && handleState) {
				handleState(name, date?.toISOString().slice(0, 10));
			}
		};
	};

	return (
		<>
			<div className="form-content">
				{title && (
					<div className="col-form-label">
						{title}
						{isRequired && <span className="required">&nbsp;*</span>}
					</div>
				)}

				<div className="col-form-tag">
					<DatePicker
						className="form-select form-select-date"
						name={name}
						selected={new Date(defaultValue || '')}
						dateFormat="yyyy-MM-dd"
						onChange={(date) => handleSelectChange(date)(name)}
						{...rest}
					/>
				</div>
			</div>
		</>
	);
}
