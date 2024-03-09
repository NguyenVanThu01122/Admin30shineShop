import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { STRING } from "../../../../helper/constants";
import { StyledCommonModal } from "./styles";

export default function ModalDeleteClient({
  isModalDelete,
  handleDeleteClient,
  handleCancelModalDelete,
}: {
  isModalDelete: boolean;
  handleDeleteClient: () => void;
  handleCancelModalDelete: () => void;
}) {
  return (
    <StyledCommonModal
      open={isModalDelete}
      onOk={handleDeleteClient}
      onCancel={handleCancelModalDelete}
      width={520}
      centered
    >
      <ConfirmationDialog message={STRING.CONFIRM_DELETE_CUSTOMER} />
    </StyledCommonModal>
  );
}
