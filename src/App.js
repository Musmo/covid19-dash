import React, {useState, useEffect} from 'react'
import {MenuItem, FormControl, Select} from '@material-ui/core';
import {Card,CardContent} from '@material-ui/core'
import './App.css';
import Header from "./Header"
import InfoBox from "./InfoBox"
import Map from "./Map"
function App() {

  const [countries, setCountries] = useState([]);
  
    useEffect(() => {
        //This code inside will run once when the component loads
        // and when the countries variable changes
        console.log("inside useEffect");
        // async We make a request to a server and we need to wait for the response
        const getData = async () => { // we use a promise
            await fetch ("https://disease.sh/v3/covid-19/countries")
                .then(response => response.json())  // when we get the response
                .then(data => { // I "store" only the data I need
                    const countries = data.map(country => ({
                        name: country.country,
                        value: country.countryInfo.iso2 //UK, IT
                    })); 
                    setCountries(countries); // I set the new countries value 
                })
        }
        getData();
    }, [] );

  return (
    <div className="app">
      <div className= "app__left">
        {/*Header */}
        <Header countries = {countries}/> 
        {/* InfoBoxes */}
        <div className="app__infoBoxs">
          <InfoBox title = "Coronavirus cases" daily = {+1234} total = {1.3} />
          <InfoBox title = "Recovered" daily = {+1234} total = {1.3} />
          <InfoBox title = "Deaths" daily = {+1234} total = {1.3} />
        </div>
     
        {/* Map */}  
        <Map/>
      </div>
      <Card className = "app__right">
        <CardContent>
          {/*Table and Plots */}
          <h3> Live Cases by Country</h3>
          <h3> World wide new cases </h3>
        </CardContent>
        
      </Card>
      
    </div>
  );
}

export default App;
