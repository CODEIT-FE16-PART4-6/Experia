'use client';

//Leaflet은 window, document 객체 필요 = 클라이언트 컴포넌트 가 필연적@@

//hooks
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

//Map
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import getGeoCoordinate from '@/utils/getGeoCoordinate';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

//icon(leaflet production)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  iconRetinaUrl: iconRetina.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const PostMap = ({ address }: { address: string }) => {
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  /*
  const {
    data: coords,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['geocode', address], // 주소별로 캐싱
    queryFn: () => getGeoCoordinate(address),
    staleTime: 1000 * 60 * 60, // 1시간 동안 새로 요청 안 함
    cacheTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시 유지
  });
*/
  useEffect(() => {
    setMounted(true);

    const fetchCoords = async () => {
      try {
        const result = await getGeoCoordinate(address);
        setCoords(result);
      } catch (err) {
        console.error('주소 좌표 변환 실패:', err);
      }
    };
    fetchCoords();
  }, []);

  if (!mounted) return null;
  if (!coords) {
    return (
      <>
        <div className='absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-4 border-gray-200 border-t-transparent'></div>
        <p className='absolute top-10/35 left-1/2 -translate-x-1/2 -translate-y-1/3 text-gray-200'>
          지도 정보를 불러오는중입니다.
        </p>
      </>
    ); //휠스핀
  }
  // if (error) return <div>에러 발생 😢</div>;
  const position: [number, number] = [coords?.lat, coords?.lng]; // 좌표
  return (
    <MapContainer center={position} zoom={16} className='over-hidden z-0 h-full w-full'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>A sample marker</Popup>
      </Marker>
    </MapContainer>
  );
};

export default PostMap;
