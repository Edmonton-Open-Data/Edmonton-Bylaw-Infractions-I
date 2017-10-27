
    var edmontonGeojson = false;
    var bylawInfractions = false;


    //Edmonton geojson
    d3.json("data/Edmonton2.json", function(data) {

        edmontonGeojson = data;

        if (bylawInfractions) renderCharts(bylawInfractions, edmontonGeojson);
    });


    //Infractions data
    d3.csv("data/Bylaw_Infractions.csv", function(data) {

        bylawInfractions = data;
        
        if (edmontonGeojson) renderCharts(bylawInfractions, edmontonGeojson);
    });


    function renderCharts(data, geojson) {

        //Clean data use only the properties needed
        //This is data from Bylaw_Infractions.csv(about 60k rows)
        dataParsed = data.map(function(d) {

            return {
                YEAR: +d.YEAR,
                "MONTH_NUMBER": +d["MONTH_NUMBER"],
                NEIGHBOURHOOD: d.NEIGHBOURHOOD,
                COMPLAINT: d.COMPLAINT,
                "INITIATED_BY": d["INITIATED_BY"],
                STATUS: d.STATUS,
                COUNT: +d.COUNT,
                LATITUDE: d.LATITUDE,
                LONGITUDE: d.LONGITUDE
            };
        });
        delete data;
        

        //Crossfilter instance
        var ndx = crossfilter(dataParsed);
        var groupName = "Infraction";


        //Define Dimensions
        var neighbourhoodsDim = ndx.dimension(function(d) { return d.NEIGHBOURHOOD; });
        var complaintsDim = ndx.dimension(function(d) { return d.COMPLAINT; });
        var yearMonthDim = ndx.dimension(function(d) { return [d["MONTH_NUMBER"], d.YEAR]; });
        var initiatorDim = ndx.dimension(function(d) { return [d["INITIATED_BY"], d.STATUS]; });
        var neighbourCoordsDim = ndx.dimension(function(d) { return [d.NEIGHBOURHOOD, d.LATITUDE, d.LONGITUDE]; });


        //Define groups
        var groupByCount = function(d) { return d.COUNT; };
        var neighbourhoodGroup = neighbourhoodsDim.group().reduceSum(groupByCount);
        var complaintsGroup = complaintsDim.group().reduceSum(groupByCount);
        var yearMonthGroup = yearMonthDim.group().reduceSum(groupByCount);
        var statusGroup = initiatorDim.group().reduceSum(groupByCount);
        var coordsGroup = neighbourCoordsDim.group();
        var sumofAllInfractions = ndx.groupAll().reduceSum(groupByCount);


        //Define values (to be used by chart(s))
        //Got the colors from http://colorbrewer2.org
        var heatColors = ['#edf8e9','#bae4b3','#74c476','#31a354','#006d2c'];
        var mapColors = ['#f0f9e8','#bae4bc','#7bccc4','#43a2ca','#0868ac'];
        var otherColors =  ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99']; //for bubble and pie
        var pieScaleColors = d3.scale.quantize().domain([0,4]).range(otherColors);
        var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var neighCoords = coordsGroup.all().map(function(d) { 

            //Array with the 390 neighbourhoods and respective center coordinates
            //only need to access the data 
            d.key[1] = +d.key[1];
            d.key[2] = +d.key[2];

            return {
            name: d.key[0], 
            coord: [d.key[1], d.key[2]]
            };
        });

        //dispose the dimension and group not needed for interactive user filtering
        neighbourCoordsDim.dispose(); 
        coordsGroup.dispose();
        delete neighbourhoodsDim;
        delete coordsGroup;      


        //Charts, number display, filterCount, and select menu
        var dcMap = dc.leafletChoroplethChart("#map-plot", groupName);
        var pie = dc.pieChart("#pie-plot", groupName);
        var heatMap = dc.heatMap("#heat-plot", groupName);
        var bubbleCloud = dc.bubbleCloud("#bubble-plot", groupName);
        var totalDisplay = dc.numberDisplay("#number-stat", groupName);
        var neighbourSelections = dc.selectMenu("#select-container",groupName);
        var recordCounter = dc.dataCount("#records-count", groupName);


        //dataCount
        recordCounter.dimension(ndx)
                        .group(ndx.groupAll())
                    .html({some:'<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records.'});

        //selection menu
        neighbourSelections.dimension(neighbourhoodsDim)
                            .group(neighbourhoodGroup)
                            .multiple(true)
                            .numberVisible(11)
                            .controlsUseVisibility(true);


        //Leaflet Map                   
        //update colors and leaflet map legend with filtered data
        var choro = function() {

            //filtered data
            var neighbourhoodsArray = neighbourhoodGroup.all();

            var northEast = L.latLng(53.71784098729247, -113.170166015625);
            var southWest = L.latLng(53.39151868998397, -113.719482421875);
            var bounds = L.latLngBounds(southWest, northEast);

                return dcMap
                            .mapOptions({
                                center:[53.5550, -113.4450],
                                zoom: 10,
                                scrollWheelZoom: false,
                                maxBounds: bounds,
                                minZoom: 10
                            })
                            .dimension(neighbourhoodsDim)
                            .group(neighbourhoodGroup)
                            .geojson(geojson)
                            .colors(mapColors)
                            .colorDomain([d3.min(neighbourhoodsArray, dc.pluck('value')),
                                        d3.max(neighbourhoodsArray, dc.pluck('value'))])
                            .colorAccessor(function(d) { return d.value; })
                            .featureKeyAccessor(function(feature) { return feature.properties.name; })
                            .legend(dc.leafletLegend().position('bottomright'));
        };


        //pie chart
        pie
            .dimension(complaintsDim)
            .group(complaintsGroup)
            .radius(80)
            .innerRadius(60)
            .cx(280)
            .externalLabels(14)
            .label(function(d) {return ((d.value / sumofAllInfractions.value()) * 100).toFixed(2) + '%'; })
            .title(function(d) { return d.key + ': ' + ((d.value / sumofAllInfractions.value()) * 100).toFixed(2) + '%'; })
            .colorAccessor(function(d, i){return i;})
            .colors(pieScaleColors)
            .legend(dc.legend())
            .on('pretransition.legend', function(chart) { 
                
                //https://github.com/dc-js/dc.js/blob/master/web/examples/pie-external-labels.html
                //solution for adding dynamic data to legend
                chart.selectAll('.dc-legend-item text')   
                    .text('')
                    .append('tspan')
                    .text(function(d) { return d.name; })
                    .append('tspan')
                    .attr('x', 160)
                    .attr('text-anchor', 'end')
                    .text(function(d) { return d.data.toLocaleString(); });
                })
            .on("renderlet.pie", function(chart) {

                //click to null, to not cause a duplicate for the leaflet legend
                d3.selectAll(".dc-legend-item").on("click", null); 
                d3.selectAll("g.pie-slice path").on("click", null);
                d3.selectAll("g.pie-label-group text").on("click", null);
                });
        //the pie chart no to filter when clicked      
        pie.filter = function() {};              


         //heatmap    
        var heat = function() {
            
            //filtered data
            var yearMonthArray = yearMonthGroup.all();

            return heatMap
                          .dimension(yearMonthDim)
                          .group(yearMonthGroup)
                          .keyAccessor(function(d) { return d.key[0]; })
                          .valueAccessor(function(d) { return d.key[1]; })
                          .colsLabel(function(d, i){ return monthNames[i]})
                          .title(function(d) { return "Complaints: "+ d.value.toLocaleString(); })
                          .colorAccessor(function(d) { return d.value; })
                          .colors(heatColors)
                          .calculateColorDomain([d3.min(yearMonthArray, dc.pluck('value')), 
                                                 d3.max(yearMonthArray, dc.pluck('value'))]);
        };

        
        //BubbleCloud
        bubbleCloud
                    .dimension(initiatorDim)
                    .group(statusGroup)
                    .radiusValueAccessor(function(d) { return d.value; })
                    .r(d3.scale.linear())
                    .elasticRadius(true)
                    .x(d3.scale.ordinal())
                    .label(function(d){ return d.key[0]+": "+d.key[1]; })
                    .title(function(d) { return '('+d.key[0]+')'+d.key[1] + ': ' + d.value.toLocaleString(); })
                    .colorAccessor(function(d, i){return i;})
                    .colors(pieScaleColors);


        //number display
        totalDisplay
                    .group(sumofAllInfractions)
                    .valueAccessor(function(d) { return d; })
                    .formatNumber(d3.format(","));


        choro(); //draw chropleth
        heat();  //draw heatmap


        //Update choropleth if any of these charts gets filtered
        var notGeojsonCharts = [heat(), bubbleCloud ,neighbourSelections];

        //Update heatmap if any of these charts gets filtered
        var notHeatmapCharts = [bubbleCloud, neighbourSelections];

        
        notGeojsonCharts.forEach(function(chart) {
            chart.on("filtered.notGeojson", function(chart, filter) {
                
                erase('div.leaflet-bottom.leaflet-right div');//remove previous choropleth legend
                choro();
            });
        });

        notHeatmapCharts.forEach(function(chart) {
            chart.on("filtered.notHeatmap", function(chart, filter) {
                heat(); 
            });
        });



        //the leaflet map can only be accessed after rendering of the dc choropleth
        //the map is in within the dc name space
        choro().on("renderlet.choro", function(choropleth, filter){

            //the leaflet map instance
            var map = choro().map();

            //black and white basemap
            var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png');

            OpenStreetMap_BlackAndWhite.addTo(map);


            //after the neighbourhood selection has rendered add event listeners
            //listener to place marker and myinfo div on map
            neighbourSelections.on("renderlet.selectMenu", function(selectMenu, filter) {

                //retrives the name by get method
                //defined at values for charts
                var search = d3.map(neighCoords, function(d) { return d.name;});

                //neighbouhood options to add click listener
                var neighbourOptions = selectMenu.selectAll("option.dc-select-option");

                //select all option to delete marker and myinfo div 
                var selectAllOption = selectMenu.select("select.dc-select-menu option");

                selectAllOption.on("click.selectAll", function(){

                    erase('div.leaflet-top.leaflet-right div');//remove previous myinfo div
                    erase("div.leaflet-marker-pane img");//remove previous marker
                    erase("div.leaflet-shadow-pane img");//remove previous shade
                });


                neighbourOptions.on('click.option', function(d){
                    
                    //retrive coordinate of clicked neighbourhood
                    //and use it to place the location marker
                    var name = d.key;
                    var lat = search.get(name).coord[0];
                    var long = search.get(name).coord[1];
                    
                    var markerLocation = new L.LatLng( lat,long);
                    var info = L.control();//myinfo div

                    info.onAdd = function(map) {

                        this._div = L.DomUtil.create("div", "myinfo");
                        this.update();
                        return this._div;
                    };

                    info.update = function (props) {
                        
                        this._div.innerHTML = name;
                    };

                    erase('div.leaflet-top.leaflet-right div');//remove previous myinfo div
                    
                    info.addTo(map);

                    erase("div.leaflet-marker-pane img");//remove previous marker
                    erase("div.leaflet-shadow-pane img");//remove previous shade

                    var marker = L.marker(markerLocation).addTo(map);//marker
                });
            });
        });


        heat().on("renderlet.heat", function(chart, filter) {

            //select all heatmap rects to collect the colors and values
            //data for dynamic legend
            var heatRects = chart.selectAll("rect.heat-box")[0].map(function(rect) { 

                        var fill = rect.attributes["1"].textContent;
                        var value = rect.__data__.value;

                    return {fill: fill, value: value};
                });

            heatRects.sort(function(a, b){ return a.value - b.value;});


            //Legend for heatmap
            var len = heatRects.length;
            var barHeight = 20;
            var barWidth = 3;
            var barOffset = 0;
            var legendWidth = (len-1)*(barWidth + barOffset);
            var legendOrigin = {x:70, y:0};     

            var scaleSvg = d3.select('svg#heat-legend');

            var rects = scaleSvg.append('g').selectAll("rect")
                .data(heatRects)
                .enter()
                .append("rect")
                .attr({
                    height: barHeight,
                    width: barWidth,
                    y: legendOrigin.y,
                    x: function(d, i) { return legendOrigin.x + i*(barWidth + barOffset);},
                    fill: function(d, i){ return d.fill; }
                });

            var scaleText = [heatRects[0].value, heatRects[len -1].value];
            var xPositions = [legendOrigin.x, ((len-1) * (barWidth)) + (legendOrigin.x)];

            d3.selectAll("#heat-legend text").remove();
            
            scaleSvg.selectAll("text").data(scaleText)
            .enter()
            .append("text")
            .style('font-size',10)
            .text(function(d, i) { return d.toLocaleString();})
            .attr({
                x: function(d, i) {return xPositions[i];},
                y: 30
            });    
        });
        

        //to remove duplicate or previous divs
        var erase = function(selector) { d3.select(selector).remove(); };

        
        dc.renderAll(groupName);
    }

