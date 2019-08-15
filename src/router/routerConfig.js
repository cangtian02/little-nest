import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/loading/loading';

const LoadingComponents = ({ isLoading, error }) => {
    if (isLoading) {
        return <Loading />;
    } else if (error) {
        return <div>啊哦，页面加载错误。。。</div>;
    } else {
        return null;
    }
};

const Home = Loadable({
    loader: () => import('../view/home/home'),
    loading: LoadingComponents
});

const Submit = Loadable({
    loader: () => import('../view/submit/submit'),
    loading: LoadingComponents
});

const Detail = Loadable({
    loader: () => import('../view/detail/detail'),
    loading: LoadingComponents
});

const Wo = Loadable({
    loader: () => import('../view/wo/wo'),
    loading: LoadingComponents
});

export const routes = [
    {
        path: '/home',
        component: Home,
    }, {
        path: '/submit',
        component: Submit,
    }, {
        path: '/detail',
        component: Detail,
    }, {
        path: '/wo',
        component: Wo,
    },
];

export const RouteWithSubRoutes = route => (
    <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />
);
