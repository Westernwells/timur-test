import React from 'react'

export default function ItemList(props) {
    const {
        category = "",
        items,
        onCategoryCick,
        onItemClick,
        index,
        selected,
        formik
      } = props;
    return (
        <div className="mt-6">
        <div className="">
          <div className="relative flex items-start bg-gray-100 p-2">
            {/* Item heaeder */}
            <div className="flex items-center h-5 ">
              <input
                id={category}
                onChange={(e) => onCategoryCick(e, index)}
                name={category}
                type="checkbox"
                checked={selected}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={category} className="font-medium text-gray-700">
                {category ? category : ""}
              </label>
            </div>
          </div>
          {/* sub Items */}
          {items.map(({ name, checked, id }, i) => {
            return (
              <div className="mt-4 pl-4 space-y-4" key={i}>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={id}
                      name="applicable_items"
                      type="checkbox"
                      value={id}
                      checked={formik.values.applicable_items.includes(id)}
                      onChange={(e) => {
                        onItemClick(e, index, i);
                      }}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={id} className="font-medium text-gray-700">
                      {name}
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
}
