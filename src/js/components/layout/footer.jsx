class Footer extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'Footer';
      this._isMounted = false;
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    componentDidMount() {
      this._isMounted = true;
    }
    render() {
        return <footer className="footer">@codecook</footer>;
    }
}

export default Footer;
