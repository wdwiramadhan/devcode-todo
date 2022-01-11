import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Button } from "..";
import clsx from "clsx";

interface DeleteModalProps {
  deleteModal: any;
  setDeleteModal: (params: any) => void;
  onDelete: (params: number) => void;
  isLoading: boolean;
  feature: string;
}
function DeleteModal(props: DeleteModalProps) {
  const { deleteModal, setDeleteModal, onDelete, isLoading, feature } = props;
  const onClose = () => setDeleteModal({ ...deleteModal, isOpen: false });
  return (
    <Transition appear show={deleteModal.isOpen} as={React.Fragment}>
      <Dialog
        open={deleteModal.isOpen}
        onClose={onClose}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto "
      >
        <div
          className="min-h-screen flex justify-center items-center"
          data-cy="modal-delete"
        >
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
                "w-full max-w-[320px] sm:max-w-[490px]",
                "transition-all transform bg-white shadow-xl rounded-xl",
                "pt-[40px] pb-[36px] px-[38px] sm:pt-[40px] sm:pb-[43px] sm:px-[62px]"
              )}
            >
              <div className="flex justify-center">
                <ExclamationIcon className="text-danger h-[62px] w-[62px] sm:h-[84px] sm:w-[84px] stroke-1" />
              </div>
              <h3 className="mt-[29px] sm:mt-[34px] font-medium text-center text-sm sm:text-lg leading-[27px] text-secondary-1">
                {`Apakah anda yakin menghapus ${feature} `}
                <span className="font-bold">{`“${deleteModal.item}”`}</span>
              </h3>
              <div className="mt-[40px] sm:mt-[46px] flex justify-center gap-[20px]">
                <Button variant="dark" onClick={onClose}>
                  Batal
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onDelete(deleteModal.dataId)}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Hapus
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DeleteModal;
