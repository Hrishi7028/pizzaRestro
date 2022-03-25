import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { filterdItems } from '../redux/asyncMethods/pizzaAsyncMethod'
import '../Styles/Filter.css'
const Filter = () => {
    const [searchKey, setSearchKey] = useState('')
    const dispatch = useDispatch()
    const searchKeyFunct = e => {
        dispatch(filterdItems(searchKey))
        setSearchKey('')
    }
    return (
        <>
            <Form className="search_form">
                <input
                    type="text"
                    placeholder="Search"
                    className="inputClass"
                    onChange={(e) => setSearchKey(e.target.value)}
                    value={searchKey}
                    aria-label="Search"
                />
                <Button variant="outline-success" className='text-light search_btn' onClick={searchKeyFunct}>Search</Button>
            </Form>
        </>
    )
}

export default Filter