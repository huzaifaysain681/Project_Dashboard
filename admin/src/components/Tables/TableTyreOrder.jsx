import React from 'react'

import { Button } from 'reactstrap'

class TableOrderTyres extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { order } = this.props
		return (
			<>
				<tr key={order.id}>
					<th scope="col">{order.orderid}</th>
					<th scope="col">{order.date}</th>
					<th scope="col">{order.customer.name}</th>
					<th scope="col">{order.customer.address}</th>
					<th scope="col">{order.products.length}</th>
					<th scope="col">{order.bill}</th>
					{localStorage.getItem('userType') === 'accountant' ? null : (
						<th scope="col">
							<Button
								onClick={() => this.props.changeStatus(order)}
								color="info"
							>
								{order.status === 1
									? 'Confirm Order'
									: order.status === 2
									? 'Process Order'
									: order.status === 3
									? 'Order Shipped'
									: order.status === 4
									? 'Complete Order'
									: order.status === 5 && 'Order Completed'}
							</Button>
						</th>
					)}
					<th scope="col">
						<Button color="primary" onClick={() => this.props.view(order)}>
							View Order
						</Button>
					</th>
				</tr>
			</>
		)
	}
}
export default TableOrderTyres
