// ActionIcons.js
import iconDelete from "../../images/icon-delete.svg";
import iconEdit from "../../images/icon-edit.svg";
import ImageGeneral from "../Ui/image";
import { WrapperIcon } from "./styles";

export default function ActionIcons({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <WrapperIcon>
      <ImageGeneral onClick={onEdit} src={iconEdit} alt="" />
      <ImageGeneral onClick={onDelete} src={iconDelete} alt="" />
    </WrapperIcon>
  );
}
