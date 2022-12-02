import { Button, Form, message, Modal, Spin, Table } from "antd";
import { useQuery, useMutation } from '@apollo/client';
import { useState } from "react";
import { BUSINESSES, CREATE_BUSINESS, DELETE_BUSINESS, UPDATE_BUSINESS } from "../../apollo";
import * as S from "./styles";

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Company Size",
    dataIndex: "size",
    key: "size",
  },
];

type FormData = {
  name: string;
  address: string;
  size: number;
};

const Business = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selected, setSelected] = useState<FormData & { _id: string }>();
  const [createForm] = Form.useForm<FormData>();
  const [updateForm] = Form.useForm<FormData>();

  const { loading, data } = useQuery(BUSINESSES);
  const [ createBusiness, { loading: createLoading }] = useMutation(CREATE_BUSINESS, {
    update: (cache) => {
      cache.evict({
        fieldName: 'businesses',
      });
      cache.gc();
    },
    onCompleted: () => {
      setCreateModalOpen(false);
      message.success('Business created successfully');
    }
  });

  const [updateBusiness, { loading: updateLoading }] = useMutation(UPDATE_BUSINESS, {
    update: (cache) => {
      cache.evict({
        fieldName: 'businesses',
      });
      cache.gc();
    },
    onCompleted: () => {
      setUpdateModalOpen(false);
      message.success('Business updated successfully');
    }
  });

  const [deleteBusiness, { loading: deleteLoading }] = useMutation(DELETE_BUSINESS, {
    update: (cache) => {
      cache.evict({
        fieldName: 'businesses',
      });
      cache.gc();
    },
    onCompleted: () => {
      setUpdateModalOpen(false);
      message.success('Business deleted successfully');
    }
  });


  const create = () => {
    const { size, ...rest } = createForm.getFieldsValue();
    createBusiness({
      variables: {
        input: {
          ...rest,
          size: +size,
        }
      }
    })
  };

  const update = () => {
    const { size, ...rest } = updateForm.getFieldsValue();
    updateBusiness({
      variables: {
        id: selected?._id,
        input: {
          ...rest,
          size: +size,
        }
      }
    });
  };

  const remove = () => {
    deleteBusiness({
      variables: {
        id: selected?._id
      }
    });
  };

  if (loading) return <Spin />

  const datasource = data.businesses.map((i: { _id: string; }) => ({ ...i, key: i._id }))

  return (
    <S.Wrapper>
      <Button onClick={() => setCreateModalOpen(true)}>Add Business</Button>
      <Table
        dataSource={datasource}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setSelected(record);
              updateForm.setFieldsValue(record as FormData);
              setUpdateModalOpen(true);
            },
          };
        }}
      />
      <Modal
        open={createModalOpen}
        footer={null}
        title="Create Business"
        onCancel={() => setCreateModalOpen(false)}
      >
        <Form form={createForm} layout="horizontal" onFinish={create}>
          <Form.Item name="name" label="Name">
            <input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <input />
          </Form.Item>
          <Form.Item name="size" label="Size">
            <input type="number" />
          </Form.Item>

          <Button htmlType="submit" loading={createLoading}>Create</Button>
        </Form>
      </Modal>

      <Modal
        open={updateModalOpen}
        footer={null}
        onCancel={() => setUpdateModalOpen(false)}
        title="Update Business"
      >
        <Form form={updateForm} layout="horizontal" onFinish={update}>
          <Form.Item name="name" label="Name">
            <input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <input />
          </Form.Item>
          <Form.Item name="size" label="Size">
            <input type="number" />
          </Form.Item>

          <Button htmlType="submit" loading={updateLoading}>Update</Button>
          <Button
            onClick={remove}
            loading={deleteLoading}
            style={{ backgroundColor: "red", color: "white", marginLeft: '20px' }}
          >
            Delete
          </Button>
        </Form>
      </Modal>
    </S.Wrapper>
  );
};

export default Business;
