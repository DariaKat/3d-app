import { FC, useState } from "react";
import { Form, TextForm } from "./Form.styled";
import { RocketOutlined } from "@ant-design/icons";
import { updateProfile } from "firebase/auth";
import { Upload, Avatar, Typography } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "app/firebase";
import { useAuth } from "shared/hooks/AuthContext";

const { Title } = Typography;

export const AccountInfo: FC = () => {
  const [urlPhoto, setUrlPhoto] = useState(null);
  const { user, ga } = useAuth();
  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    const file = info.file.originFileObj;
    if (!file) return;

    const storageRef = ref(storage, `files/${user._id}`);
    await uploadBytesResumable(storageRef, file);

    const photoUrl = await getDownloadURL(storageRef);
    setUrlPhoto(photoUrl);
    await updateProfile(ga.currentUser, {
      photoURL: photoUrl,
    });
  };

  return (
    <div>
      <Form>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleChange}
        >
          <Avatar
            size={99}
            style={{ backgroundColor: "#c2c2c2" }}
            src={urlPhoto ? urlPhoto : user?.avatar}
            icon={<RocketOutlined />}
          />
        </Upload>

        <TextForm>
          <Title level={4}>Имя пользователя: {user?.name}</Title>
          <Title level={4}>Электронная почта: {user?.email}</Title>
        </TextForm>
      </Form>
    </div>
  );
};
