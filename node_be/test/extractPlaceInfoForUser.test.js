// extractPlaceInfoForUser.test.js
import { extractPlaceInfoForUser } from "../config/placesapiprocessor.js"; 

const mockInput = {
    resourceSets: [
        {
            resources: [
                {
                    name: "Central Park",
                    address: {
                        formattedAddress: "New York, NY, USA",
                        locality: "New York",
                        adminDistrict2: "New York County",
                        adminDistrict: "NY",
                        countryRegion: "United States"
                    },
                    geocodePoints: [
                        { coordinates: [40.785091, -73.968285], calculationMethod: "Rooftop" }
                    ],
                    entityType: "Park",
                    confidence: "High",
                    bbox: [40.772032, -73.9817, 40.800637, -73.9587],
                    matchCodes: ["Good"]
                }
            ]
        }
    ]
};

const expectedOutput = [
    {
        name: "Central Park",
        address: "New York, NY, USA",
        city: "New York",
        latitude: 40.785091,
        longitude: -73.968285,
        category: "Park",
        confidenceLevel: "High",
        boundingBox: [40.772032, -73.9817, 40.800637, -73.9587],
        matchCodes: ["Good"],
        calculationMethod: "Rooftop",
        country: "United States",
        needSave: true
    }
];

describe("extractPlaceInfoForUser", () => {
    // Add additional tests as needed
    test("should correctly format and extract place information", () => {
        const result = extractPlaceInfoForUser(mockInput);
        expect(result).toEqual(expectedOutput);
    });

    test("should handle missing formattedAddress gracefully", () => {
        const inputWithoutFormattedAddress = {
            resourceSets: [
                {
                    resources: [
                        {
                            name: "Unknown Park",
                            address: {
                                locality: "San Francisco",
                                adminDistrict2: "San Francisco County",
                                adminDistrict: "CA",
                                countryRegion: "United States"
                            },
                            geocodePoints: [
                                { coordinates: [37.7749, -122.4194], calculationMethod: "Interpolation" }
                            ],
                            entityType: "Park",
                            confidence: "Medium",
                            bbox: [37.7577, -122.4376, 37.7929, -122.4021],
                            matchCodes: ["Approximate"]
                        }
                    ]
                }
            ]
        };

        const expectedResult = [
            {
                name: "Unknown Park",
                address: "San Francisco, San Francisco County, CA, United States",
                city: "San Francisco",
                latitude: 37.7749,
                longitude: -122.4194,
                category: "Park",
                confidenceLevel: "Medium",
                boundingBox: [37.7577, -122.4376, 37.7929, -122.4021],
                matchCodes: ["Approximate"],
                calculationMethod: "Interpolation",
                country: "United States",
                needSave: true
            }
        ];

        const result = extractPlaceInfoForUser(inputWithoutFormattedAddress);
        expect(result).toEqual(expectedResult);
    });

    test("should return an empty array if input resourceSets is empty", () => {
        const emptyInput = { resourceSets: [{ resources: [] }] };
        const result = extractPlaceInfoForUser(emptyInput);
        expect(result).toEqual([]);
    });
});
