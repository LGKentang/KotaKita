'use client';
import Image from 'next/image';
import { Button } from './Button';

type ModalProps = {
  closeModal: () => void;
};

export default function Modal({ closeModal }: ModalProps) {
  return (
    <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="h-96 w-[60%] rounded-lg border bg-white p-8 shadow-lg">
        <div>
          <div className="flex justify-between px-5">
            <h3 className="text-lg font-bold text-gray-900">Change Profile</h3>
            <button
              onClick={closeModal}
              className="rounded-full px-4 py-2 duration-700 hover:bg-red-400 focus:outline-none"
            >
              <Image
                src="https://www.svgrepo.com/show/522506/close.svg"
                width={13}
                height={13}
                alt="close button"
                className="size-4"
              />
            </button>
          </div>
          <form className="mt-2 px-7 py-3">
            <div className="flex flex-col">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="text-md mb-2 block font-medium text-gray-900"
                >
                  Insert name
                </label>
                <input
                  type="text"
                  id="name"
                  className="block w-full rounded-lg border border-gray-400 bg-slate-200 p-2 text-sm text-gray-900 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="text-md mb-2 block font-medium text-gray-900"
                >
                  Change bio
                </label>
                <textarea
                  id="bio"
                  className="block w-full resize-none rounded-lg border border-gray-400 bg-slate-200 p-2 text-sm text-gray-900 focus:outline-none"
                  maxLength={80}
                />
              </div>
            </div>
            <Button className="right-0 mt-5 border-green-200 bg-green-500 text-white hover:border-green-200 hover:bg-white hover:text-black">
              Change
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
