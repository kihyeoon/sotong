import CloseIcon from "@/components/ui/icons/CloseIcon";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 w-full h-full bg-black/60 z-50 flex flex-col justify-center items-center"
      onClick={(event) => {
        // 내부 요소가 아니라 외부의 section을 클릭했을 때만 닫히도록
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button className="fixed top-0 right-0 p-8 text-white" onClick={onClose}>
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-3/5 max-w-7xl rounded overflow-hidden">
        {children}
      </div>
    </section>
  );
}
