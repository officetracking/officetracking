import { Form, FormInstance, Input, InputNumber } from "antd";
import { ReactNode } from "react";

type Props = {
  //   children?: ReactNode;
  form: FormInstance;
  onFinish: (values?: any) => void;
  onFinishFailed: (errors?: any) => void;
};

const GoodsForm = ({ form, onFinish, onFinishFailed }: Props) => {
  //   const onFinish = (values: any) => {
  //     console.log("Success:", values);
  //   };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log("Failed:", errorInfo);
  //   };

  return (
    <Form
      form={form}
      name="stock"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Stok Air Dalam Tampungan"
        name="water_stock"
        rules={[
          {
            required: true,
            message: "Masukkan stok air!",
          },
        ]}
      >
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
        label="Harga Beli Per Tangki"
        name="water_purchase_price"
        rules={[
          {
            required: true,
            message: "Masukkan harga beli!",
          },
        ]}
      >
        <InputNumber<number>
          defaultValue={0}
          addonBefore="Rp"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value: any) => Number(value.replace(/\$\s?|(,*)/g, ""))}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Stok Tutup Galon"
        name="gallon_closer_stock"
        rules={[
          {
            required: true,
            message: "Masukkan stok tutup galon!",
          },
        ]}
      >
        <InputNumber<number>
          defaultValue={0}
          addonAfter="Pcs"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value: any) => Number(value.replace(/\$\s?|(,*)/g, ""))}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Stok Tissue"
        name="tissue_stock"
        rules={[
          {
            required: true,
            message: "Masukkan stok tissue!",
          },
        ]}
      >
        <InputNumber<number>
          defaultValue={0}
          addonAfter="Pcs"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value: any) => Number(value.replace(/\$\s?|(,*)/g, ""))}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Stok Tissue CC2"
        name="cc2_tissue_stock"
        rules={[
          {
            required: true,
            message: "Masukkan stok tissue CC2!",
          },
        ]}
      >
        <InputNumber<number>
          defaultValue={0}
          addonAfter="Pcs"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value: any) => Number(value.replace(/\$\s?|(,*)/g, ""))}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Stok Tag"
        name="tag_stock"
        rules={[
          {
            required: true,
            message: "Masukkan stok tag!",
          },
        ]}
      >
        <InputNumber<number>
          defaultValue={0}
          addonAfter="Pcs"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value: any) => Number(value.replace(/\$\s?|(,*)/g, ""))}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Jumlah Stok Galon Kosong"
        name="empty_gallon_stock"
        rules={[
          {
            required: true,
            message: "Masukkan stok galon kosong!",
          },
        ]}
      >
        <InputNumber<number>
          defaultValue={0}
          addonAfter="Pcs"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value: any) => Number(value.replace(/\$\s?|(,*)/g, ""))}
          style={{ width: "100%" }}
        />
      </Form.Item>
    </Form>
  );
};

export default GoodsForm;
