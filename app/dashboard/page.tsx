/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
export default function Dashboard() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const authToken = Cookies.get("authToken");
  const fileRef = useRef(null);
  const [banner_image,setImage] = useState("");
  const [bannerURL, setBannerURL] = useState<any>("");
  // const [property, setProperty] = useState({ wifiName: "", wifiPassword: "" });

  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`)
  //     .then(res => res.json())
  //     .then(data => setProperty(data));
  // }, []);

  // const updateProperty = () => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(property)
  //   });
  // };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");
    const cost = Number(formData.get("cost"));

    const response = await axios.post(`${API_URL}/products`, {
      title,
      description,
      cost,
      file:bannerURL,
      banner_image
    },
    {
      headers:{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`
      }
    }
  );

    const data = await response.data;
    console.log(data);

    if (response.status === 200) {
      toast.success("Product added successfully");
    } else {
      toast.error("Product add failed");
    }
  }

  return (
    <div>

      <h1>Product Create</h1>

      <form onSubmit={handleSubmit} className="flex-col flex items-center">
        <input type="text" name="title" placeholder="Product Title"/>
        <input type="text" name="description" placeholder="Product Description"/>
        <input type="text" name="cost" placeholder="Product Cost"/>
        {bannerURL && <Image src={bannerURL} width={600} height={600} alt="" className="size-12 rounded-lg"/>}
        <input
        type="file"
        ref={fileRef}
        name="banner_image"
        id="bannerInput"
        onChange={(e:any) => {
          const file:any = e.target.files[0];
          setImage(file);
          setBannerURL(URL.createObjectURL(file));
          console.log(file);
        }}
        />
        <button type="submit" className="border">Add Product</button>
      </form>


      {/* <h1>Özelleştirme Paneli</h1>
      <label>WiFi Adı</label>
      <input
        type="text"
        value={property.wifiName}
        onChange={(e) => setProperty({ ...property, wifiName: e.target.value })}
      />
      <label>WiFi Şifresi</label>
      <input
        type="text"
        value={property.wifiPassword}
        onChange={(e) => setProperty({ ...property, wifiPassword: e.target.value })}
      />
      <button onClick={updateProperty}>Kaydet</button> */}
      
    </div>
  );
}
