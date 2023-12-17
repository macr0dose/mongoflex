import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({ isOpen, onDismiss, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-30" onClose={onDismiss}>
        <div className="fixed inset-0 bg-black bg-opacity-80" />
        <div className="flex items-center justify-center min-h-screen p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* Adjusted max-width and max-height */}
            <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all overflow-y-auto max-h-[95vh]">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
