import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/messagehook";
import {AuthContext} from "../Context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearerror} = useHttp()
    const[form,setForm] = useState({
        email: "",
        password:""
    })
    useEffect(()=>{
        message(error)
        clearerror()
    },[error,message, clearerror])
    useEffect( () => {
        window.M.updateTextFields()
    })
    const changehandler =event => {
        setForm({...form, [event.target.name] : event.target.value })
    }
    const registrhandler = async () => {
        try{
            const data = await request('/api/auth/register', "POST", {...form})
            message(data.message)
        } catch (e) {

        }
    }
    const loginhandler = async () => {
        try{
            const data = await request('/api/auth/login', "POST", {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Работа с ссылками</h1>
                <h6>By Tigran Arshakyan</h6>
                <div className="card red accent-3">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Введи свой email"
                                       id="email"
                                       type="text"
                                       name="email"
                                        className="orange-input"
                                       value={form.email}
                                       onChange={changehandler}
                                />
                                    <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введи свой Password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="orange-input"
                                    value={form.password}
                                    onChange={changehandler}
                                />
                                <label htmlFor="email">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <a style={{marginRight: 10}} onClick={loginhandler} disabled={loading} className="waves-effect waves-light btn yellow darken-3">Login</a>
                        <a onClick={registrhandler} disabled={loading} className="waves-effect waves-light btn cyan darken-2">Register</a>
                    </div>
                </div>
            </div>
        </div>
    )
}