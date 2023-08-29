import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

const Dropdown = ({
  items,
  selectedItem,
  setSelectedItem,
  label,
}: {
  items: string[] | readonly string[];
  selectedItem: string;
  setSelectedItem: () => void;
  label: string;
}) => {
  return (
    <div className="w-full">
      <label className="text-sm font-medium">{label}</label>

      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <div className="relative">
          <Listbox.Button className="relative capitalize w-full cursor-pointer rounded-full text-base px-4 py-2 text-left border border-black font-medium focus:outline-none">
            <span className="block truncate">{selectedItem}</span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-2xl bg-white text-base border border-black focus:outline-none">
              {items.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate capitalize ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Dropdown;
