mapboxgl.accessToken = 'pk.eyJ1IjoicGFvbGFnYXJheSIsImEiOiJja2NkcDliMzgwMHFpMnFtb2J2djQ0a3VsIn0.FAa7gpiYoJT2eCLEvVVsyA';
    var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.geocoding
        .forwardGeocode({
            //query: 'Wellington, New Zealand',
            query: `${currentAddress}`,
            autocomplete: false,
            limit: 1
        })
        .send()
        .then(function(response) {
            if (
                response &&
                response.body &&
                response.body.features &&
                response.body.features.length
            ) {
                var feature = response.body.features[0];

                var map = new mapboxgl.Map({
                    container: 'winemap',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: feature.center,
                    zoom: 10
                });
                new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
            }
        });