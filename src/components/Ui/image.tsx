interface ImageProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  loading?: "eager" | "lazy";
}
const ImageGeneral = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  onClick,
  onLoad,
  onError,
  loading,
}: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
      loading={loading}
    />
  );
};
export default ImageGeneral;
