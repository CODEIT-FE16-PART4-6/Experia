//주소를 입력하면 위치를 반환해주는 geocoding API 이라고 하는 것을 활용
const getGeoCoordinate = async (address: string) => {
  console.log(address);

  //주소의 순서가 중요함. 막 넣으면 안되는것 같고 , 도로명주소, 지역구(상세 구역), 도시 (+우편번호도 있을수 있음), 국가
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
  );
  const data = await res.json();
  console.log('좌표값');
  console.log(data);
  if (!res.ok) {
    throw new Error(`Geocoding API 요청 실패: ${res.status}`);
  }
  //lat -위도 lng -경도
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
};

export default getGeoCoordinate;
