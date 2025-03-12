/* eslint-disable @typescript-eslint/no-unused-vars */
import InstallPrompt from "@/components/InstallPrompt";
import PushNotificationManager from "@/components/PushNotificationManager";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
