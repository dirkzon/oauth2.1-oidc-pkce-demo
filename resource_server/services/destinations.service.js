const data = [
    {
        id: "5dfcef39-ef59-4042-ae95-3d42f9b97737",
        destinations: [
            { "city": "Paris", "lat": 48.8566, "long": 2.3522 },
            { "city": "New York", "lat": 40.7128, "long": -74.0060 },
            { "city": "Tokyo", "lat": 35.6762, "long": 139.6503 },
            { "city": "London", "lat": 51.5074, "long": -0.1278 },
            { "city": "Sydney", "lat": -33.8688, "long": 151.2093 },
            { "city": "Rio de Janeiro", "lat": -22.9068, "long": -43.1729 },
            { "city": "Cape Town", "lat": -33.9249, "long": 18.4241 },
            { "city": "Moscow", "lat": 55.7558, "long": 37.6173 },
            { "city": "Dubai", "lat": 25.276987, "long": 55.296249 },
            { "city": "Los Angeles", "lat": 34.0522, "long": -118.2437 }
        ]
    },
    {
        id: "086acf84-0d45-4090-be46-61eea211824d",
        destinations: [
            { "city": "Berlin", "lat": 52.5200, "long": 13.4050 },
            { "city": "Mumbai", "lat": 19.0760, "long": 72.8777 },
            { "city": "Beijing", "lat": 39.9042, "long": 116.4074 },
            { "city": "Rome", "lat": 41.9028, "long": 12.4964 },
            { "city": "Toronto", "lat": 43.651070, "long": -79.347015 },
            { "city": "Mexico City", "lat": 19.4326, "long": -99.1332 },
            { "city": "Cairo", "lat": 30.0444, "long": 31.2357 },
            { "city": "Buenos Aires", "lat": -34.6037, "long": -58.3816 },
            { "city": "Bangkok", "lat": 13.7563, "long": 100.5018 },
            { "city": "Istanbul", "lat": 41.0082, "long": 28.9784 }
        ]
    }
]

export const getDestinationsByID = (id) => {
    return data.find(userDestinations => userDestinations.id === id).destinations;
}

export default {
    getDestinationsByID,
}