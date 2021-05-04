import React, {useState, useEffect} from 'react'
import {MenuItem, FormControl, Select} from '@material-ui/core';
import {Card,CardContent} from '@material-ui/core'
import './App.css';
import Header from "./Header"
import InfoBox from "./InfoBox"
import Map from "./Map"
import {useStateValue} from "./StateProvider";
import Table from "./Table"
import Plot from "./Plot"
import "leaflet/dist/leaflet.css";

function App() {
  
  
  const [{countryData}, dispatch] = useStateValue();
  const [countries, setCountries] = useState([]);
  const [allData, setAllData] = useState([]);

  
    useEffect(() => {
        //This code inside will run once when the component loads
        // and when the countries variable changes
        
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
                    setAllData(data); 
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
          <InfoBox title = "Coronavirus cases" daily = {countryData.todayCases} total = {countryData.cases} />
          <InfoBox title = "Recovered" daily = {countryData.todayRecovered} total = {countryData.recovered} />
          <InfoBox title = "Deaths" daily = {countryData.todayDeaths} total = {countryData.deaths} />
        </div>
     
        {/* Map */}  
        <Map countries = {allData} />
      </div>
      <Card className = "app__right">
        <CardContent>
          <div className="app__info">
            <h2> Situation by Country </h2>
            <Table data = {allData}/>
            <Plot/>
          </div>
          
        </CardContent>
        
      </Card>
      
    </div>
  );
}

export default App;
