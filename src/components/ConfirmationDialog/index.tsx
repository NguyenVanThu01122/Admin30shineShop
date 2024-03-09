import ImageGeneral from "../Ui/image";
import { ConfirmationMessage, WrapperDialog } from "./styles";

const ConfirmationDialog = ({ message }: { message: string }) => {
  return (
    <WrapperDialog>
      <ImageGeneral
        className="confirmation-icon"
        src="https://img.myloview.com/posters/trash-can-icon-delete-remove-symbol-dustbin-recycle-bin-icon-garbage-can-400-196758048.jpg"
        alt=""
      />
      <ConfirmationMessage>{message}</ConfirmationMessage>
    </WrapperDialog>
  );
};

export default ConfirmationDialog;
