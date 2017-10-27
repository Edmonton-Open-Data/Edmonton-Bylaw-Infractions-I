# Bylaw Infractions Dashboard
![](bylaw-infractions.gif)

# Dashboard Summary
Built to analyze bylaw infractions data acquired from [Open Data (City of Edmonton)](https://data.edmonton.ca/Community-Services/Bylaw-Infractions/xgwu-c37w). Bylaw infractions data comprises of 63,365 rows. Each row has 13 attributes as shown on aforementioned website. The whole data was used in this example, even though 2017 data is incomplete. However, only 9 attributes were used to make the dashboard. Each neighbourhood has a unique combination of: pie chart, heatmap, bubble cloud, location on the map, and total number of infractions. The first instance of the dashboard (after data is loaded) is select all, whereby **all** neighbourhoods are selected and **overall** sum of infractions is displayed.

Inspiration for the project: [Interactive Data Visualization of Geospatial Data](http://adilmoujahid.com/posts/2016/08/interactive-data-visualization-geospatial-d3-dc-leaflet-python/)<br>
Frameworks used include: [crossfilter.js](http://square.github.io/crossfilter/), [dc.js](https://dc-js.github.io/dc.js/), [d3.js](https://d3js.org/), [leaflet.js](http://leafletjs.com/), [keen_io.js](https://keen.github.io/dashboards/), [dc_addons.js](https://github.com/Intellipharm/dc-addons) and [bootstrap.js](https://getbootstrap.com/docs/3.3/javascript/)<br>
Built using: Google Chrome

Desktop Dashboard: [***BYLAW INFRACTIONS DASHBOARD***](https://mikelotis.github.io/Edmonton-Bylaw-Infractions/)

***Note: CLICKABLE ELEMENTS AND MOUSE HOVER, ARE DRIVERS IN REVEALING DATA INSIGHT***

# Features Summary
***BYLAW INFRACTIONS DASHBOARD*** comprises of the following:
## 1 Selection Options (neighbourhood selection)
* Clickable options, key up and down, and scroll bar
* Select all default option
* Shows the total number of infractions for each neighbourhood
* Multiple options can be selected using [Ctrl or Shift key](https://www.discoverskills.com/select-multiple-files-ctrl-shift-keys/) mapping.
* Options data changes when the heatmap or bubble cloud are filtered (clicked)
## 2 Pie Chart (types of complaint)
* Non-clickable and mouse hover
* Shows types of complaints and their percentages
* Total data for each type is illustrated on the legend
* Mouse hover unveils type and percentage
* Chart updates whenever; selection options, heatmap, or bubble cloud are filtered 
## 3 Heatmap (yearly and month trend)
* Chamfared rectangles, row, and column text are clickable 
* Mouse hover for each rectangle
* Each row shows the year's trend 
* Each column uncovers month trend related to a 7 year time frame (except for missing data)
* Mouse hover shows total complaints associated to month hovered
* Chart updates whenever; selection options or bubble cloud are filtered
## 4 Bubble Cloud (initiators and status)
* Clickable, elastic radius, and mouse hover
* Reveals infraction intiators and status 
* Mouse hover displays intiator, status and total number of infractions respectively
* Updates in response to filtering selection options or heatmap
## 5 Map (neighbourhoods map)
* Clickable, zoomable, and draggable
* Illustrates the distribution of infractions 
* Clicking a neighbourhood on the map, a popup with the name and total number of infractions appears
* Clicking the options alters the map by adding a marker and name of neighbourhood on the map
* The map and the legend change to reflect the filtered data. 
* Map filters are bubblecloud and heatmap 
## 6 Number Display
* Dynamic number text
* Displays **overall** total when no filters are applied
* Updates to match filtered data
# TODOs

