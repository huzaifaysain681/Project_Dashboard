import React, { useState } from 'react'
import { Modal, Table, Button } from 'react-bootstrap'
import OrderDetails from '../Modals/OrderDetails'

const OrderHistory = props => {
	const { history } = props
	const [showOrderHistory, setShowOrderHistory] = useState(false)
	const [selectedOrder, setSelectedOrder] = useState(null)

	const viewDetails = data => {
		console.log(data)
		setShowOrderHistory(true)
		setSelectedOrder(data)
	}
	return (
		<>
			<Modal
				{...props}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body>
					<Table
						id="test"
						className="align-items-center table-flush"
						responsive
					>
						<thead className="thead-light">
							<tr>
								<th scope="col">Order#</th>
								<th scope="col">Date</th>
								<th scope="col">Bill</th>
								<th scope="col">Details</th>
							</tr>
						</thead>
						<tbody>
							{history &&
								history.map(item => (
									<tr key={item.id}>
										<td> {item.id}</td>
										<td> {item.date}</td>
										<td>{`$${item.bill}`}</td>
										<th>
											<Button
												onClick={() => viewDetails(item.products)}
												color="info"
											>
												View
											</Button>
										</th>
									</tr>
								))}
						</tbody>
					</Table>
				</Modal.Body>
			</Modal>
			{showOrderHistory && selectedOrder && (
				<OrderDetails
					show={showOrderHistory}
					onHide={() => setShowOrderHistory(false)}
					products={selectedOrder}
				/>
			)}
		</>
	)
}

export default OrderHistory
