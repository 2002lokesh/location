document.getElementById('getLocationBtn').addEventListener('click', function() {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Use OpenRouteService API to reverse geocode (optional)
            fetch(`https://api.openrouteservice.org/geocode/reverse?api_key=5b3ce3597851110001cf62489a859d0780e34040bdcb4899e4b93081&point.lon=${longitude}&point.lat=${latitude}`)
                .then(response => response.json())
                .then(data => {
                    const location = data.features[0].properties;
                    const locationDetails = `
                        Latitude: ${latitude}
                        Longitude: ${longitude}
                        Address: ${location.label}
                    `;
                    document.getElementById('locationOutput').innerText = locationDetails;
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('locationOutput').innerText = 'Error fetching location data.';
                });
        }, function(error) {
            console.error('Geolocation error:', error);
            document.getElementById('locationOutput').innerText = 'Error getting geolocation.';
        });
    } else {
        document.getElementById('locationOutput').innerText = 'Geolocation not supported.';
    }
});
