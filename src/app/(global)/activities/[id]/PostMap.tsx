'use client';

//Leaflet은 window, document 객체 필요 = 클라이언트 컴포넌트 가 필연적@@

import { useEffect, useState } from 'react';
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
  if (!coords) return <>불러오는중 ...</>;
  const position: [number, number] = [coords?.lat, coords?.lng]; // 좌표
  return (
    <MapContainer center={position} zoom={16} className='over-hidden h-full w-full'>
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
