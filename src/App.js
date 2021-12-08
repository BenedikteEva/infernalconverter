//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Grid, Menu, Icon, Message } from 'semantic-ui-react'
import ReactToPrint from './utils/ReactToPrint';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { written: "", header: "", message: "", visible: false };

  }

  handleChange = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value })
  }
  handleDismiss = () => this.setState({ visible: false })
  handleAbout = () => {
    let message = <div><b>Infernal converter converts latin letters into infernal letters.</b>

      https://benedikteeva.github.io/infernalconverter/public/index.html

      Infernal is dnd language.

      This is only for fun and a small gift for my son who is a dungeon master and needed some documents written in infernal for his players to translate.

      I have used the Barazhad Font made by "Pixel Sagas" - "Neale Davidson". which is shareware so I guess it is okay to use for this non-commercial project.
      https://www.fontspace.com/barazhad-font-f20325

      Besides using React I have also used react-to-print from this repository https://github.com/gregnb/react-to-print which is a great tool for any react project that requires perfect printing. </div>
    this.setState({ message, visible: true })

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
            <Menu.Item position="right" bordered color="white">Print&nbsp; <Icon color="grey" name="print" /></Menu.Item>}
          content={() => this.forwardRef}
        />
          <Menu.Item onClick={this.handleAbout}>About</Menu.Item>
        </Menu>
        {this.state.visible && <Message
          onDismiss={this.handleDismiss}
          header='about'
          content={this.state.message}
        />}
        <Grid columns="16">
          <Grid.Row >
            <Grid.Column width="5">
              <div className="englishText">
                <p>Input header</p>
                <input type="text" defaultValue={this.state.header} onChange={this.handleChange} id="header" />
                <br></br><br></br>
                <p>Input text</p>
                <textarea onChange={this.handleChange} defaultValue={this.state.written} id="written" /></div></Grid.Column>
            <Grid.Column width="11">
              <div className="hasToLookLikePaper"><div ref={el => (this.forwardRef = el)}><div className="font-face-in"><h2 >{this.state.header}</h2>
                {this.state.written}</div>
                <div className="pagebreak"><span className="font-face-normal"><h2 >{this.state.header}</h2>
                  {this.state.written}</span></div></div></div>
            </Grid.Column></Grid.Row></Grid>

      </div>
    );
  }
}
export default App;
