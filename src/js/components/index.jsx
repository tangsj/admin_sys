
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

module.exports = {
  App, NoMatch, Dashboard, UserIndex, UserList
}
