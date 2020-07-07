import React from "react";
import {Link} from 'react-router-dom'
export const LinkList= ({links}) => {
    if (!links.length) {
        return <p className="flow-text center">No links</p>
    }

    return (
        <table class="striped">
            <thead>
            <tr>
                <th>Number</th>
                <th>Original</th>
                <th>Shortened</th>
                <th>Open</th>
            </tr>
            </thead>
            <tbody>
            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td><Link to={`/detail/${link._id}`}>Open</Link></td>

                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}