import React, {useEffect, useState} from 'react'
import "./Table.css"
import numeral from "numeral";
import { DataGrid, MaterialTable } from '@material-ui/data-grid';

function Table(props) {

    const [rows,setRows] = useState([])
    const columns = [
        { field: 'country', headerName: 'Country',  flex: 0.5 },
        { field: 'cases', headerName: 'Cases', type: 'number', flex: 0.5},
    ];
    

    
    const computeRows = (props) => {
        const rows = [];
        let i = 1;
        props.data.map(country => (
            rows.push({id : i ++, country: country.country,
                cases: numeral(country.cases).format("0")})
            )
           
            
        );
        return rows
    }


    return (
        <div className = "table">
               <div style={{ height: 400, width: '100%' }}>
                    <DataGrid  rows={computeRows(props)} columns={columns} disableColumnMenu autoHeight = {true} 
                    hideFooterPagination 
                    showColumnRightBorder
                    autoPageSize pagination {...computeRows(props) }
                    
                  />
               </div>
     {/*}        <tr>
                <th>Country</th>
                <th>Cases</th>
             </tr>
            {props.data.map(country => (
                
                <tr>
                    <td>{country.country}</td>
                    <td>
                        <strong>{numeral(country.cases).format("0,0")}</strong>
                    </td>
                </tr>

            ))}



            
        */}
    
         
        </div>
    )
}

export default Table
