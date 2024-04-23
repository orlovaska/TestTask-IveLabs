import React from "react";
import { Layout, Menu } from "antd";
import { BRIGADES_ROUTE, GRAPH_ROUTE } from "../routing/routesConsts";
import { Link } from "react-router-dom";

const { Header } = Layout;

interface NavbarProps {
    activeKey: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeKey }) => {
    return (
        <Layout className="layout">
            <Header>
                <Menu theme="dark" mode="horizontal" selectedKeys={[activeKey]}>
                    <Menu.Item key={BRIGADES_ROUTE}>
                        <Link to={BRIGADES_ROUTE}>Бригады</Link>
                    </Menu.Item>
                    <Menu.Item key={GRAPH_ROUTE}>
                        <Link to={GRAPH_ROUTE}>График</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        </Layout>
    );
};

export default Navbar;
