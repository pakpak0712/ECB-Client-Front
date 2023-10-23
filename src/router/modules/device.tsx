import Device from '@/views/device/Device';

export default [
	{
		path: '/device',
		element: <Device />,
	},
	{
		path: '/device/:id',
		element: <Device />,
	},
];
