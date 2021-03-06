# Bylaw Infractions Dashboard I
![](bylaw_infractions.gif)

# Dashboard Summary
Built to analyze bylaw infractions data acquired from [Open Data (City of Edmonton)](https://data.edmonton.ca/Community-Services/Bylaw-Infractions/xgwu-c37w). Bylaw infractions data comprises of 63,365 rows. Each row has 13 attributes as shown on aforementioned website. The whole data set was used in this example, even though 2017 data is incomplete. However, only 9 attributes were used to make the dashboard. Each neighbourhood has a unique combination of: pie chart, heatmap, bubble cloud, location on the map, and total number of infractions. The first instance of the dashboard (after data is loaded) is select all, whereby **all** neighbourhoods are selected and **overall** sum of infractions is displayed.

Inspiration for the project: [Interactive Data Visualization of Geospatial Data](http://adilmoujahid.com/posts/2016/08/interactive-data-visualization-geospatial-d3-dc-leaflet-python/) and [Le choropleth](http://intellipharm.github.io/dc-addons/examples/leaflet-marker.html)<br>
Frameworks used include: [crossfilter.js](http://square.github.io/crossfilter/), [dc.js](https://dc-js.github.io/dc.js/), [d3.js](https://d3js.org/), [leaflet.js](http://leafletjs.com/), [keen_io.js](https://keen.github.io/dashboards/), [dc_addons.js](https://github.com/Intellipharm/dc-addons) and [bootstrap.js](https://getbootstrap.com/docs/3.3/javascript/)<br>
Best viewed in: Google Chrome

Desktop Dashboard(Outdated): [*****BYLAW INFRACTIONS DASHBOARD I (CLICK ME!)*****]( https://edmonton-open-data.github.io/Edmonton-Bylaw-Infractions-I/index.html)<br>
Desktop Dashboard(Updated): [*****BYLAW INFRACTIONS DASHBOARD II (CLICK ME!)*****](https://github.com/Edmonton-Open-Data/Edmonton-Bylaw-Infractions-II/blob/master/README.md#edmonton-bylaw-infractions-ii)

***Note: CLICKABLE ELEMENTS AND MOUSEOVER, ARE DRIVERS IN REVEALING DATA INSIGHT***

# Features Summary
 [***BYLAW INFRACTIONS DASHBOARD***]( https://edmonton-open-data.github.io/Edmonton-Bylaw-Infractions-I/index.html) comprises of the following:
## 1 Selection Options (neighbourhood selection)
* Clickable options, key up and down, and scroll bar
* Select all default option
* Shows the total number of infractions for each neighbourhood
* Multiple options can be selected using [Ctrl or Shift key](https://www.discoverskills.com/select-multiple-files-ctrl-shift-keys/) mapping.
* Options data changes when the heatmap or bubble cloud are filtered (clicked)
## 2 Pie Chart (types of complaint)
* Non-clickable and mouseover
* Shows types of complaints and their percentages
* Total data for each type is illustrated on the legend
* Mouseover unveils type and percentage
* Chart updates whenever; selection options, heatmap, or bubble cloud are filtered 
## 3 Heatmap (yearly and monthly trend)
* Rounded rectangles, row, and column text are clickable 
* Mouseover for each rectangle
* Each row shows the year's trend 
* Each column uncovers month's trend related to a 7 year time frame (except for missing data)
* Mouseover shows total complaints associated to month hovered
* Chart updates whenever; selection options or bubble cloud are filtered
## 4 Bubble Cloud (initiators and status)
* Clickable, elastic radius, and mouseover
* Reveals infraction intiators and status 
* Mouseover displays intiator or status with related total number of infractions
* Updates in response to filtering selection options or heatmap
## 5 Map (neighbourhoods map)
* Clickable, zoomable, and draggable
* Illustrates geographical distribution of infractions 
* Popup containing neighbourhoohd's name and number of infractions appears when neighbourhood is clicked
* Selecting an option (select all exclusive) places a corresponding marker on the map
* The map and legend vary to reflect filtered data 
* Map filters are bubblecloud and heatmap 
## 6 Number Display (number of infractions)
* Dynamic number text
* Displays **overall** total when no filters are applied
* Updates to match filtered data
# To-do's
Improvements for the dashboard include:
- [x] Construct a [custom layer](http://leafletjs.com/examples/extending/extending-2-layers.html) and set methods to reset and update the layer (actually used preRedraw and preRender events)
- [x] Only draw the charts after [data is loaded](http://adilmoujahid.com/posts/2016/08/interactive-data-visualization-geospatial-d3-dc-leaflet-python/)
- [x] Add a [loader](https://www.w3schools.com/howto/howto_css_loader.asp)
- [ ] Add a [tabular (Traffic)](https://keen.github.io/dashboards/examples/connected-devices/) component for additional charts
- [x] Add reset for filterable componets
- [x] Add reset all for the dashboard
- [ ] Add a feature for downloading a [data table](http://dc-js.github.io/dc.js/examples/download-table.html)
- [x] ~~Improve performance for [heatmap](http://dc-js.github.io/dc.js/examples/heatmap-filtering.html)~~ Decided to remove the heatmap
- [x] Make dashboard responsive for both mobile and desktop by using [aspect ratio](https://blog.webkid.io/responsive-chart-usability-d3/)
- [ ] Learn from [austinlyons](https://github.com/austinlyons/dcjs-leaflet-untappd) and ~~[Gordon Woodhull](http://bl.ocks.org/gordonwoodhull/c506b130f17cd77a015b2b229ecb4f22)~~ Learnt only from Gordon

