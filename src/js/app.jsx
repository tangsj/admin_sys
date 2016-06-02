/**
 * 引入站点样式
 * @author tangsj
 */
import 'antd/dist/antd.css';
import '../css/main.css';

import { Router, Route, browserHistory, IndexRoute, hashHistory } from 'react-router';

import { App, Dashboard, UserIndex, UserList, NoMatch } from 'components/index';

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Dashboard }/>
      <Route path="/user" component={ UserIndex }>
        <IndexRoute component={ UserList }/>
        <Route path="list" component={ UserList }></Route>
      </Route>

      <Route path="*" component={ NoMatch }></Route>
    </Route>
  </Router>
), document.querySelector('#app'));