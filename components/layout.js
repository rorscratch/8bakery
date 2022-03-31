// components/Layout.js

import Header from "./Header";
import IslanderNavbar from "./navbar"

const layoutStyle = {
  flexDirection: "column",
  height: "100%",
  width: "100%"
};

const contentStyle = {
  flex: 1,
  flexDirection: "column"
};

const Layout = props => (
  <div className="Layout" style={layoutStyle}>
    <Header />
    <IslanderNavbar />
    <div className="Content" style={contentStyle}>
      {props.children}
    </div>

  </div>
);

export default Layout;