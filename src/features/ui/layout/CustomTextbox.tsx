interface CustomTextboxProps {
	title: string;
	text: string;
}

export default function CustomTextbox(props: CustomTextboxProps) {
	const { title, text } = props;

	return (
		<>
			<div className="textBox row">
				<div className="textBox-title max-w-85px">{title}</div>
				<div className="textBox-text flex-1">{text}</div>
			</div>
		</>
	);
}
