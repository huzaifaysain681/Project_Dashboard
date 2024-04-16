import React, { useState } from 'react'
import { Modal, Table, Button } from 'react-bootstrap'
import ServiceDetails from '../Modals/ServiceDetails'

const ServiceHistory = props => {
	const { history } = props
	const [showServiceHistory, setShowServiceHistory] = useState(false)
	const [selectedService, setSelectedService] = useState(null)

	const viewDetails = data => {
		setShowServiceHistory(true)
		setSelectedService(data)
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
								<th scope="col">Service#</th>
								<th scope="col">Date</th>
								<th scope="col">Type</th>
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
										<td>{`${item.service.type}`}</td>
										<td>{`$${item.service.bill}`}</td>
										<th>
											<Button
												onClick={() => {
													viewDetails(item)
												}}
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
			{showServiceHistory && selectedService && (
				<ServiceDetails
					show={showServiceHistory}
					onHide={() => setShowServiceHistory(false)}
					service={selectedService}
				/>
			)}
		</>
	)
}

export default ServiceHistory
