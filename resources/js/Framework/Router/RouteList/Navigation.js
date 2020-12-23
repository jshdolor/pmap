import Routes from './../Routes';

import HomePage from '~/Framework/Components/Modules/Home';
import AboutPage from '~/Framework/Components/Modules/About';
import EventsPage from '~/Framework/Components/Modules/Events';
import EventsListPage from '~/Framework/Components/Modules/Events/List';

import HrNews from '~/Framework/Components/Modules/HrNews';
import HrNewsListPage from '~/Framework/Components/Modules/HrNews/List';

import DynamicPage from '~/Framework/Components/Modules/DynamicPage';
import GalleryPage from '~/Framework/Components/Modules/Gallery';
import TicketSearchPage from '~/Framework/Components/Modules/TicketSearch';

import UserPage from '~/Framework/Components/Modules/User';
import UserDashboardRoutes from '~/Framework/Router/RouteList/UserDashboard';

import ResetPasswordPage from '~/Framework/Components/Modules/ResetPassword';

import WebinarListPage from '~/Framework/Components/Modules/Webinar/List';
import WebinarPage from '~/Framework/Components/Modules/Webinar';

import BooksListPage from '~/Framework/Components/Modules/Book/List';
import BookPage from '~/Framework/Components/Modules/Book';

import MagazinesListPage from '~/Framework/Components/Modules/Magazine/List';
import MagazinePage from '~/Framework/Components/Modules/Magazine';

export default class NavigationRoutes {
    constructor() {
        let routes = [
            {
                path: '/',
                name: 'home-route',
                component: HomePage,
            },
            {
                path: '/about-us',
                name: 'about-us-route',
                component: AboutPage,
            },

            {
                path: '/events/',
                name: 'events-list-route',
                component: EventsListPage,
            },

            {
                path: '/events/:id?',
                name: 'events-route',
                component: EventsPage,
            },

            {
                path: '/page/:slug?',
                name: 'page-route',
                component: DynamicPage,
            },

            {
                path: '/gallery/:slug?',
                name: 'gallery-route',
                component: GalleryPage,
            },

            {
                path: '/user',
                component: UserPage,
                middleware: ['RequiredAuth'],
                children: UserDashboardRoutes,
            },

            {
                path: '/ticket-search/:code?',
                name: 'ticket-search-route',
                component: TicketSearchPage,
            },

            {
                path: '/hr-news/',
                name: 'hr-news-list-route',
                component: HrNewsListPage,
            },

            {
                path: '/hr-news/:slug',
                name: 'hr-news-route',
                component: HrNews,
            },

            {
                path: '/user-password/reset/:code',
                name: 'user-reset-password-route',
                component: ResetPasswordPage,
            },

            {
                path: '/webinar',
                name: 'webinar-list-route',
                component: WebinarListPage,
            },

            {
                path: '/webinar/:slug',
                name: 'webinar-route',
                component: WebinarPage,
            },

            {
                path: '/books',
                name: 'books-list-route',
                component: BooksListPage,
            },

            {
                path: '/books/:id',
                name: 'book-route',
                component: BookPage,
            },

            {
                path: '/pmm',
                name: 'magazines-list-route',
                component: MagazinesListPage,
            },

            {
                path: '/pmm/:id',
                name: 'magazine-route',
                component: MagazinePage,
            },
        ];

        Routes.add(routes);
    }
}
