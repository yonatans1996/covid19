import React from 'react';
import './Table.css';
import numeral from "numeral"
function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country,todayCases})=>(
                <tr>
                    <td>{country}</td>
                    <td><strong>{numeral(todayCases).format(",")}</strong></td>
                </tr>

            ))}
            
        </div>
    )
}

export default Table;
