import React from 'react';

class NoMatch extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'NoMatch';
      this._isMounted = false;
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    componentDidMount() {
      this._isMounted = true;
    }
    render() {
        return <div>404 页面没找到哦！</div>;
    }
}

export default NoMatch;
