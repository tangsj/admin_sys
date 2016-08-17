
import { Breadcrumb } from 'antd';
import Header from 'components/layout/header';
import Nav from 'components/layout/nav';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
    }
    render() {
        return (
          <div className="app-container">
            <Header />

            <section id="main">
              <Nav/>

              <div className="content">
                {
                  this.props.children
                }
              </div>
            </section>
          </div>
        );
    }
}

import NoMatch from 'components/layout/nomatch';
import Dashboard from 'components/layout/dashboard';
import UserIndex from 'components/layout/user/index'
import UserList from 'components/layout/user/list';
import ProjectIndex from 'components/layout/project/index';
import ProjectList from 'components/layout/project/list';
import ProjectAdd from 'components/layout/project/add';
import ProjectLineList from 'components/layout/project/linelist';
import ProjectLineAdd from 'components/layout/project/lineadd';
import ProjectServiceList from 'components/layout/project/servicelist';
import ProjectServiceAdd from 'components/layout/project/serviceadd';
import ProjectAEList from 'components/layout/project/aelist';
import ProjectAEAdd from 'components/layout/project/aeadd';

module.exports = {
  App, NoMatch, Dashboard, UserIndex, UserList, ProjectIndex, ProjectLineList,
  ProjectLineAdd, ProjectList, ProjectAdd, ProjectServiceList, ProjectServiceAdd,
  ProjectAEList, ProjectAEAdd
}
