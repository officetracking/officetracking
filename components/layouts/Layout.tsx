import { Layout } from "antd";
import { ReactNode } from "react";
import LayoutFooter from "./Footer";
import LayoutHeader from "./Header";
import LayoutSider from "./Sidebar";

type Props = {
  children?: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <Layout>
      <LayoutHeader />
      <Layout style={{ marginLeft: 200 }}>
        <LayoutSider />
        <Layout>
          {children}
          <LayoutFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
