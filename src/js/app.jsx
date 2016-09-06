/**
 * 引入站点样式
 * @author tangsj
 */
import 'antd/dist/antd.css';
import '../css/main.css';

import { Router, Route, browserHistory, IndexRoute, hashHistory } from 'react-router';

import Login from 'components/layout/login';
import { enterAuth } from 'routerAuth';

import {
  App, Dashboard,
  UserIndex, UserList,
  ProjectIndex, ProjectLineList, ProjectLineAdd,
  ProjectList, ProjectAdd, ProjectServiceAdd, ProjectServiceList,
  ProjectAEList, ProjectAEAdd,
  NoMatch
} from 'components/index';


ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="login" component={ Login }></Route>

    <Route path="/" onEnter= { enterAuth } component={ App }>
      <IndexRoute component={ Dashboard }/>
      <Route path="user" component={ UserIndex }>
        <IndexRoute component={ UserList }/>
        <Route path="list" component={ UserList }></Route>
      </Route>

      <Route path="project" component={ ProjectIndex }>
        <IndexRoute component={ ProjectList }/>
        <Route path="list" component={ ProjectList }></Route>
        <Route path="add" component={ ProjectAdd }></Route>
        <Route path="edit/:id" component={ ProjectAdd }></Route>
        <Route path="line/add" component={ ProjectLineAdd }></Route>
        <Route path="line/list" component={ ProjectLineList }></Route>
        <Route path="service/add" component={ ProjectServiceAdd }></Route>
        <Route path="service/edit/:id" component={ ProjectServiceAdd }></Route>
        <Route path="service/list" component={ ProjectServiceList }></Route>
        <Route path="ae/add" component={ ProjectAEAdd }></Route>
        <Route path="ae/edit/:id" component={ ProjectAEAdd }></Route>
        <Route path="ae/list" component={ ProjectAEList }></Route>
      </Route>
    </Route>

    <Route path="*" component={ NoMatch }></Route>
  </Router>
), document.querySelector('#app'));