import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import AdminNavbar from '../components/Navbars/AdminNavbar.jsx'
import AdminFooter from '../components/Footers/AdminFooter.jsx'
import Sidebar from '../components/Sidebar/Sidebar.jsx'
import logo from '../assets/logo.png'

import routes from '../routes.js'

class Admin extends React.Component {
	componentDidUpdate(e) {
		document.documentElement.scrollTop = 0
		document.scrollingElement.scrollTop = 0
		this.refs.mainContent.scrollTop = 0
	}
	getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === '/admin') {
				if (localStorage.getItem('userType') !== 'master') {
					if (
						prop.name === 'Manage Roles' ||
						(localStorage.getItem('userType') === 'admin' &&
							prop.name === 'Payments') ||
						(localStorage.getItem('userType') === 'accountant' &&
							prop.name === 'Configure Services')
					) {
						return null
					} else {
						return (
							<Route
								path={prop.layout + prop.path}
								component={prop.component}
								key={key}
							/>
						)
					}
				} else {
					return (
						<Route
							path={prop.layout + prop.path}
							component={prop.component}
							key={key}
						/>
					)
				}
			} else {
				return null
			}
		})
	}
	getBrandText = (path) => {
		for (let i = 0; i < routes.length; i++) {
			if (
				this.props.location.pathname.indexOf(
					routes[i].layout + routes[i].path,
				) !== -1
			) {
				return routes[i].name
			}
		}
		return 'Brand'
	}
	render() {
		return (
			<>
				<Sidebar
					{...this.props}
					routes={routes}
					logo={{
						innerLink: '/admin/index',
						imgSrc: logo,
						imgAlt: '...',
					}}
				/>
				<div className="main-content" ref="mainContent">
					<AdminNavbar
						{...this.props}
						brandText={this.getBrandText(this.props.location.pathname)}
					/>
					<Switch>{this.getRoutes(routes)}</Switch>
					<Container fluid>
						<AdminFooter />
					</Container>
				</div>
			</>
		)
	}
}

export default Admin
