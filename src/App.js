import { Refine } from "@pankod/refine-core";
import "./styles/antd.less";
import {
    notificationProvider,
    ErrorComponent,
    Layout,
    AuthPage,
} from "@pankod/refine-antd";
import dataProvider from "./api/index";
import routerProvider from "@pankod/refine-react-router-v6";
import "./styles/antd.less";

import "@pankod/refine-antd/dist/styles.min.css";

import { Product, ProductCreate, ProductEdit, ProductShow } from "./pages/products";
import { Color, ColorCreate, ColorEdit, ColorShow } from "./pages/colors";
import {  Categorie, CategorieCreate, CategorieEdit, CategorieShow } from "./pages/categories";
// import Layout from "./components/layout";
import { Title } from "./components/title";
import { DashboardPage } from "./components/Dashboard";
import AuthProvider from "./api/auth";
import { CustomSider } from "./components/layout/sider";
// import Layout from "./components/layout";

const API_URL = "http://localhost:4000";

const App = () => {
    return (
        <Refine
            authProvider={AuthProvider}
            dataProvider={dataProvider(API_URL)}
            routerProvider={{
                ...routerProvider,
                routes:[
                    {
                        path: "/register",
                        element: <AuthPage type="register" />,
                    },
                    {
                        path: "/forgot-password",
                        element: <AuthPage type="forgotPassword" />,
                    },
                    {
                        path: "/update-password",
                        element: <AuthPage type="updatePassword" />,
                    },
                ]
            }}
            LoginPage={AuthPage}
            resources={[
                {
                    name: "products",
                    list: Product,
                    create: ProductCreate,
                    edit: ProductEdit,
                    show: ProductShow,
                },
                {
                    name: "colors",
                    list: Color,
                    create: ColorCreate,
                    edit: ColorEdit,
                    show: ColorShow,
                },
                {
                    name: "categories",
                    list: Categorie,
                    create: CategorieCreate,
                    edit: CategorieEdit,
                    show: CategorieShow,
                }
            ]}
            Sider={CustomSider}
            DashboardPage={DashboardPage}
            notificationProvider={notificationProvider}
            Layout={Layout}
            Title={Title}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
