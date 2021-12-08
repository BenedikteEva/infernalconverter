//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Grid , Menu, Icon } from 'semantic-ui-react'
import ReactToPrint from './utils/ReactToPrint';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { written: "", header:"" };

  }

  handleChange = (evt) => {
    this.setState({ [evt.target.id]:evt.target.value})
  }


  render() {
    return (
      <div className="App">
        <div className="header">
        <h2 className="headLine">Infernal language converter.</h2>
        <div className="font-face-in headLine">Infernal language converter.
        </div>
        <hr></hr></div>
        <Menu><ReactToPrint 
                trigger={() =>
                    <Menu.Item position="right" bordered color="white">Udskriv&nbsp; <Icon color="grey" name="print" /></Menu.Item>}
                content={() => this.forwardRef}
            /></Menu>
        <Grid columns="16">
          <Grid.Row >
            <Grid.Column width="5">
              <div className="englishText">
              <p>Input header</p>
              <input type="text" defaultValue={this.state.header} onChange={this.handleChange} id="header"/>
              <br></br><br></br>
              <p>Input text</p>
                <textarea onChange={this.handleChange} defaultValue={this.state.written} id="written" /></div></Grid.Column>
            <Grid.Column width="11">
              <div className="hasToLookLikePaper"><div ref={el => (this.forwardRef = el)}><div  className="font-face-in"><h2 >{this.state.header}</h2>
              {this.state.written}</div>
              <div className="pagebreak"><span  className="font-face-normal"><h2 >{this.state.header}</h2>
              {this.state.written}</span></div></div></div>
            </Grid.Column></Grid.Row></Grid>

      </div>
    );
  }
}
export default App;
