# Bylaw Infractions Dashboard
![](bylaw-infractions.gif)

# Dashboard Summary
Built to analyze bylaw infractions data acquired from [Open Data (City of Edmonton)](https://data.edmonton.ca/Community-Services/Bylaw-Infractions/xgwu-c37w). The data comprises of 63,365 rows. Each row has 13 attributes as shown on the Open Data website. All of the data was used in this example, even though 2017 data is incomplete. However, only 9 attributes were used to make the dashboard. Each option (neighbourhood) has their own combination of: pie chart, heatmap, bubble cloud, location on the map, and total number of infractions. The first instance of the dashboard is select all, whereby **all** of the options (neighbourhoods) are selected and the **overall** total number of infractions is shown.

Inspiration for the project: [Interactive Data Visualization of Geospatial Data](http://adilmoujahid.com/posts/2016/08/interactive-data-visualization-geospatial-d3-dc-leaflet-python/)<br>
Frameworks used include: [crossfilter.js](http://square.github.io/crossfilter/), [dc.js](https://dc-js.github.io/dc.js/), [d3.js](https://d3js.org/), [leaflet.js](http://leafletjs.com/), [keen_io.js](https://keen.github.io/dashboards/), [dc_addons.js](https://github.com/Intellipharm/dc-addons) and [bootstrap.js](https://getbootstrap.com/docs/3.3/javascript/)<br>
Built using: Google Chrome

Desktop Dashboard: [***BYLAW INFRACTIONS DASHBOARD***](https://mikelotis.github.io/Edmonton-Bylaw-Infractions/)

***Note: CLICKABLE ELEMENTS AND MOUSE HOVER, ARE DRIVERS IN REVEALING DATA INSIGHT***

# Features Summary
## 1 Selection Options
* Clickable options, key up and down, and scroll bar
* Select all option is the default option
* Shows the total number of infractions for each neighbourhood
* Multiple options can be selected using the [Ctrl and Shift Key](https://www.discoverskills.com/select-multiple-files-ctrl-shift-keys/) selection functions.
* The options data changes when the heatmap or bubble cloud are filtered (clicked)
## 2 Pie Chart
* Non clickable and mouse hover
* Shows the types of complaints and their percentages
* The total data for each type of complaint is illustrated on the legend
* Mouse hover unveils the type and corresponding percentage
* The chart updates whenever the selection options, heatmap, or bubble cloud are filtered 
## 3 Heatmap
* The chamfared rectangles, row and column text are clickable 
* Mouse hover for each rectangle
* Each row shows the year trend 
* Each column shows the month trend for the 7 year time frame
* Mouse hover shows total complaints binded to the month hovered
* The chart updates whenever the selection options or bubble cloud are filtered
## 4 Bubble Cloud
* Clickable, elastic radius, and mouse hover
* Reveals infraction intiators and status 
* Mouse hover displays intiator, status and total number of infractions respectively
* The cloud changes in response of filtering the selection options or heatmap
## 5 Map
* Clickable, zoom, and draggable
* Illustrates the distribution of infractions 
* A popup with the name of the neighbourhood and number of infractions appears when a neighbourhood is clicked
* Clicking (filtering) selection options alters the map by adding a marker and name of the option (neighbourhood) on the map
* The map and the legend change to reflect the filtered data. The chart filters are bubblecloud and heatmap 
## 6 Number Display
* Dynamic number text
* Displays **overall** total when no filters are applied
* Updates to match filtered data
# TODOs

