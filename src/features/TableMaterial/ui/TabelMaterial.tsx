import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Table, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "shared/store/hooks";
import {
  materialSelector,
  fetchMaterials,
} from "shared/store/slices/materialSlice";
import { columns } from "./columns";
import { Container } from "./TabelMaterial.style";

const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

export const TabelMaterial = () => {
  const selectedMaterials = useAppSelector(materialSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMaterials());
  }, []);

  return (
    <Container>
      {selectedMaterials.loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <Table
          columns={columns}
          dataSource={selectedMaterials.info.materials}
        />
      )}
    </Container>
  );
};
