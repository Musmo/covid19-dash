import React, {useState, useEffect} from 'react'
import {MenuItem, FormControl, Select} from '@material-ui/core';
import "./Header.css"
import {useStateValue} from "./StateProvider";


function Header(props) {
    const [{countryData},dispatch] = useStateValue();
    const [selectedCountry, setSelectedCountry] = useState("worldwide");

    useEffect(() => {   // first time load the worldwide data
        console.log("worldwide data useEffect")
        fetch("https://disease.sh/v3/covid-19/all")
          .then(response => response.json())
          .then(data => {
            dispatch({
              type: 'SET',
              data: data
            })         
          })
    }, []);

    /* Function onClick on the dropDown*/
    const selectCountry = async(event) => {
        const countryCode = event.target.value; // grabs the select value
        
        // when we select a new country we need the data for that country
        await fetch (countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" 
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`)
            .then(response => response.json())  // when we get the response
            .then(data => { 
                setSelectedCountry(countryCode); 
                // store the data for the selected country
                dispatch({
                    type: 'SET',
                    data: data
                  })   
                 
                  
            }
        )
        
    }
    
    return (
        <div className = "header">
                {/* "Title"*/}
                <h1 className = "header__title" >COVID-19 Pandemic</h1>
                {/*"search Bar" */}
                <FormControl className="header__dropDown">
                    <Select variant = "outlined" onChange = {selectCountry} value= {selectedCountry}>
                        {/* Here we want to list all the country */}
                        <MenuItem value = "worldwide"> Worldwide </MenuItem>  
                        {
                            props.countries.map(country => {
                                return  <MenuItem value = {country.value} > {country.name} </MenuItem>
                                
                            } )
                        }
         
                    </Select>
                </FormControl>
        </div>
    )
}

export default Header
