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

const SubmitNest = Loadable({
    loader: () => import('../view/submitNest/submitNest'),
    loading: LoadingComponents
});

const SubmitArticle = Loadable({
    loader: () => import('../view/submitArticle/submitArticle'),
    loading: LoadingComponents
});

const NestDetail = Loadable({
    loader: () => import('../view/nestDetail/nestDetail'),
    loading: LoadingComponents
});

const ArticleDetail = Loadable({
    loader: () => import('../view/articleDetail/articleDetail'),
    loading: LoadingComponents
});

const Wo = Loadable({
    loader: () => import('../view/wo/wo'),
    loading: LoadingComponents
});

const Setting = Loadable({
    loader: () => import('../view/setting/setting'),
    loading: LoadingComponents
});

const Follow = Loadable({
    loader: () => import('../view/follow/follow'),
    loading: LoadingComponents
});

const Fans = Loadable({
    loader: () => import('../view/fans/fans'),
    loading: LoadingComponents
});

const ItemEvaluate = Loadable({
    loader: () => import('../view/itemEvaluate/itemEvaluate'),
    loading: LoadingComponents
});

const UserHome = Loadable({
    loader: () => import('../view/userHome/userHome'),
    loading: LoadingComponents
});

export const routes = [
    {
        path: '/home',
        component: Home,
    }, {
        path: '/submitNest',
        component: SubmitNest,
    }, {
        path: '/submitArticle',
        component: SubmitArticle,
    }, {
        path: '/nestDetail',
        component: NestDetail,
    }, {
        path: '/articleDetail',
        component: ArticleDetail,
    }, {
        path: '/wo',
        component: Wo,
    }, {
        path: '/setting',
        component: Setting,
    }, {
        path: '/follow',
        component: Follow,
    }, {
        path: '/fans',
        component: Fans,
    }, {
        path: '/itemEvaluate',
        component: ItemEvaluate,
    }, {
        path: '/userHome',
        component: UserHome,
    }
];

export const RouteWithSubRoutes = route => (
    <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />
);
