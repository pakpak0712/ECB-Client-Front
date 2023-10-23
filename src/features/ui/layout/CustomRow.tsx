import { ReactNode } from 'react';

export default function CustomRow({ children }: { children: ReactNode | ReactNode[] }) {
	const isArray = Array.isArray(children);
	const childArray = isArray ? children : [children];
	const componentChild = childArray?.filter((item) => typeof item === 'object');
	const childrenLength = componentChild.length;
	const col = 12 / childrenLength;
	const isEven = childrenLength % 2 === 0;
	const colSm = isEven ? `col-sm-${col * 2}` : `col-sm-${col}`;

	return (
		<div className="row">
			{componentChild.map((child, index) => (
				<div key={index} className={`${colSm} col-md-${col}`}>
					{child}
				</div>
			))}
		</div>
	);
}
