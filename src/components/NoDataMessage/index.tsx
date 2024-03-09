import { Wrapper } from "./styles";

export default function NoDataMessage({ message }: { message: string }) {
  return <Wrapper>{message}</Wrapper>;
}
