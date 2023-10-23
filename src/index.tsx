// css
import '@fortawesome/fontawesome-free/css/all.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDom from 'react-dom/client';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

// bootstrap
import '@/assets/styles/app.scss';
import AlertModal from '@/features/ui/modal/AlertModal';
import ConfirmModal from '@/features/ui/modal/ConfirmModal';
import ContentsModal from '@/features/ui/modal/ContentsModal';
import router from '@/router';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 10000,
			keepPreviousData: true,
			refetchOnWindowFocus: true,
		},
	},
});

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<RecoilRoot>
			<RouterProvider router={router} />
			<AlertModal />
			<ConfirmModal />
			<ContentsModal />
			<ReactQueryDevtools initialIsOpen={false} />
		</RecoilRoot>
	</QueryClientProvider>,
	// </React.StrictMode>
);
