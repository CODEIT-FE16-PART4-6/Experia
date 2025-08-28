import Button from "@/components/Button"

interface PopupProps {

  message: string;
  onClose: () => void;
}

const Popup = ({ message, onClose }: PopupProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-7 m-6">
        <p className="text-nomad-black mx-6">{message}</p>
        <Button onClick={onClose} variant="POSITIVE" size="md">확인</Button>
      </div>
    </div>
  )
}
export default Popup;