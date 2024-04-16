import React from 'react'
import {
	Card,
	CardBody,
	Button,
	CardTitle,
	Container,
	Row,
	Col,
	Collapse,
	Nav,
} from 'reactstrap'
import style from './style.module.css'

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<>
				<div className={style.headerback}>
					<div className="header pb-8 pt-5 pt-md-8">
						<Container fluid>
							<div className="header-body">
								{/* Card stats */}
								<Row>
									<Col lg="6" xl="4">
										{!this.props.onlyHeader && (
											<Card className="card-stats mb-4 mb-xl-0">
												<CardBody>
													<Row>
														<div className="col">
															<CardTitle
																tag="h5"
																className="text-uppercase text-muted mb-0"
															>
																Total {this.props.type}
															</CardTitle>
															<span className="h2 font-weight-bold mb-0">
																{this.props.noOfProducts}
															</span>
														</div>
														<Col className="col-auto">
															<div
																className="icon icon-shape text-white rounded-circle shadow"
																style={{ background: '#139152' }}
															>
																<i className="fas fa-chart-pie" />
															</div>
														</Col>
													</Row>
												</CardBody>
											</Card>
										)}
									</Col>
								</Row>
							</div>
						</Container>
					</div>
				</div>
			</>
		)
	}
}

export default Header
