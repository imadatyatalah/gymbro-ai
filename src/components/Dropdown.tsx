import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import CheckboxCircleFill from "@/icons/CheckboxCircleFill";

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
          <Listbox.Button className="relative w-full cursor-pointer rounded-full border border-black bg-white px-4 py-2 text-left text-base font-medium capitalize focus:outline-none">
            <span className="block truncate text-sm">{selectedItem}</span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-2xl border border-black bg-white text-base shadow focus:outline-none">
              {items.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none px-4 py-2 text-sm ${
                      active ? "bg-gray-100" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate capitalize ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>

                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                          <CheckboxCircleFill
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
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
