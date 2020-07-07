import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../Context/AuthContext";
import {Loader} from "../Components/Loader";
import {LinkList} from "../Components/LinkList";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async()=>{
        try{
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        }
        catch (e) {

        }
    },[token,request])
    useEffect(()=>{
        fetchLinks()
    },[fetchLinks])

    if (loading){
        return <Loader />
    }
    return (
        <div>
            <>
                {!loading && <LinkList links={links}/>}
            </>
        </div>
    )
}