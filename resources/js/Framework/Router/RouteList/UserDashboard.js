import Profile from '~/Framework/Components/Modules/User/Profile';
import Events from '~/Framework/Components/Modules/User/Events';
import HrDocuments from '~/Framework/Components/Modules/User/HrDocuments';
import EDirectory from '~/Framework/Components/Modules/User/EDirectory';

export default [
    {
        path: 'profile',
        name: 'user-profile-page',
        middleware: ['RequiredAuth'],
        component: Profile,
    },
    {
        path: '',
        name: 'user-page',
        middleware: ['RequiredAuth'],
        component: Events,
    },
    {
        path: 'my-events',
        name: 'user-events-page',
        middleware: ['RequiredAuth'],
        component: Events,
    },
    {
        path: 'documents',
        name: 'user-documents-page',
        middleware: ['RequiredAuth'],
        component: HrDocuments,
    },
    {
        path: 'e-directory',
        name: 'user-e-directory-page',
        middleware: ['RequiredAuth'],
        component: EDirectory,
    },
];
