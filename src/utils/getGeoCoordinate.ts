const getGeoCoordinate = async (address: string) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Geocoding API 요청 실패: ${res.status}`);
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
};

export default getGeoCoordinate;
