import React, { useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

// World topojson from react-simple-maps
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const COLOR_RANGE = ["#e0e7ff", "#3b82f6"];

function getCountryValueMap(data) {
  // region should be ISO_A3 or country name
  const map = {};
  data.forEach(d => {
    if (d.region) map[d.region.toUpperCase()] = d.value;
  });
  return map;
}

const GeoChoroplethMap = ({ data = [] }) => {
  const valueMap = useMemo(() => getCountryValueMap(data), [data]);
  const values = Object.values(valueMap);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);
  const colorScale = scaleLinear().domain([min, max]).range(COLOR_RANGE);

  return (
    <div style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <ComposableMap projectionConfig={{ scale: 120 }} width={800} height={350}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const iso = geo.properties.ISO_A3;
              const name = geo.properties.NAME;
              const value = valueMap[iso?.toUpperCase()] ?? valueMap[name] ?? 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={value ? colorScale(value) : "#f3f4f6"}
                  stroke="#fff"
                  style={{ outline: "none" }}
                >
                  <title>{name + ": " + value}</title>
                </Geography>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default GeoChoroplethMap; 