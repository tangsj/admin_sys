
class ProjectIndex extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProjectIndex';
    }
    componentDidMount() {
    }
    render() {
        return <div>{ this.props.children }</div>;
    }
}

export default ProjectIndex;
