import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

const CardList = props => {
  return (
    // another short way of doing this is using: {testData.map(profile => <Card {...profile}/>)}
    <div>
      {props.profiles.map(profile => {
        return <Card key={profile.id} {...profile} />;
      })}
    </div>
  );
};

class Form extends React.Component {
  // using form component allows using some native operations like required
  userNameInput = React.createRef();
  handleSubmit = event => {
    event.preventDefault(); // prevent default form submit behaviour
    // this.userNameInput is just a reference created by React to the HTML input
    // we could have used DOM API to get the element getElementById
    console.log(this.userNameInput.current.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Github username"
          ref={this.userNameInput}
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
  }
  addNewProfile = profileData => {
    console.log("App", profileData);
    this.setState(prevState => {
      return { profiles: [...prevState.profiles, profileData] };
    });
  };

  render() {
    // required function for the react class component
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App title="The Github Cards App" />, rootElement);
