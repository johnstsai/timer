import React from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Segment
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      format: 0,
      start: false,
      pause: false,
      end: false
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  onFormatChange = () => {
    if (this.state.format === 0) {
      this.setState({ format: 1 });
    } else {
      this.setState({ format: 0 });
    }
  };
  tick() {
    if (this.state.pause === false && this.state.start === true) {
      if (this.state.seconds > 0) {
        this.setState({ seconds: this.state.seconds - 1 });
      } else if (this.state.seconds === 0) {
        if (this.state.minutes > 0) {
          this.setState({ minutes: this.state.minutes - 1 });
          this.setState({ seconds: this.state.seconds + 59 });
        } else if (this.state.minutes === 0) {
          if (this.state.hours > 0) {
            this.setState({ hours: this.state.hours - 1 });
            this.setState({ minutes: this.state.minutes + 59 });
            this.setState({ seconds: this.state.seconds + 59 });
          } else if (this.state.hours === 0) {
            this.setState({ end: true });
          }
        }
      }
    }
  }
  handleHours = e => {
    this.setState({ hours: e.target.value });
  };
  handleMinutes = e => {
    this.setState({ minutes: e.target.value });
  };
  handleSeconds = e => {
    this.setState({ seconds: e.target.value });
  };
  handleStart = e => {
    e.preventDefault();
    this.setState({ start: true });
  };
  handlePause = () => {
    this.setState({ pause: !this.state.pause });
  };
  handleReset = () => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      start: false
    });
  };

  render() {
    return (
      <div>
        <Container>
          <Header as="h1">Countdown Timer</Header>
          <h2>Enter the time you want to count down</h2>
          <Form onSubmit={this.handleStart}>
            <Form.Group widths="equal">
              <Form.Input
                id="Hours"
                type="number"
                label="Hours"
                placeholder="0"
                onChange={this.handleHours}
              />
              <Form.Input
                id="Minutes"
                type="number"
                label="Minutes"
                placeholder="0"
                onChange={this.handleMinutes}
              />
              <Form.Input
                id="Seconds"
                type="number"
                label="Seconds"
                placeholder="0"
                onChange={this.handleSeconds}
              />
            </Form.Group>
            <Button onClick={this.handleStart}>Start</Button>
            <Button onClick={this.handlePause}>Pause</Button>
            <Button onClick={this.handleReset}>Reset</Button>
          </Form>
          <Divider />
          <Header as="h3">Timer</Header>
          <Button size="small" onClick={this.onFormatChange}>
            Change Format
          </Button>
          <Header as="h5">
            <Segment>
              {!this.state.start ? (
                <p>Enter the time you want to count down</p>
              ) : (
                <p>Start timer</p>
              )}
              {this.state.format === 0 ? (
                <p>
                  {this.state.hours}:{this.state.minutes}:{this.state.seconds}
                </p>
              ) : (
                <p>
                  {this.state.hours}Hours:{this.state.minutes}Minutes:
                  {this.state.seconds}Seconds
                </p>
              )}
            </Segment>
          </Header>
        </Container>
      </div>
    );
  }
}

export default App;
