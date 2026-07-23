import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Reorders from "../pages/Reorders";
import Notifications from "@/pages/Notifications";
import Layout from "../components/layout/Layout";


const AppRoutes = () => {

    return (

        <Layout>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />


                <Route
                    path="/inventory"
                    element={<Inventory />}
                />


                <Route
                    path="/reorders"
                    element={<Reorders />}
                />
                <Route 
                path="/notifications"
                     element={<Notifications />}
                />

            </Routes>

        </Layout>

    );

};


export default AppRoutes;