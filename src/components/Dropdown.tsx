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
          <Listbox.Button className="relative capitalize w-full cursor-pointer rounded-full text-base px-4 py-2 text-left border border-black font-medium focus:outline-none">
            <span className="block truncate text-sm">{selectedItem}</span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute shadow mt-1 w-full overflow-auto rounded-2xl bg-white text-base border border-black focus:outline-none">
              {items.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default text-sm select-none py-2 px-4 ${
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
                            className="w-5 h-5"
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
