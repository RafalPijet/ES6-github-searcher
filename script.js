const formStyles = {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px"
};

const boxStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "70px",
    maxWidth: "110px",
    padding: "10px"
};

const listStyles = {
    display: "flex",
    flexWrap: "wrap"
};

class UsersList extends React.Component {
    get users() {
        return this.props.users.map(user => <User key={user.id} user={user}/>);
    }

    render() {
        return (
            <div style={listStyles}>
                {this.users}
            </div>
        )
    };
}

class User extends React.Component {
    render() {
        return (
            <div style={boxStyles}>
                <img src={this.props.user.avatar_url} style={{maxWidth: "100px", maxHeight: "100px"}}/>
                <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
            </div>
        )
    };
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: "",
            users: []
        };
    }

    onChangeHandle(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const {searchText} = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => this.setState({users: responseJson.items}))
    };

    render() {
        return (
            <div>
                <form onSubmit={event => this.onSubmit(event)} style={formStyles}>
                    <label htmlFor={this.state.searchText} style={{fontSize: "25px", textTransform: "uppercase"}}>Search by user name:</label>
                    <input
                        type="text"
                        id="searchText"
                        onChange={event => this.onChangeHandle(event)}
                        value={this.state.searchText}
                        style={{fontSize: "18px", marginLeft: "20px"}}/>
                </form>
                <UsersList users={this.state.users}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));