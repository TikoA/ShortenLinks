import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../Context/AuthContext";

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    useEffect( () => {
        window.M.updateTextFields()
    })
    const [link, setLink] = useState('')
    const pressHandler = async event => {
        if(event.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', {from:link}, {Authorization : `Bearer ${auth.token}`})
                history.push(`/detail/${data.link._id}`)
            }catch (e) {

            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <input placeholder="Enter link"
                       id="link"
                       type="text"
                       value={link}
                       className="orange-input"
                       onChange={e => setLink(e.target.value)}
                       onKeyPress={pressHandler}
                />
                <label htmlFor="link">Link you want to shorten</label>
            </div>
        </div>
    )
}