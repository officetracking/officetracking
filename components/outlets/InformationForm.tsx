import { Form, FormInstance, Input, InputNumber, message } from "antd";
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

const InformationForm = ({ form, onFinish, onFinishFailed }: Props) => {
  return (
    <Form
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
        label="Kode Outl"
        name="code"
        rules={[
          {
            required: true,
            message: "Masukkan kode outlet!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nama"
        name="name"
        rules={[
          {
            required: true,
            message: "Masukkan nama outlet!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nama Akun"
        name="account_name"
        rules={[
          {
            required: true,
            message: "Masukkan nama outlet!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Target Penjualan Per Hari"
        name="daily_sales_target"
        rules={[
          {
            required: true,
            message: "Masukkan target penjualan!",
          },
        ]}
      >
        {/* <Input /> */}
        <InputNumber<number>
          defaultValue={0}
          addonAfter="Liter"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value: any) => Number(value.replace(/\$\s?|(,*)/g, ""))}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Kapasitas Tangki Bahan Baku"
        name="raw_material_capacity"
        rules={[
          {
            required: true,
            message: "Masukkan kapasitas tangki!",
          },
        ]}
      >
        {/* <Input /> */}
        <InputNumber<number>
          defaultValue={0}
          addonAfter="Liter"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value: any) => Number(value.replace(/\$\s?|(,*)/g, ""))}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Telepon"
        name="phone"
        rules={[
          {
            required: true,
            message: "Masukkan nomor telepon!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Alamat"
        name="address"
        rules={[
          {
            required: true,
            message: "Masukkan alamat!",
          },
        ]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
    </Form>
  );
};

export default InformationForm;
