import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

// const controller = new AbortController();
// const signal = controller.signal;

class App extends Component {
  controller = new AbortController();
  signal = this.controller.signal;
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }


  componentDidMount = () => {
    this.fetchingPhoto();
    this.fetchingPosts();
  }

  cancelRequest = () => {
    this.controller.abort();
    console.log('========> signal cancel', this.signal, this.controller);
    this.fetchingPhoto();
  }

  fetchingData = () => {
    if (this.controller) {
      this.controller.abort();
    }
    if (AbortController) {
        this.controller = new AbortController();
        this.signal = this.controller.signal;
    }
    this.fetchingPosts();
    this.fetchingPhoto();
  }
  
  fetchingPhoto = async () => {
    console.log('========> signal fetch', this.signal);
    const res = await fetch('https://jsonplaceholder.typicode.com/photos', {signal: this.signal});
    if (res.status === 200) {
      const data = await res.json();
      this.setState({
        data
      })
    }
  }

  fetchingPosts = async () => {
    console.log('========> signal fetch', this.signal);
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (res.status === 200) {
      const posts = await res.json();
      this.setState({
        posts
      })
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {`${this.state.data.title} ${Math.random()}`}
          </p>
          <button style={{ height: "40px", fontSize: '16px', padding: '10px'}} onClick={this.fetchingData}>
            fetch
          </button>
          <button style={{ height: "40px", fontSize: '16px', padding: '10px'}} onClick={this.cancelRequest}>
            abort
          </button>
        </header>
      </div>
    );
  }
}

export default App;
