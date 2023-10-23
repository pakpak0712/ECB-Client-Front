import { ReactNode } from 'react';

interface PropsType {
	title: string;
	children?: ReactNode;
}

export default function PageHeader({ title, children }: PropsType) {
	return (
		<div className="page-header">
			<h1 className="page-header-title">{title}</h1>
			<div className="text-end">{children}</div>
		</div>
	);
}
