import { Button, Form, message, Modal, Spin, Table } from "antd";
import { useQuery, useMutation } from '@apollo/client';
import { useState } from "react";
import { USERS, CREATE_USER, DELETE_USER, UPDATE_USER } from "../../apollo";
import * as S from "./styles";

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "id",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "Business ID",
    dataIndex: "businessId",
    key: "businessId",
  },
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  businessId: string;
};

const User = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selected, setSelected] = useState<FormData & { _id: string }>();
  const [createForm] = Form.useForm<FormData>();
  const [updateForm] = Form.useForm<FormData>();

  const { loading, data } = useQuery(USERS);
  const [ createUser, { loading: createLoading }] = useMutation(CREATE_USER, {
    update: (cache) => {
      cache.evict({
        fieldName: 'users',
      });
      cache.gc();
    },
    onCompleted: () => {
      setCreateModalOpen(false);
      message.success('User created successfully');
    }
  });

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    update: (cache) => {
      cache.evict({
        fieldName: 'users',
      });
      cache.gc();
    },
    onCompleted: () => {
      setUpdateModalOpen(false);
      message.success('User updated successfully');
    }
  });

  const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER, {
    update: (cache) => {
      cache.evict({
        fieldName: 'users',
      });
      cache.gc();
    },
    onCompleted: () => {
      setUpdateModalOpen(false);
      message.success('User deleted successfully');
    }
  });


  const create = () => {
    createUser({
      variables: {
        input: createForm.getFieldsValue(),
      }
    })
  };

  const update = () => {
    updateUser({
      variables: {
        id: selected?._id,
        input: updateForm.getFieldsValue(),
      }
    });
  };

  const remove = () => {
    deleteUser({
      variables: {
        id: selected?._id
      }
    });
  };

  if (loading) return <Spin />

  const datasource = data.users.map((i: { _id: string; }) => ({ ...i, key: i._id }))

  return (
    <S.Wrapper>
      <Button onClick={() => setCreateModalOpen(true)}>Add User</Button>
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
        title="Create User"
        onCancel={() => setCreateModalOpen(false)}
      >
        <Form form={createForm} layout="horizontal" onFinish={create}>
          <Form.Item name="firstName" label="First Name">
            <input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input />
          </Form.Item>
          <Form.Item name="businessId" label="Business ID">
            <input />
          </Form.Item>

          <Button htmlType="submit" loading={createLoading}>Create</Button>
        </Form>
      </Modal>

      <Modal
        open={updateModalOpen}
        footer={null}
        onCancel={() => setUpdateModalOpen(false)}
        title="Update User"
      >
        <Form form={updateForm} layout="horizontal" onFinish={update}>
          <Form.Item name="firstName" label="First Name">
            <input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input />
          </Form.Item>
          <Form.Item name="businessId" label="Business ID">
            <input />
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

export default User;

