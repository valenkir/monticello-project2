export class Map {
  constructor(center, zoom, style, isInteractive) {
    this.map = tt.map({
      key: this.#key,
      interactive: isInteractive,
      container: "map",
      center: center,
      zoom: zoom,
      style: style,
    });
  }

  #key = "cCWixuY0nWKANcaBVjgX2VaA5L0M7rrc";

  getMap() {
    return this.map;
  }

  get key() {
    return this.#key;
  }
}

export class Marker {
  constructor(map, style, center) {
    this.map = map;
    this.style = style;
    this.center = center;
  }

  createMarker() {
    this.map.on("load", () => {
      const markerElem = document.createElement("div");
      markerElem.classList.add(this.style);
      const marker = new tt.Marker({ element: markerElem })
        .setLngLat(this.center)
        .addTo(this.map);
    });
  }
}
