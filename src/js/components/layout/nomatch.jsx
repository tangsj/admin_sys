import React from 'react';

class NoMatch extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'NoMatch';
    }
    render() {
        return <div>404</div>;
    }
}

export default NoMatch;
