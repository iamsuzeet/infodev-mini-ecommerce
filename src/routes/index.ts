import { lazy } from 'react';
import { externalRoute } from './DistinctRoute/External';
import { internalRoute } from './DistinctRoute/Internal';

const Login = lazy(() => import("../core/Public/Login/Login"));
const Register = lazy(() => import("../core/Public/Register/Register"));

const Boundary = lazy(() => import("../core/Protected/Boundary"));
const Product = lazy(() => import("core/Public/Product/Product"))
const Cart = lazy(() => import("core/Public/Cart/Cart"))


export const appRoutes: CustomRoute[] = [
    {
        path: "/login",
        component: Login,
        type: "unauthorized"
    },
    {
        path: "/register",
        component: Register,
        type: "unauthorized"
    },
    {
        path: '/product',
        component: Product,
        type: "unauthorized"
    },
    {
        path: '/cart',
        component: Cart,
        type: "unauthorized"
    },
    {
        path: "/",
        component: Boundary,
        children: [...internalRoute, ...externalRoute],
    }
]
