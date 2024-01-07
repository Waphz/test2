import { HomePage, TasksPage, ProfilePage, AlojamentPage, Reservas, Clientes, TransacoesFinanceiras, ServicosManutencao, Comunicacoes, TesteChatbot } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/tasks',
        element: TasksPage
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    },
    {
        path: '/Alojamentos',
        element: AlojamentPage
    },
    {
        path: '/Reservas',
        element: Reservas
    },
    {
        path: '/Clientes',
        element: Clientes
    },
    {
        path: '/TransacoesFinanceiras',
        element: TransacoesFinanceiras
    },
    {
        path: '/ServicosManutencao',
        element: ServicosManutencao
    },
    {
        path: '/Comunicacoes',
        element: Comunicacoes
    },
    {
        path: '/TesteChatbot',
        element: TesteChatbot
    }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});


