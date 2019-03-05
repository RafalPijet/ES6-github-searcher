"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var formStyles = {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px"
};

var boxStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "70px",
    maxWidth: "110px",
    padding: "10px"
};

var listStyles = {
    display: "flex",
    flexWrap: "wrap"
};

var UsersList = function (_React$Component) {
    _inherits(UsersList, _React$Component);

    function UsersList() {
        _classCallCheck(this, UsersList);

        return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).apply(this, arguments));
    }

    _createClass(UsersList, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: listStyles },
                this.users
            );
        }
    }, {
        key: "users",
        get: function get() {
            return this.props.users.map(function (user) {
                return React.createElement(User, { key: user.id, user: user });
            });
        }
    }]);

    return UsersList;
}(React.Component);

var User = function (_React$Component2) {
    _inherits(User, _React$Component2);

    function User() {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
    }

    _createClass(User, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: boxStyles },
                React.createElement("img", { src: this.props.user.avatar_url, style: { maxWidth: "100px", maxHeight: "100px" } }),
                React.createElement(
                    "a",
                    { href: this.props.user.html_url, target: "_blank" },
                    this.props.user.login
                )
            );
        }
    }]);

    return User;
}(React.Component);

var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App() {
        _classCallCheck(this, App);

        var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this3.state = {
            searchText: "",
            users: []
        };
        return _this3;
    }

    _createClass(App, [{
        key: "onChangeHandle",
        value: function onChangeHandle(event) {
            this.setState({
                searchText: event.target.value
            });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            var _this4 = this;

            event.preventDefault();
            var searchText = this.state.searchText;

            var url = "https://api.github.com/search/users?q=" + searchText;
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (responseJson) {
                return _this4.setState({ users: responseJson.items });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { onSubmit: function onSubmit(event) {
                            return _this5.onSubmit(event);
                        }, style: formStyles },
                    React.createElement(
                        "label",
                        { htmlFor: this.state.searchText, style: { fontSize: "25px", textTransform: "uppercase" } },
                        "Search by user name:"
                    ),
                    React.createElement("input", {
                        type: "text",
                        id: "searchText",
                        onChange: function onChange(event) {
                            return _this5.onChangeHandle(event);
                        },
                        value: this.state.searchText,
                        style: { fontSize: "18px", marginLeft: "20px" } })
                ),
                React.createElement(UsersList, { users: this.state.users })
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
