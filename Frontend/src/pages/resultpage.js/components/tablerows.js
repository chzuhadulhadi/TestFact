import { saveUserTest } from '../../../apiCalls/apiRoutes'
import { apiCall } from "../../../apiCalls/apiCalls";
import React from 'react';
import { useState } from "react";


function TableRows(data) {
    return (
        <>
            <tbody>
                {data.data.result &&
                    data.data.result.map(function (categories) {
                        // { console.log(categories) }
                        return (
                            categories.category=='No Category' ? null :
                            <tr style={{textAlign:'center'}}>
                                <td style={{textAlign:'center',paddingLeft:'200px'}}>{categories.category}</td>
                                <td style={{textAlign:'center',paddingRight:'200px'}}>{categories.percentage} %</td>
                                {/* <td>{categories.text}</td> */}

                            </tr>
                        )
                    })
                }
            </tbody>


        </>
    )
}
export default TableRows;
