const apiUrl = 'https://api.data.gov.sg/v1/environment/psi'
var environmentData = null;
var psi = null;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        environmentData = data.items[0].readings
        psi = environmentData.psi_twenty_four_hourly

        //latitude
        var westLatitude = data.region_metadata[0].label_location.latitude
        var eastLatitude = data.region_metadata[2].label_location.latitude
        var centLatitude = data.region_metadata[3].label_location.latitude
        var southLatitude = data.region_metadata[4].label_location.latitude
        var northLatitude = data.region_metadata[5].label_location.latitude
        //longtitude
        var westLongitude = data.region_metadata[0].label_location.longitude
        var eastLongitude = data.region_metadata[2].label_location.longitude
        var centLongitude = data.region_metadata[3].label_location.longitude
        var southLongitude = data.region_metadata[4].label_location.longitude
        var northLongitude = data.region_metadata[5].label_location.longitude

        //Attribution, zoom limits from leaftlet slides tutorial
        let tiles = new L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 18,
            minZoom: 11,
            //Do not remove this attribution
            attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;">' +
                'New OneMap | Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
        });

        //add max bounds from leaflet slides tutorial
        let map = new L.Map("map", {
            center: [1.347833, 103.809357], 
            zoom: 11,
            maxBounds: L.latLngBounds(L.latLng(1.1, 103.5), L.latLng(1.5, 104.3))
            })
            .addLayer(tiles);

        // add circle to the coordinates based on latitude longtitude
        // https://stackoverflow.com/questions/46021884/leaflet-how-to-add-a-number-to-the-center-of-a-circle 
        if (psi.west < 30){
            shape = 'circle-icon'
        }
        else{
            shape = 'circle-icon2'
        }

        var westCircle = L.marker([westLatitude, westLongitude], {
            icon: L.divIcon({
                className: shape,
                html: psi.west
            })
        });
        westCircle.addTo(map);

        if (psi.east < 30){
            shape = 'circle-icon'
        }
        else{
            shape = 'circle-icon2'
        }

        var eastCircle = L.marker([eastLatitude, eastLongitude], {
            icon: L.divIcon({
                className: shape,
                html: psi.east
            })
        });
        eastCircle.addTo(map);

        if (psi.central < 30){
            shape = 'circle-icon'
        }
        else{
            shape = 'circle-icon2'
        }

        var centCircle = L.marker([centLatitude, centLongitude], {
            icon: L.divIcon({
                className: shape,
                html: psi.central
            })
        });
        centCircle.addTo(map);

        if (psi.south < 30){
            shape = 'circle-icon'
        }
        else{
            shape = 'circle-icon2'
        }

        var southCircle = L.marker([southLatitude, southLongitude], {
            icon: L.divIcon({
                className: shape,
                html: psi.south
            })
        });
        southCircle.addTo(map);

        if (psi.north < 30){
            shape = 'circle-icon'
        }
        else{
            shape = 'circle-icon2'
        }

        var northCircle = L.marker([northLatitude, northLongitude], {
            icon: L.divIcon({
                className: shape,
                html: psi.north
            })
        });
        northCircle.addTo(map);


    });