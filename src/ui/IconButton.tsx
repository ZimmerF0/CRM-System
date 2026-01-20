interface IconButtonProps {
  className: string;
  src: string;
  alt: string;
  onClick: () => void;
}

export const IconButton = ({ className, src, alt, onClick }: IconButtonProps) => {
  return (
    <button  onClick={onClick}>
      <img className={className} src={src} alt={alt} />
    </button>
  );
};
