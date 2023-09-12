import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

function UserTableDataLines(props) {
    return (
        <tr key={props.index}>
            <td>
                <Link to={`/admin/order_history/${props.line.id}`}>
                    <p>
                        {props.line.first_name}
                        <span class="text-uppercase">
                            {` ${props.line.last_name}`}
                        </span>
                    </p>
                </Link>
            </td>
            <td>
                <p>
                    {props.line.email}
                </p>
            </td>
            <td>
                <p>
                    {props.line.address}
                </p>
            </td>
            <td>
                <p>
                    {props.line.phone_number}
                </p>
            </td>            
        </tr>
    )
}

export default UserTableDataLines