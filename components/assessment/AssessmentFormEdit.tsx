import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Typography,
  Select,
  Image,
  Upload,
  Button,
} from "antd";
import axios from "axios";
import { database } from "firebase-admin";
import { ReactNode, useEffect, useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

interface IInformation {
  account_name: string;
  address: string;
  code: string;
  daily_target: number;
  name: string;
  phone: string;
  tank_capacity: string;
}

type Props = {
  //   children?: ReactNode;
  form: FormInstance;
  onFinish: (values?: any) => void;
  onFinishFailed: (errors?: any) => void;
};
const { Title } = Typography;
const { Option } = Select;

const options = [
  <Option value={"admin"} key={"admin"}>
    Admin
  </Option>,
  <Option value={"reguler"} key={"reguler"}>
    Reguler
  </Option>,
];
const options1 = [
  <Option value={"1"} key={"1"}>
    Active
  </Option>,
  <Option value={"0"} key={"0"}>
    Inactive
  </Option>,
];
const dataa = [1, 2, 3, 4];

function handleChange(value: any) {
  console.log(`Selected: ${value}`);
}
const p = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info: any) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: any) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AssessmentFormEdit = ({
  form,
  onFinish,
  onFinishFailed,
  nik,
  name,
  day,
  total_order,
  result,
  persentase,
}: any) => {
  const fetchEmployees = async () => {
    let response = await axios.get("/api/employees");
    setData(response.data.entriesData);
    console.log("data", response.data.entriesData);
    // setData(response.data.entriesData);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  const [data, setData] = useState([]);
  const dataa = [1, 2, 3, 4];
  const [presentase, setPresentase] = useState(0);
  const calculate = () => {
    // setPresentase();
  };

  const onSelected = () => {};
  return (
    <Form
      layout="vertical"
      name="information"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label="Karyawan"
        name="code"
        initialValue={`${nik},${name}`}
        rules={[
          {
            required: true,
            message: "Pilih employees",
          },
        ]}
      >
        <Select
          size="middle"
          // defaultValue={access}
          placeholder="Please select"
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {data.map((item) => {
            return (
              <Option value={`${item["code"]},${item["name"]}`} key={item}>
                {item["code"]} | {item["name"]}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Hari ke-"
        name="day"
        initialValue={day}
        rules={[
          {
            required: true,
            message: "Jumlah Hari tidak valid",
            pattern: new RegExp(/^[0-9]+$/),
          },
        ]}
      >
        <Input defaultValue={day} />
      </Form.Item>

      <Form.Item
        label="Jumlah Order"
        name="total_order"
        initialValue={total_order}
        rules={[
          {
            required: true,
            message: "Jumlah order tidak valid",
            pattern: new RegExp(/^[0-9]+$/),
          },
        ]}
      >
        <Input defaultValue={total_order} />
      </Form.Item>
      <Form.Item
        label="Hasil Order"
        name="result"
        initialValue={result}
        rules={[
          {
            required: true,
            message: "Hasil order tidak valid",
            pattern: new RegExp(/^[0-9]+$/),
          },
        ]}
      >
        <Input defaultValue={result} />
      </Form.Item>

      {/* <Form.Item label="Persentase (%)" name="persentase">
        <Input disabled={true} />
      </Form.Item>  */}

      {/* <Form.Item
        label="Status"
        name="is_active"
        rules={[
          {
            required: true,
            message: "Pilih Status",
          },
        ]}
      >
      {/* <Select
          size="middle"
          defaultValue={is_active}
          placeholder="Please select"
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {options1}
        </Select> */}
      {/* </Form.Item> */}
    </Form>
  );
};

export default AssessmentFormEdit;
