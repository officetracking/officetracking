import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { useDispatchMap } from "./MapHook";
import { Drawer, Button, Space } from "antd";
import "jspdf-autotable";
import jsPDF from "jspdf";
import axios from "axios";
import History from "../../components/checkin/History";
const DashboardM = (props) => {
  const mapDispatch = useDispatchMap();
  const [mapViewport, setMapViewport] = useState({
    height: "100vh",
    width: "100wh",
    longitude: 106.6894306,
    latitude: -6.229728,
    zoom: 10,
  });
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeCurrentAddessm, setEmployeeCurrentAddress] = useState("");
  const [checkin, setCheckin] = useState([]);

  const showDrawer = () => {
    setVisible(true);
  };
  const onChange = (RadioChangeEvent) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setVisible(false);
  };

  const checkinHistory = async (code) => {
    let response = await axios.get(`/api/checkin`);
    setCheckin([...response.data.entriesData]);
    //console.log("historu checkin", response.data.entriesData);
  };
  //   const markers = React.useMemo(
  //     () =>
  //       data.map((city) => (
  //         <Marker
  //           key={city.name}
  //           longitude={city.longitude}
  //           latitude={city.latitude}
  //         >
  //           <img src="https://img.icons8.com/color/48/000000/marker.png" />
  //         </Marker>
  //
  //     [props.data]
  //   );
  //   const markers = props.employees.map((city) => {
  //     // <Marker longitude={-6.229728} latitude={-6.9510508}>
  //     //   <img src="https://img.icons8.com/color/48/000000/marker.png" />
  //     // </Marker>;
  //     <Marker
  //       latitude={-6.229728}
  //       longitude={106.6894306}
  //       offsetLeft={-20}
  //       offsetTop={-10}
  //     >
  //       <img src="https://img.icons8.com/color/48/000000/marker.png" />
  //     </Marker>;
  //   });
  const markers = React.useMemo(
    () =>
      props.employees.map((city) => (
        <Marker
          //   key={city.name}
          longitude={parseFloat(city.longitude)}
          latitude={parseFloat(city.latitude)}
          onClick={() => {
            checkinHistory(city.code);
            // console.log(city);
            // setEmployee(city);
            // setEmployeeName()
            setEmployeeName(city.name);
            setEmployeeCode(city.code);
            setEmployeeCurrentAddress(city.current_address);

            showDrawer();
          }}
        >
          <img src="https://img.icons8.com/color/48/000000/marker.png" />
        </Marker>
      )),
    [props.employees]
  );
  const c = React.useMemo(
    () => checkin.map((city) => <History checkin={city} />),
    [checkin]
  );

  const report = async () => {
    //await checkinHistory(employeeCode);
    var pdf = [];
    var doc = new jsPDF("p", "px", "a4");
    doc.text(`Riwayat Checkin ${employeeName} `, 10, 20);

    doc.autoTable({ html: "#my-table" });
    checkin.map((value) => {
      var data = [
        // dateFormat(value.date, "dd/mm/yyyy"),
        value.date,
        value.time,
        value.current_address,
      ];
      pdf.push(data);
    });

    doc.autoTable({
      margin: { top: 20 },
      headStyles: {
        fillColor: "#3498db",
        textColor: [255, 255, 255],
        fontSize: 10,
        padding: 0,
      },
      columnStyles: {
        0: { cellWidth: 50 },

        1: { cellWidth: 70, halign: "left" },
        2: { cellWidth: 300, halign: "left" },
      },
      thema: "grid",
      margin: { left: 10, right: 10 },
      head: [["Tanggal", "Waktu", "Lokasi checkin"]],
      body: pdf,
    });
    window.open(doc.output("bloburl"), "_blank");
  };

  useEffect(() => {
    checkinHistory();
  }, []);
  return (
    <ReactMapGL
      {...mapViewport}
      mapboxApiAccessToken="pk.eyJ1IjoidHJhY2tpbmcxMjEyIiwiYSI6ImNreWdyaGJ5aTBnbW8zMnFuejc2YnFxbG8ifQ.DhHZV81yuKczvH29K9qkDw"
      mapStyle="mapbox://styles/ernebuta/ck6l5q6me1dmn1ip74713pndm"
      onViewportChange={setMapViewport}
      //   onClick={(x) => {
      //     x.srcEvent.which === 1 &&
      //       mapDispatch({ type: "ADD_MARKER", payload: { marker: x.lngLat } });
      //   }}
    >
      {markers}
      {/* <Marker
        latitude={-6.229728}
        longitude={106.6894306}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <img src="https://img.icons8.com/color/48/000000/marker.png" />
      </Marker> */}

      <Drawer
        title="Detail employee"
        placement={placement}
        width={500}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            {/* <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button> */}
          </Space>
        }
      >
        <div className="employee-detailcontent">
          <div
            class="d-block p-2 bg-primary text-white"
            style={{ inline: true }}
          >
            {/* <div class="photo-profile">
              <span>{employeeName}</span>
            </div> */}
            <div>
              <span style={{ fontWeight: 550, fontSize: 15 }}>
                {employeeName}
              </span>
              <br></br>
              <span>{employeeCode}</span>
            </div>
          </div>
          <div
            className="rounded"
            style={{ marginTop: 30, background: "#dfe6e9" }}
          >
            <div style={{ padding: 10 }}>
              <span style={{ fontWeight: 550, fontSize: 15 }}>
                Lokasi Saat Ini
              </span>
              <br></br>
              <span>{employeeCurrentAddessm}</span>
            </div>
          </div>

          <div style={{ marginBottom: 5, textAlign: "right", marginTop: 40 }}>
            <Space>
              <Button onClick={report}>Report .pdf</Button>
            </Space>
          </div>
          <div>
            <div>
              <div>
                <span style={{ fontWeight: 550, fontSize: 15 }}>
                  Riwayat Checkin
                </span>
              </div>
              <div style={{ marginTop: 20 }}>
                {/* <span>{employeeCode}</span>
                 */}
                {c}
                {checkin.map((checkin) => {
                  <div style={{ marginTop: 10 }}>
                    <span>
                      <b>{checkin.time}</b>
                    </span>
                    ;<br></br>;<span>{checkin.current_address}</span>;
                  </div>;
                })}
                {/* </div> */}
                {/* <div style={{ textAlign: "right" }}>
                <span>Riwayat Checkin</span>
              </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <p>{employeeCode}</p> */}
        {/* <div className="content-employee">{empployee}</div> */}
      </Drawer>
    </ReactMapGL>
  );
};

export default DashboardM;
