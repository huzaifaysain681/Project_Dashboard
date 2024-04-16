import React, { useState } from 'react'
import { Modal, Table } from 'react-bootstrap'
import TableViewOrder from '../Tables/TableViewOrderDetails'
const OrderDetails = props => {
	let total = 0
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body>
				<Table id="test" className="align-items-center table-flush" responsive>
					<thead className="thead-light">
						<tr>
							<th scope="col">Image</th>
							<th scope="col">Prdouct</th>
							<th scope="col">Type</th>
							<th scope="col">Part No</th>
							<th scope="col">UTQG</th>
							<th scope="col">Sidewall</th>
							<th scope="col">Load Range</th>
							<th scope="col">Trade Life Warranty</th>
							<th scope="col">Bill</th>
						</tr>
					</thead>
					<tbody>
						{props.products &&
							props.products.map(item => {
								return <TableViewOrder key={item.id} product={item} />
							})}
						<tr>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th style={{ fontWeight: 'bold' }}>Total</th>
							<th>{`${props.products.map((item, index, arr) => {
								total += item.price
								if (arr.length === index + 1) {
									return '$' + total
								}
							})}`}</th>
						</tr>
					</tbody>
				</Table>
			</Modal.Body>
		</Modal>
	)
}

export default OrderDetails
