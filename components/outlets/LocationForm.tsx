import { Form, FormInstance, Input, Button } from "antd";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { ReloadOutlined } from "@ant-design/icons";

// console.log(process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN);

// mapboxgl.accessToken =
//   process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN === undefined
//     ? ""
//     : process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN.toString();
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2l0dG9rYXR0byIsImEiOiJja2t5eTducm4wYmhwMnFwNXI4ejA4cGhuIn0.xoSKS41bJtuetZ8v5p_aiQ";

type Props = {
  //   children?: ReactNode;
  form: FormInstance;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errors: any) => void;
  current: number;
  lng: number;
  lat: number;
  zoom: number;
  setLatLng: (lat: number, lng: number) => void;
  onChangeLat: (lat: number) => void;
  onChangeLng: (lng: number) => void;
};

const LocationForm = ({
  form,
  onFinish,
  onFinishFailed,
  current,
  lat,
  lng,
  zoom,
  setLatLng,
  onChangeLat,
  onChangeLng,
}: Props) => {
  // Mapbox
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (current == 2) {
      // if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });

      const geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: map.current, // Set the mapbox-gl instance
        marker: false, // Do not use the default marker style
        placeholder: "Search for places in Berkeley", // Placeholder text for the search bar
        bbox: [95.2930261576, -10.3599874813, 141.03385176, 5.47982086834],
        // proximity: {
        //   longitude: -122.25948,
        //   latitude: 37.87221,
        // },
      });

      marker.current = new mapboxgl.Marker({
        draggable: true,
        color: "royalblue",
      });

      marker.current
        .setLngLat({
          lng: lng,
          lat: lat,
        })
        .addTo(map.current);

      marker.current.on("dragend", () => {
        var lngLat = marker.current!.getLngLat();
        console.log(
          "On Drag Longitude: " + lngLat.lng + " Latitude: " + lngLat.lat
        );
        // setLat(lngLat.lat);
        // setLng(lngLat.lng);
        // form.setFieldsValue({ latitude: lngLat.lat });
        // form.setFieldsValue({ longitude: lngLat.lng });
        setLatLng(lngLat.lat, lngLat.lng);
      });

      geocoder.on("result", function (e) {
        marker.current!.remove();
        marker.current!.setLngLat(e.result.center).addTo(map.current!);
        const longitude = e.result.center[0];
        const latitude = e.result.center[1];
        // setLat(latitude);
        // setLng(longitude);
        setLatLng(latitude, longitude);
      });

      map.current.on("click", function (e) {
        marker.current!.remove();
        marker.current!.setLngLat(e.lngLat).addTo(map.current!);
        // setLat(e.lngLat.lat);
        // setLng(e.lngLat.lng);
        setLatLng(e.lngLat.lat, e.lngLat.lng);
      });

      map.current.addControl(geocoder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const syncMap = () => {
    console.log("syncing map");
    if (map.current !== null && marker.current !== null) {
      marker.current.remove();
      marker.current
        .setLngLat({
          lng: lng,
          lat: lat,
        })
        .addTo(map.current);

      map.current?.setCenter([lng, lat]);
    }
  };

  return (
    <Form
      name="information"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ location_latitude: lat, location_longitude: lng }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <div>
        <div
          ref={mapContainer}
          className="map-container"
          style={{ marginBottom: 30 }}
        />
      </div>
      <Form.Item label="Latitude" name="location_latitude">
        <Input onChange={(e) => onChangeLat(Number(e.target.value))} />
      </Form.Item>
      <Form.Item label="Longitude" name="location_longitude">
        <Input onChange={(e) => onChangeLng(Number(e.target.value))} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center" }}>
        <Button
          htmlType="button"
          icon={<ReloadOutlined />}
          onClick={() => syncMap()}
        >
          Sync Map
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LocationForm;
