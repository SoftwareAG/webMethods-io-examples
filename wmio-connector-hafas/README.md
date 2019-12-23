# wmio-connector-hafas  
  

## Overview   


This sample demonstrates how to build a custom connector to an external (REST) API for further usage in webmethods.io Integration.  




REST API used for this purpose is the HAFAS ReST API. 

HAFAS is used by many international railway companies like e.g Deutsche Bahn, ÖBB, NS Nederlande Spoorwegen or SBB. 
Also by many public transport networks like e.g. RMV, HVV or BVG.

Developed by HaCon Ingenieurgesellschaft mbH, Hannover, Germany (https://www.hacon.de/en), the HAFAS ReST API access is usually established via registration at one of the HAFAS using providers.

This sample connector was developed with an API token/key provided by Rhein-Main-Verkehrsverbund (RMV). 
Registration can be done at https://opendata.rmv.de/site/start.html or finally at https://opendata.rmv.de/site/anmeldeseite.html

Base URL for all API calls is https://www.rmv.de/hapi/. 
You can find there all Web Application Description Language (WADL) service descriptions.

The connector contains the follwing actions 

| Connector Action | HAFAS Service |
|---|---|
| getLocationName  | location.<!-- -->name |
| getLocationNearbyStops  | location.nearbystops |
|  getStationboard | departureboard |

  

## Short Action Description

### getLocationName

getLocationName provides a free text search for Locations of different types, like e.g. (street) address or stop.

### getLocationNearbyStops

getLocationNearbyStops provides Longitude/Latitude coordinates based search mainly for stops. 


### getStationboard

getStationboard provides a search for the next departures of a given stop. Schedule based data, plus realtime data.



## Potential Use Cases, sample webmethods.io Integration flows.

### Search for a public transport stop, nearby a given address

"HAFAS-only" example. 

1. Create HAFAS action getLocationName
2. Create Connector Account, when using for the first time in webmethods.io project
3. For an example, enter a desired value for "Search Input"
4. Test the action, to get a valid output
5. Create a second HAFAS action getNearestStop
6. Map longitude and latitude between the two HAFAS actions
7. Test the action, to get a valid output
8. Create a third HAFAS action getStationBoard
9. Map StopLocation's "extId" (not long "Id") to "Location Id"
10. Test the action, to get a valid output

   
### Search for nearest public transport stop, for a given loction of a "Connected Car"

This connector could also easily be used for addtional processing of the "Connected Car" sample connector found here: https://github.com/SoftwareAG/wmio-connector-connectedcar

1. Follow all steps in "Connected Car" README to get this connector deployed. 
2. Create a new workflow with a first action "getVehicles", no input needed.
3. Test the action, to get a valid output
4. Create a second action "getVehicleById"
5. Map desired vehicle id between the two actions
6. Test the action, to get a valid output  
7. Create third action "getLocation" (for vehicle) 
8. Map desired vehicle id between the two actions

These are the actions needed from "Connected Car", now let's find nearest stop of current vehicle's position:     

9. Create HAFAS action getNearestStop
10. Map longitude and latitude between vehicle's "getLocation" and HAFAS "getNearestStop"
11. Test the action, to get a valid output

optional, for illustration:

12. Create a second HAFAS action getStationBoard
13. Map StopLocation's "extId" (not long "Id") to "Location Id"
14. Test the action, to get a valid output



# General information about webmethods.io Integration Connector Builder

Register for a free trial webMethods.io integration account: https://www.softwareag.cloud

TechCommunity Information could be found here: http://techcommunity.softwareag.com/pwiki/-/wiki/Main/webMethods.io%20Connector%20Builder%20guide

Product Documentation could be found here: https://docs.webmethods.io/integration/developer_guide/connector_builder/#gsc.tab=0

* Follow the official documentation until chapter "Quick Setup Guide", step 2 "Login to webMethods.io Integration". 
* No need for "wmio init", as we start with this sample, cloned/checked out from Git.
```
# cd into cloned from Git directory "wmio-connector-hafas/src".
```

* As you need to use your own API Key, replace all occurrences of "\<your api key here>" with your own key. 

* Test your connector

```
wmio test
```

* Deploy your connector to webmethods.io Integration

```
wmio deploy
```

______________________
These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.	

Contact us at [TECHcommunity](mailto:technologycommunity@softwareag.com?subject=Github/SoftwareAG) if you have any questions.

