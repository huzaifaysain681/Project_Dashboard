import React from 'react'
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import {
	Collapse,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col,
} from 'reactstrap'

class Sidebar extends React.Component {
	state = {
		collapseOpen: false,
	}
	constructor(props) {
		super(props)
		this.activeRoute.bind(this)
	}
	// verifies if routeName is the one active (in browser input)
	activeRoute(routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
	}
	// toggles collapse between opened and closed (true/false)
	toggleCollapse = () => {
		this.setState({
			collapseOpen: !this.state.collapseOpen,
		})
	}
	// closes the collapse
	closeCollapse = () => {
		this.setState({
			collapseOpen: false,
		})
	}
	// creates the links that appear in the left menu / Sidebar
	createLinks = routes => {
		return routes.map((prop, key) => {
			if (key <= 6) {
				if (prop.name === 'Logout') {
					return null
				}
				if (localStorage.getItem('userType') !== 'master') {
					if (
						prop.name === 'Manage Roles' ||
						(localStorage.getItem('userType') === 'admin' &&
							prop.name === 'Payments') ||
						(localStorage.getItem('userType') === 'accountant' &&
							(prop.name === 'Configure Services' ||
								prop.name === 'Notifications'))
					) {
						return null
					} else {
						return (
							<NavItem key={key}>
								<NavLink
									to={prop.layout + prop.path}
									tag={NavLinkRRD}
									onClick={this.closeCollapse}
									activeClassName="active"
								>
									<i className={prop.icon} />
									{prop.name}
								</NavLink>
							</NavItem>
						)
					}
				} else {
					return (
						<NavItem key={key}>
							<NavLink
								to={prop.layout + prop.path}
								tag={NavLinkRRD}
								onClick={this.closeCollapse}
								activeClassName="active"
							>
								<i className={prop.icon} />
								{prop.name}
							</NavLink>
						</NavItem>
					)
				}
			}
		})
	}
	render() {
		const { bgColor, routes, logo } = this.props
		let navbarBrandProps
		if (logo && logo.innerLink) {
			navbarBrandProps = {
				to: logo.innerLink,
				tag: Link,
			}
		} else if (logo && logo.outterLink) {
			navbarBrandProps = {
				href: logo.outterLink,
				target: '_blank',
			}
		}
		return (
			<Navbar
				className="navbar-vertical fixed-left navbar-light bg-white"
				expand="md"
				id="sidenav-main"
			>
				<Container fluid>
					<img
						alt={logo.imgAlt}
						src={logo.imgSrc}
						style={{
							height: 215,
							width: 220,
							alignSelf: 'center',
							marginLeft: '30px',
							marginRight: '30px',
						}}
					/>
					{/* Toggler */}
					<button
						className="navbar-toggler"
						type="button"
						onClick={this.toggleCollapse}
					>
						<span className="navbar-toggler-icon" />
					</button>
					{/* Collapse */}
					<Collapse navbar isOpen={this.state.collapseOpen}>
						{/* Collapse header */}
						<div className="navbar-collapse-header d-md-none">
							<Row>
								{logo ? (
									<Col className="collapse-brand" xs="6">
										{logo.innerLink ? (
											<Link to={logo.innerLink}>
												<img alt={logo.imgAlt} src={logo.imgSrc} />
											</Link>
										) : (
											<a href={logo.outterLink}>
												<img alt={logo.imgAlt} src={logo.imgSrc} />
											</a>
										)}
									</Col>
								) : null}
								<Col className="collapse-close" xs="6">
									<button
										className="navbar-toggler"
										type="button"
										onClick={this.toggleCollapse}
									>
										<span />
										<span />
									</button>
								</Col>
							</Row>
						</div>
						{/* Navigation */}
						<Nav navbar>{this.createLinks(routes)}</Nav>
						{/* Divider */}
						<hr className="my-3" />
					</Collapse>
				</Container>
			</Navbar>
		)
	}
}

Sidebar.defaultProps = {
	routes: [{}],
}

Sidebar.propTypes = {
	// links that will be displayed inside the component
	routes: PropTypes.arrayOf(PropTypes.object),
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the image src of the logo
		imgSrc: PropTypes.string.isRequired,
		// the alt for the img
		imgAlt: PropTypes.string.isRequired,
	}),
}

export default Sidebar
