import { Listbox } from "@headlessui/react";
import { CaretDown, Check } from "phosphor-react";

interface ListBoxProps {
  selected: any,
  setSelected: any,
  placeholder: string,
  myArr: Array<any>,
  filterBy: Function,
}

export function CustomSelect(props: ListBoxProps) {
  return (
    <>
      <Listbox value={props.selected} onChange={props.setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded bg-zinc-900 py-3 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:text-sm">
            <span
              className={`block truncate ${
                props.selected ? "text-white" : "text-zinc-300"
              }`}
            >
              {props.selected ? props.selected : props.placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {props.myArr.map((data, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-violet-100 text-zinc-900" : "text-gray-900"
                  }`
                }
                value={props.filterBy(data)}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {props.filterBy(data)}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </>
  );
}
