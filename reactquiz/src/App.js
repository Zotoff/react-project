import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout.js'
import Quiz from './containers/Quiz/Quiz.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Layout>
            <Quiz />
          </Layout>
        </header>
      </div>
    );
  }
}

export default App;
