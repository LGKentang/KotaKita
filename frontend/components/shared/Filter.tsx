import clsx from 'clsx';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Filter() {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setDisplay(!display);
        }}
      >
        <Image
          src="../assets/filter-ascending-svgrepo-com.svg"
          height={10}
          width={10}
          alt="filter"
          className="size-8"
        />
      </button>
      <div
        className={clsx(
          'absolute z-20 mt-2 w-56 translate-y-10 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300',
          display
            ? 'scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        <div className="px-2 py-1">
          <div>
            <p className="text-center">Filter by status</p>
            <hr className="border-t-[1px] border-black" />
            <div>
              <div>
                <input id="active" type="checkbox" alt="active" />
                <label htmlFor="active" className="px-1 text-sm font-semibold">
                  Active
                </label>
              </div>
              <div>
                <input id="closed" type="checkbox" alt="closed" />
                <label htmlFor="closed" className="px-1 text-sm font-semibold">
                  Closed
                </label>
              </div>
              <div>
                <input id="active" type="checkbox" alt="active" />
                <label htmlFor="active" className="px-1 text-sm font-semibold">
                  Pending review
                </label>
              </div>
              <hr className="border-t-[1px] border-black" />
            </div>
            <p className="text-center">Filter by Votes</p>
            <div>
              <div>
                <input id="ascend" type="checkbox" />
                <label htmlFor="ascend" className="px-1 text-sm font-semibold">
                  Ascending
                </label>
              </div>
              <div>
                <input id="descend" type="checkbox" />
                <label
                  htmlFor="descending"
                  className="px-1 text-sm font-semibold"
                >
                  Descending
                </label>
              </div>
            </div>
            <hr className="border-t-[1px] border-black" />
            <p className="text-center">Filter by date</p>
            <div>
              <div>
                <input id="newest" type="checkbox" />
                <label htmlFor="newest" className="px-1 text-sm font-semibold">
                  Newest
                </label>
              </div>
              <div>
                <input id="oldest" type="checkbox" />
                <label htmlFor="oldest" className="px-1 text-sm font-semibold">
                  Oldest
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
