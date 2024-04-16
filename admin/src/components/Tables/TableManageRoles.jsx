import React, { Component } from 'react'
import { Button } from 'reactstrap'

class TableManageRoles extends Component {
	state = {}
	constructor(props) {
		super(props)
		this.state = {
			_role: this.props.role,
		}
	}
	edit = () => {
		this.setState(prevState => ({
			editing: !prevState.editing,
		}))
	}

	save = (event, values) => {
		this.setState(prevState => ({
			editing: !prevState.editing,
		}))
		this.props.edit(this.props.id, values)
	}

	remove = () => {
		this.props.remove(this.props.id)
	}
	removeAssigned = () => {
		this.props.removeAssigned(this.props.id)
	}
	render() {
		return (
			<tr key={this.props.uid}>
				<th scope="col">{this.props.email}</th>
				<th scope="col">
					{this.state.editing ? (
						<select
							value={this.state._role}
							onChange={e => {
								this.props.edit(e.target.value, this.props.uid)
								this.setState({ _role: e.target.value })
							}}
						>
							<option value={1}>Master</option>
							<option value={2}>Admin</option>
							<option value={3}>Accountant</option>
						</select>
					) : this.props.role === 1 ? (
						'Master'
					) : this.props.role === 2 ? (
						'Admin'
					) : (
						'Accountant'
					)}
				</th>

				<td>
					<Button color="info" value="" onClick={this.edit}>
						{this.state.editing ? 'Ok' : 'Edit'}
					</Button>
				</td>

				<th scope="col">
					<Button
						color="danger"
						onClick={() => {
							this.props.deletemodal(this.props.uid)
						}}
					>
						Delete
					</Button>
				</th>
			</tr>
		)
	}
}

export default TableManageRoles
