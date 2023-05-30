https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-location/

http://geojson.io/

"geometry": {
        "coordinates": [
          [
            [
              -38.52075948760793,
              -3.734812924411287
            ],
            [
              -38.52104493975446,
              -3.7356674617257397
            ],
            [
              -38.52007009374495,
              -3.736006051752369
            ],
            [
              -38.51979541337778,
              -3.735135391420471
            ],
            [
              -38.52075948760793,
              -3.734812924411287
            ]
          ]
        ],
        "type": "Polygon"
      }

      Latitude	-3.7353
      Longitude	-38.5205

aws location \
        put-geofence \
            --collection-name Home \
            --geofence-id HomeArea \
            --geometry 'Polygon=[[[-38.52075948760793, -3.734812924411287],[-38.52104493975446, -3.7356674617257397],[-38.52007009374495, -3.736006051752369],[-38.51979541337778, -3.735135391420471],[-38.52075948760793, -3.734812924411287]]]'


{
    "CreateTime": "2023-05-23T18:05:14.054000+00:00",
    "GeofenceId": "HomeArea",
    "UpdateTime": "2023-05-23T18:05:14.054000+00:00"
}