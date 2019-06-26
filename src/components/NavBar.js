import React from 'react'
import {
  Nav,
  Form,
  Button,
  Navbar,
  FormControl,
} from 'react-bootstrap'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <Navbar className="justify-content-end" bg="dark" variant="dark">
        <Navbar.Brand href="#home" style={{ position: 'absolute', left: '2%', height: '100%' }}>
          <img
            alt=""
            src={require('../logo.jpeg')}
            className="d-inline-block align-top"
            style={{
              height: '100%',
            }}
          />
        </Navbar.Brand>
        <Nav activeKey="/home">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })}/>
            <Button onClick={() => this.onSearchMovies()} variant="outline-success">Search</Button>
          </Form>
          <Nav.Item>
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}

// export default NavBar;
export { NavBar };
