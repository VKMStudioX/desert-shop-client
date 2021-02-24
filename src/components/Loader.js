import React from "react"
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const loadingIcon = <LoadingOutlined style={{ fontSize: "100px", color: "#fff" }} spin />;

const Loader = () => {

    return (
     <Spin indicator={loadingIcon} />
    );
}

export default Loader;