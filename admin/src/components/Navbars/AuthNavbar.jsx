import React from 'react'
import { Link } from 'react-router-dom'
import {
	UncontrolledCollapse,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col,
} from 'reactstrap'
import logo from '../../assets/logo.png'
class AdminNavbar extends React.Component {
	render() {
		return (
			<>
				<Navbar
					className="navbar-top navbar-horizontal navbar-dark"
					expand="md"
				>
					<Container className="px-4">
						<img
							alt="..."
							src={logo}
							style={{ height: 145, width: 150 }}
						/>
						<button className="navbar-toggler" id="navbar-collapse-main">
							<span className="navbar-toggler-icon" />
						</button>
						<UncontrolledCollapse navbar toggler="#navbar-collapse-main">
							<div className="navbar-collapse-header d-md-none">
								<Row>
									<Col className="collapse-brand" xs="6">
										<Link to="/">
											<img alt="..." src={require('../../assets/logo.png')} />
										</Link>
									</Col>
								</Row>
							</div>
						</UncontrolledCollapse>
					</Container>
				</Navbar>
			</>
		)
	}
}

export default AdminNavbar
