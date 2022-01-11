import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

interface ToastProps {
  information: string;
  icon: React.ReactNode;
  isNotifOpen: boolean;
  setIsNotifOpen: (params: any) => void;
}
function Toast(toastProps: ToastProps) {
  const { information, icon, isNotifOpen, setIsNotifOpen } = toastProps;
  const onClose = () => setIsNotifOpen(false);
  return (
    <Transition appear show={isNotifOpen} as={React.Fragment}>
      <Dialog
        open={isNotifOpen}
        onClose={onClose}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto "
      >
        <div className="min-h-screen flex justify-center items-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={clsx(
                "w-full max-w-[323px] sm:max-w-[490] py-[17px] px-[27px]",
                "transition-all transform bg-white shadow-xl rounded-xl",
                "flex gap-3.5 items-center"
              )}
              data-cy="modal-information"
            >
              {icon}
              <div className="text-children-1 font-medium text-sm leading-[21px]">
                {information}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Toast;
