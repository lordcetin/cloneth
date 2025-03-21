'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react"
import { subscribeUser, unsubscribeUser, sendNotification } from '@/lib/actions'
 
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
 
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const PushNotificationManager = () => {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)
  const [message, setMessage] = useState('')
 
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])
 
  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub:any = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }
 
  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub:any = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }
 
  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }
 
  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage('')
    }
  }
 
  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }
 
  return (
    <div className="flex-col flex items-center gap-4">
      <h3 className="text-3xl font-black">Push Notifications</h3>
      {subscription ? (
        <>
          <p>Anlık bildirimlere abone oldunuz.</p>
          <button onClick={unsubscribeFromPush} className="bg-red-500 hover:bg-red-700 transition-all px-7 py-1 rounded-md cursor-pointer">Unsubscribe</button>
          <input
            type="text"
            placeholder="Enter notification message"
            className="border px-3 py-1 rounded-md w-80"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification} className="bg-teal-500 hover:bg-teal-700 transition-all px-7 py-1 rounded-md cursor-pointer">Send Test</button>
        </>
      ) : (
        <>
          <p>Anlık bildirimlere abone değilsiniz.</p>
          <button onClick={subscribeToPush} className="bg-blue-500 hover:bg-blue-700 transition-all px-7 py-1 rounded-md cursor-pointer">Subscribe</button>
        </>
      )}
    </div>
  )
}

export default PushNotificationManager;