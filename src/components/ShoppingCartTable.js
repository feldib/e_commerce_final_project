import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faX, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { Row, Table, Col } from 'react-bootstrap'
import { useLoading } from '../fetching'
import { ToastContainer, toast } from 'react-toastify'

function ShoppingCartTable(props) {
    function makeDataLines(dataLines){
        return (dataLines.map((line, index)=>{
            return (
                <tr key={index}>
                    <td>
                        <img
                                src = {line.thumbnail}
                                width="100"
                                style={{objectFit: "contain"}}
                                alt="place of thumbnail"
                            />
                    </td>
                    <td>
                        {line.title}
                    </td>
                    <td>
                        {line.artist_name}
                    </td>
                    <td>
                        €{line.price}
                    </td>
                    <td className='text-center'>
                        <Row>
                            <Col sm={12} lg={5}>
                                <Col>
                                    {line.quantity}
                                </Col>
                            </Col>
                            <Col>
                                <p style={{cursor: "pointer"}}>
                                    <FontAwesomeIcon icon={faMinus} style={{color: "red"}} />
                                </p>
                            </Col>
                            
                            <Col>
                                <p style={{cursor: "pointer"}}>
                                    <FontAwesomeIcon icon={faPlus} style={{color: "red"}} />
                                </p>
                            </Col>
                        </Row>
                    </td>
                    <td className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
                        {line.tags &&
                            line.tags
                            .map(tag => tag.tname)
                            .join(", ")
                        }
                    </td>
                    <td className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
                        {line.cname}
                    </td>
                    <td>
                        <div className='container'>                                   
                            <Row>
                                <p 
                                    style={{cursor: "pointer"}}
                                    onClick={
                                        async()=>{
                                            if(props.loggedIn){
                                                // await addToFauforites(line.id)
                                            }else{
                                                toast.warning("Sign in or register to add to shopping list! ", {
                                                    className: "toast-warning"
                                                })
                                            }
                                        }
                                    }
                                >
                                    <FontAwesomeIcon icon={faHeart} />
                                </p>
                            </Row>

                            <Row>
                                <p style={{cursor: "pointer"}}>
                                    <FontAwesomeIcon icon={faX} style={{color: "red"}} />
                                </p>
                            </Row>
                            <ToastContainer position='top-right'/>
                        </div>
                    </td>
                </tr>
            )
        })
        )
    }

    function presentData(dataLines){
        if(dataLines.length > 0){
            return makeDataLines(dataLines)
        }
        else{
            return (
                <tr>
                    <td colspan="8">
                        <h6 className='text-center'>No results</h6>
                    </td>
                </tr>
            )
        }
    }

    const dataLines = useLoading(props.dataLines, presentData)
    return (
        <Row>
            <Table className='table-hover' variant='dark'>
                {props.theadNeeded &&
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>Tags</th>
                        <th className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>Categories</th>
                        <th></th>
                    </tr>
                </thead>
                }

                <tbody>
                    {dataLines}
                </tbody>
            </Table>
        </Row>
    )
}

export default ShoppingCartTable