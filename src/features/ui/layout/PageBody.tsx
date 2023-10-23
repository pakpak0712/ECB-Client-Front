import { ReactNode } from 'react';

interface PropsType {
	title: string;
	children?: ReactNode;
}

export default function PageBody({ title, children }: PropsType) {
	return (
		<div className="page-contents">
			<h1 className="page-contents-header">{title}</h1>
			<div className="page-contents-body">{children}</div>
		</div>
	);
}
