import { Drawer, Button, Space, Radio, Divider } from "antd";
const History = (props) => {
  return (
    <>
      <div style={{ marginBottom: 10, fontWeight: "500" }}>
        <span>
          {" "}
          {props.checkin["date"]} {props.checkin["time"]}{" "}
        </span>
        <br></br>
        <span style={{ marginTop: 5, fontWeight: 200 }}>
          {props.checkin.current_address}
        </span>
        <Divider />
      </div>
    </>
  );
};
export default History;
