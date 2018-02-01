import sockette from "sockette";

export default ({ Component, createElement }) => {
	return class extends Component {
		constructor(props, context) {
			super(props, context);
			this.ws = null;
		}
		componentDidMount() {
			const { props } = this;
			const { url, getSocket } = props;
			this.ws = sockette(url, props);
			typeof getSocket === 'function' && getSocket(this.ws);
		}
		shouldComponentUpdate() {
			return false;
		}
		componentWillUnmount() {
			this.ws.close();
		}
		render() {
			return null;
		}
	};
};
