import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Typography,
  Select,
} from "antd";
import { ReactNode } from "react";

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

function handleChange(value: any) {
  console.log(`Selected: ${value}`);
}

const AuthForm = ({ form, onFinish, onFinishFailed }: Props) => {
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
      <Form.Item label="Username" name="username">
        <Input style={{ width: "200%" }} />
      </Form.Item>
      <Form.Item label="password" name="password">
        <Input.Password style={{ width: "200%" }} />
      </Form.Item>
      {/* <Button type="primary" icon={<PoweroffOutlined />} loading /> */}
    </Form>
  );
};

export default AuthForm;
