/* eslint-disable @typescript-eslint/no-explicit-any */


export default function PropertyPage({ data }:{data:any}) {
  return (
    <div>
      <h1>Ev Bilgileri</h1>
      <p>WiFi Adı: {data.wifiName}</p>
      <p>WiFi Şifresi: {data.wifiPassword}</p>
    </div>
  );
}
