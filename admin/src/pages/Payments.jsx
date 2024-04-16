import React from 'react'

import {
	Card,
	CardHeader,
	Table,
	Container,
	Row,
	CardBody,
	Spinner,
} from 'reactstrap'

import Header from '../components/Headers/Header.jsx'
import { getCollection, AuthState } from '../Firebase/utility'
import SweetAlert from 'react-bootstrap-sweetalert'

const excludeColumns = ['id', 'color']
class Tables extends React.Component {
	constructor(props) {
		super(props)
		AuthState()

		this.state = {
			search: '',
			data: [],
			alert: null,
			pics: [],
			ProdSearch: [],
			modalvisible: false,
			item: {},
			isLoading: true,
		}
	}

	componentDidMount = async () => {
		setTimeout(() => {
			this.setState({ isLoading: false })
		}, 1000)
		var collection = await getCollection('Taker')
		console.log(collection)
		this.setState({
			ProdSearch: collection.map((item, i) => {
				return {
					...item,
				}
			}),
			data: collection.map(item => {
				return {
					...item,
				}
			}),
		})
	}
	deletemodal = id => {
		this.setState({
			alert: (
				<SweetAlert
					danger
					style={{ display: 'block', marginTop: '100px' }}
					title={`Are you Sure You Want To Delete !`}
					onConfirm={() => {}}
					onCancel={() => this.setState({ alert: null })}
					confirmBtnBsStyle="danger"
					showCancel
					confirmBtnText="Yes"
				></SweetAlert>
			),
		})
	}

	handleChange = value => {
		this.setState({ search: value })
		this.filterData(value)
	}

	filterData = value => {
		const lowercasedValue = value.toLowerCase().trim()
		if (lowercasedValue === '') this.setState({ data: this.state.ProdSearch })
		else {
			const filteredData = this.state.ProdSearch.filter(item => {
				return Object.keys(item).some(key =>
					excludeColumns.includes(key)
						? false
						: item[key] &&
						  item[key].toString().toLowerCase().includes(lowercasedValue),
				)
			})
			this.setState({ data: filteredData })
		}
	}

	render() {
		let providers = this.state.data
		return (
			<React.Fragment>
				<Header
					name={this.state.name}
					noOfProducts={this.state.ProdSearch.length}
					totalValue={this.state.totalValue}
					type={'Payments'}
				/>
				{/* Page content */}
				<Container className="mt--7" fluid>
					{/* Table */}
					<Row>
						<div className="col">
							<Card className="bg-secondary shadow">
								<CardHeader className="border-0">
									<h3 className="mb-0">Payments</h3>
								</CardHeader>
								{/* {console.log(this.state.ProdSearch)} */}
								<CardBody>
									{this.state.isLoading ? (
										<div
											style={{
												width: '100%',
												height: '100%',
												justifyContent: 'center',
												alignItems: 'center',
												display: 'flex',
												flex: '1',
												textAlign: 'center',
											}}
										>
											<Spinner style={{ width: '3rem', height: '3rem' }} />
										</div>
									) : (
										<>
											<input
												style={{
													borderRadius: 15,
													padding: 7,
													borderColor: '#0000f6',
													margin: 10,
													marginLeft: 15,
												}}
												type="text"
												placeholder="Search..."
												value={this.state.search}
												onChange={e => this.handleChange(e.target.value)}
											/>
											<Table
												id="test"
												className="align-items-center table-flush"
												responsive
											>
												<thead className="thead-light">
													<tr>
														<th scope="col">Date</th>
														<th scope="col">Service Name</th>
														<th scope="col">Service Provider</th>
														<th scope="col">Service Taker</th>
														<th scope="col">Cost</th>
													</tr>
												</thead>
												<tbody>
													{providers &&
														providers.map(user => {
															return (
																<tr key={user.uid}>
																	{/* {console.log(user)} */}
																	<th scope="col">{'01/12/2020 at 04:00PM'}</th>
																	<th scope="col">{'Hair Cutting'}</th>
																	<th scope="col">{'Shoaib'}</th>
																	<th scope="col">{'Shoaib'}</th>
																	<th scope="col">{'25$'}</th>
																</tr>
															)
														})}
												</tbody>
											</Table>
										</>
									)}
								</CardBody>
							</Card>
							{this.state.alert}
						</div>
					</Row>
				</Container>
			</React.Fragment>
		)
	}
}

export default Tables
