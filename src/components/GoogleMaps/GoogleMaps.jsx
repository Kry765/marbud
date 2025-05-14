import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

export default function GoogleMaps() {
  const position = { lat: 49.542597, lng: 19.105033 };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS}>
      <div style={{ height: "400px", width: "100%" }}>
        <Map
          defaultCenter={position}
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="YOUR_MAP_ID"
        >
          <AdvancedMarker position={position}>
            <Pin
              background={"#EA4335"}
              borderColor={"#B31412"}
              glyphColor={"#FFFFFF"}
            />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}
