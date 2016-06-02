
class UserIndex extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserIndex';
    }
    componentDidMount() {
    }
    render() {
        return <div>{ this.props.children }</div>;
    }
}

export default UserIndex;
