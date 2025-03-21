/* eslint-disable @typescript-eslint/no-unused-vars */
import InstallPrompt from "@/components/InstallPrompt";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import PushNotificationManager from "@/components/PushNotificationManager";
import Test from "@/components/Test/Test";
import Image from "next/image";

export default function Home() {

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js') // Service Worker dosyasının yolu
        .then((registration) => {
          console.log('Service Worker kaydedildi:', registration);
        })
        .catch((error) => {
          console.log('Service Worker kaydı başarısız:', error);
        });
    });
  }
  
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Test/>
      <Loader />
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
