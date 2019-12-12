import React, { Fragment } from 'react';
import { EachWhole } from "@router";
import Eachrouter from "@utils/routerEach";
import { Switch, Redirect } from "react-router-dom"
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
class App extends React.Component {
  render() {
    return (
      <Fragment>
        <ConfigProvider locale={zhCN}>
          <Switch>
            {Eachrouter(EachWhole)}
            <Redirect from="/" to="/Login" />
          </Switch>
        </ConfigProvider>
      </Fragment>
    )
  }
}

export default App;
