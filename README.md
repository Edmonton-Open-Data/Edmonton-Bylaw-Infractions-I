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
 [***BYLAW INFRACTIONS DASHBOARD***](https://mikelotis.github.io/Edmonton-Bylaw-Infractions/) comprises of the following:
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
* Each column uncovers month's trend related to a 7 year time frame (except for missing data)
* Mouse hover shows total complaints associated to month hovered
* Chart updates whenever; selection options or bubble cloud are filtered
## 4 Bubble Cloud (initiators and status)
* Clickable, elastic radius, and mouse hover
* Reveals infraction intiators and status 
* Mouse hover displays intiator, status and total number of infractions respectively
* Updates in response to filtering selection options or heatmap
## 5 Map (neighbourhoods map)
* Clickable, zoomable, and draggable
* Illustrates geographical distribution of infractions 
* Popup containing neighbourhoohd's name and number of infractions appears when map is clicked
* Selecting an option (select all exclusive) places a corresponding marker on the map
* The map and legend vary to reflect filtered data 
* Map filters are bubblecloud and heatmap 
## 6 Number Display (number of infractions)
* Dynamic number text
* Displays **overall** total when no filters are applied
* Updates to match filtered data
# TODOs
Improvements for the dashboard include:
* Replace option listeners with d3.selection.node()
* Connect the options and leaflet using neighbourhood names 
* Construct a custom layer and set methods to rest and update the layer
* Replace map click with map hover
* Only draw the charts after is data loaded
* Add loading animation
* Add selection options into the map as a side bar and change dashboard layout
* Add a tabular component for additional charts
* Add reset for filterable componets
* Add reset for the dashboard
* Add a feature for downloading a summary report
* Make dashboard responsive for both mobile and desktop by using aspect ratio

