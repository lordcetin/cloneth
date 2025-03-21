/* eslint-disable @typescript-eslint/no-unused-vars */
import InstallPrompt from "@/components/InstallPrompt";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import PushNotificationManager from "@/components/PushNotificationManager";
import Test from "@/components/Test/Test";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Test/>
      <Loader />
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
