import { Map, Marker } from "./classes/map.js";

const createStaticMap = () => {
  const center = [-73.935242, 40.73061];
  const style =
    "https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAVnNXRGpENmlBemRPbHNKYjtkZmM2MTU4Yi0xNzJjLTQyMTMtYjAxNi1lNjcxNWIyNTc0ZjY=/drafts/0.json?key=cCWixuY0nWKANcaBVjgX2VaA5L0M7rrc";
  const map = new Map(center, 12, style, false);
  const marker = new Marker(map.map, "marker", center);
  marker.createMarker();
};

createStaticMap();
