/*
  mocking the jQuery get function
  returns the responseText
*/
$ = {
  get: function(url, callback){
    var req = new XMLHttpRequest();
    req.addEventListener("load", function(){
      callback(this.responseText);
    });
    req.open('GET', url);
    req.send();
  }
}

var GithubUser = React.createClass({
  getInitialState: function() {
    // set initial values that will be shown before the $.get
    return {
      username: '',
      url: '',
      avatarUrl: ''
      // followers is missing, but will be put in later
    };
  },
  componentDidMount: function() {
    // making the request after the mount
    $.get("https://api.github.com/users/" + this.props.name, function(result) {
      // get a JSON object from the HTTP response
      var user = JSON.parse(result);
      if (this.isMounted()) {
        this.setState({
          username: user.login,
          url: user.html_url,
          avatarUrl: user.avatar_url,
          followers: user.followers
        });
      }
    }.bind(this));
  },
  // create all the elements to show
  render: function(){
    return (
      <div>
        <h1>Welcome to: @{this.state.username}!</h1>
        <p>Visit them on GitHub: <a href={this.state.url}>@{this.state.username}</a></p>
        <p>They look like: <img src={this.state.avatarUrl} /></p>
        <p>They have <span className="followers">{this.state.followers}</span> followers so far.</p>
      </div>
    );
  }
});

// set the username here
ReactDOM.render(<GithubUser name="jonathanmh" />, document.getElementById('user'));
