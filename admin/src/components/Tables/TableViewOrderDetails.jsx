import React from 'react'

import { Button } from 'reactstrap'

class TableViewOrderDetails extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { product } = this.props
		return (
			<>
				<tr key={product.id}>
					<th scope="col">
						<img
							src={product.images[0]}
							style={{
								width: '50px',
								height: '50px',
								objectFit: 'contain',
							}}
						/>
					</th>
					<th scope="col">{product.title}</th>
					<th scope="col">{product.type}</th>
					<th scope="col">{product.partNo}</th>
					<th scope="col">{product.utqg}</th>
					<th scope="col">{product.sidewall}</th>
					<th scope="col">{product.loadRange}</th>
					<th scope="col">{product.tradeLifeWarrenty}</th>
					<th scope="col">{product.price}</th>
				</tr>
			</>
		)
	}
}
export default TableViewOrderDetails
