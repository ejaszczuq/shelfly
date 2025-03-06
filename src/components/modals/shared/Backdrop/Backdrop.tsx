import "./Backdrop.scss";

interface BackdropProps {
  children: React.ReactNode;
  open: boolean;
  onClick?: () => void;
}

const Backdrop = ({ children, open, onClick = () => {} }: BackdropProps) => {
  return (
    <>
      {open ? (
        <div className="backdrop-wrapper open">
          <div className="backdrop" onClick={onClick} />
          {children}
        </div>
      ) : null}
    </>
  );
};

export default Backdrop;
