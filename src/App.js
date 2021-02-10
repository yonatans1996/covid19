import './App.css';
import React,{useState,useEffect} from 'react';
import {MenuItem,FormControl,Select,Card, CardContent} from '@material-ui/core';
import Table from './Table';
import InfoBox from './InfoBox';
import {sortData} from "./util";
function App() {
  const [countries,setCountries]=useState([]);
  const [country1,setCountry1]=useState('IL');
  const [country2,setCountry2]=useState('RU');
  const [countryInfo1,setCountryInfo1]=useState({});
  const [countryInfo2,setCountryInfo2]=useState({});
  const [tableData,setTableData]=useState([]);
  const [countryName1,setCountryName1]=useState("Israel");
  const [countryName2,setCountryName2]=useState("Russia");


  const getCountriesData= async()=>{
    await fetch("https://disease.sh/v3/covid-19/countries").then((respone)=>respone.json()).then((data)=>{
      const countries=data.map((country)=>(
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
      ));
      const sortedData=sortData(data);
      setTableData(sortedData);
      setCountries(countries);
    });
  }

  useEffect(()=>{
      getCountriesData();
      fetch("https://disease.sh/v3/covid-19/countries/il").then(response=>response.json()).then(data=>{
        setCountryInfo1(data);
      })
      fetch("https://disease.sh/v3/covid-19/countries/ru").then(response=>response.json()).then(data=>{
        setCountryInfo2(data);
      })
  },[]);

  const onCountryChange1=async(event)=>{
    const countryCode=event.target.value;
    const url='https://disease.sh/v3/covid-19/countries/'+countryCode;
    await fetch (url).then(response=>response.json()).then(data=>{
      setCountryInfo1(data);
      setCountry1(countryCode);
      setCountryName1(data.country);

    });
    
  };
  const onCountryChange2=async(event)=>{
    const countryCode=event.target.value;
    const url='https://disease.sh/v3/covid-19/countries/'+countryCode;
    await fetch (url).then(response=>response.json()).then(data=>{
      setCountryInfo2(data);
      setCountry2(countryCode);
      setCountryName2(data.country);

    });
    
  };
  return (
    <div className="app">
      <div className="app__left">
          <div className="app__header">
          <h1>COVID-19 TRACKER<br/>Choose 2 countries to compare</h1>      
         </div>
          <div className="app__dropdown1">
           <FormControl >
                  <Select className="sel" variant="outlined" value={country1} onChange={onCountryChange1}>
                     <MenuItem value="worldwide">WorldWide</MenuItem>
                    {
                    countries.map(country=>(<MenuItem value={country.value}>{country.name}</MenuItem>))
                    }
                  </Select>
            </FormControl>
            </div>
            <h1>{countryName1}</h1>
            <div className="app__stats1">
                  <InfoBox change={1} title="CoronaVirus cases" total={countryInfo1.cases} cases={countryInfo1.todayCases}/>
                  <InfoBox change={0} title="Recovered" total={countryInfo1.recovered} cases={countryInfo1.todayRecovered}/>
                  <InfoBox change={1} title="Deaths" total={countryInfo1.deaths} cases={countryInfo1.todayDeaths}/>
            </div>
            <div className="app__dropdown2">
            <FormControl>
                  <Select className="sel" variant="outlined" value={country2} onChange={onCountryChange2}>
                    {
                    countries.map(country=>(<MenuItem value={country.value}>{country.name}</MenuItem>))
                    }
                  </Select>
              </FormControl>
            </div>
            <h1>{countryName2}</h1>
            <div className="app__stats2">
                  <InfoBox title="CoronaVirus cases" total={countryInfo2.cases} cases={countryInfo2.todayCases}/>
                  <InfoBox title="Recovered" total={countryInfo2.recovered} cases={countryInfo2.todayRecovered}/>
                  <InfoBox title="Deaths" total={countryInfo2.deaths} cases={countryInfo2.todayDeaths}/>
            </div>
          

          </div>
          <Card className="app__right">
              <CardContent>
                <h3>Top 10 Live cases by country</h3>
                <Table countries={tableData.slice(0,10)} />
              </CardContent>
          </Card>
      </div>
  );
}

export default App;
