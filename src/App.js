import { useState, useEffect } from "react";
import { SearchIcon, XCircleIcon } from "@heroicons/react/solid";
import {
  simplifyData,
  watchAllSelected,
  watchSelected,
  selectAll,
} from "./utils.js";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./index.css";
import Data from "./data";
function App() {
  const [state, setState] = useState({
    applicable_items: [],
    applied_to: "",
    name: "",
    rate: "",
  });

  const SignupSchema = Yup.object().shape({
    applied_to: Yup.string().required("Required"),
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    rate: Yup.number().required("Required").positive().integer(),
    applicable_items: Yup.array().min(1).required("Required"),
  });
  const red = simplifyData(Data);
  const [myData, setMyData] = useState(red);

  const onApplicableSelect = (e,setFieldValue) => {
    if (e.target.value === "all") {
      // map through all items and set them to checked and adding them to the array of check items
      // myData.map((data, i) =>{
      // })
      const { items, data } = selectAll(myData);
      // save the sate to all for the applicable field
      setState({ ...state, applied_to: "all", applicable_items: [...items] });
      setFieldValue("applicable_items",[...items] )
      setMyData([...data]);
    } else {
      setState({ ...state, applied_to: "some" });
      // set the applicable field state to select 'some'
    }
  };

  const categoryClick = (e, ci, setFieldValue) => {
    let dcopy = myData;
    let pickedItem = [];
    // let work = []
    if (e.target.checked === true) {
      let tbm = dcopy[ci];
      let work = tbm.items.map((item, i) => {
        item = { ...item, checked: true };
        pickedItem.push(item.id);
        return item;
      });
      // let thispicked = [...picked, ...pickedItem]
      let newSelected = [
        ...new Set([...state.applicable_items, ...pickedItem]),
      ];
      // set state for picked item
      setState({ ...state, applicable_items: [...newSelected] });
      setFieldValue("applicable_items",[...newSelected] )

      // setPicked([...newSelected]);
      // setPicked([...picked, ...pickedItem]);
      dcopy[ci].items = work;
      dcopy[ci].selected = true;
    }
    if (e.target.checked === false) {
      let tbm = dcopy[ci];
      let work = tbm.items.map((item, i) => {
        item = { ...item, checked: false };
        pickedItem.push(item.id);
        return item;
      });
      let newItem = [];
      state.applicable_items.map((pi) => {
        if (!pickedItem.includes(pi)) {
          newItem.push(pi);
        }
        return newItem;
      });
      // picked.map((pi) => {
      //   if (!pickedItem.includes(pi)) {
      //     newItem.push(pi);
      //   }
      //   return newItem;
      // });
      let newSelected = [...new Set(newItem)];
      // set state for picked item

      // setPicked([...newSelected]);
      dcopy[ci].items = work;
      dcopy[ci].selected = false;
      // setState({...state, })
      setState({
        ...state,
        applied_to: "some",
        applicable_items: [...newItem],
      });
      setFieldValue("applicable_items",[...newItem] )
      setFieldValue("applied_to", "some" )


    }
    setMyData([...dcopy]);

 
    // clicked item Category index: %d \n
    // `,e,ci)
  };
  useEffect(() => {
    if (watchAllSelected(myData)) {
      setState({ ...state, applied_to: "all" });
    }
  }, [myData]);

  // single item
  const itemClick = (e, ci, ii,setFieldValue) => {
    let dcopy = myData;
    // let work = []
    let selectedItem = "";
    if (e.target.checked === true) {
      let tbm = dcopy[ci];
      let work = tbm.items.map((item, i) => {
        if (i === ii) {
          item = { ...item, checked: true };
          selectedItem = item.id;
        }
        return item;
      });
     
      // set  picked item
      setState({
        ...state,
        applicable_items: [
          ...new Set([...state.applicable_items, selectedItem]),
        ],
      });

      setFieldValue("applicable_items", [
        ...new Set([...state.applicable_items, selectedItem]),
      ] )


      // setPicked([...picked, selectedItem])
      dcopy[ci].items = work;
      dcopy[ci].selected = watchSelected(work);
    } else {
      let tbm = dcopy[ci];

      let work = tbm.items.map((item, i) => {
        if (i === ii) {
          item = { ...item, checked: false };
          selectedItem = item.id;
        }
        // item = { ...item, checked: false };
        return item;
      });
  
      let newItem = [];
      let fill = state.applicable_items.filter((pi) => pi !== selectedItem);
      dcopy[ci].selected = false;
      dcopy[ci].items = work;
      setState({ ...state, applied_to: "some", applicable_items: [...fill] });
      setFieldValue("applied_to", "some")
      setFieldValue( "applicable_items", [...fill])
    }
    setMyData([...dcopy]);
  };
  return (
    <div className="w-2/3 md:w-3/5 mx-auto py-20">
      {/* form section */}
      {/*text to the left and button to the right to cancel two input, two radio button */}
      <Formik
        initialValues={{
          applicable_items: [],
          applied_to: "",
          name: "",
          rate: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <section className="">
              {/* top text */}
              <div className="flex justify-between">
                <h2 className="text-3xl font-semibold">Add Tax</h2>
                <XCircleIcon className="h-5 w-5 text-blue-500" />
              </div>
              {/* form inputs */}

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <div className="mt-1">
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      // value={state.name}
                      // onChange={onChange}
                      placeholder="name"
                      autoComplete="given-name"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Field
                      type="text"
                      name="rate"
                      id="rate"
                      // value={state.rate}
                      // onChange={onChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      aria-describedby="price-currency"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span
                        className="text-gray-500 sm:text-sm"
                        id="price-currency"
                      >
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* radio inputs */}
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Field
                    id="all"
                    checked={state.applied_to === "all"}
                    onChange={(event) => {
                      handleChange(event);
                      onApplicableSelect(event,setFieldValue);
                    }}
                    value="all"
                    name="applied_to"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor="all" className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">
                      Apply to all items in collection
                    </span>
                  </label>
                </div>
                <div className="flex items-center">
                  <Field
                    id="some"
                    name="applied_to"
                    checked={state.applied_to === "some"}
                    onChange={(event) => {
                      handleChange(event);
                      onApplicableSelect(event,setFieldValue);
                    }}
                    value="some"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor="some" className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">
                      Apply to specific items
                    </span>
                  </label>
                </div>
              </div>
            </section>
            <hr className="my-4" />
            {/* List section */}
            <section className="">
              {/* Seach input */}
              <div>
                <div className="mt-1 relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="search"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-2/3 md:w-1/3 pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search Items"
                  />
                </div>
              </div>
              {/* Items list; this will be turned to a reauseable component */}
              {myData
                ? myData.map((item, i) => (
                    <List
                      key={i}
                      index={i}
                      items={item.items}
                      name={item.name}
                      category={item?.category}
                      onItemClick={itemClick}
                      onCategoryCick={categoryClick}
                      selected={item.selected}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  ))
                : red.map((item, i) => (
                    <List
                      key={i}
                      index={i}
                      items={item.items}
                      name={item.name}
                      category={item?.category}
                      onItemClick={itemClick}
                      onCategoryCick={categoryClick}
                      selected={item.selected}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  ))}
            </section>
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  // onClick={onSubmit}
                  type="submit"
                  className="bg-yellow-500 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {`Apply tax to ${values.applicable_items.length} Items`}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;

function List(props) {
  const {
    category = "",
    name,
    items,
    onCategoryCick,
    onItemClick,
    index,
    selected,
    handleChange,
    setFieldValue
  } = props;
  return (
    <div className="mt-6">
      {/* <fieldset> */}
      <div className="">
        <div className="relative flex items-start">
          {/* Item heaeder */}
          <div className="flex items-center h-5">
            <input
              id={category}
              onChange={(e) => onCategoryCick(e, index, setFieldValue)}
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
        {items.map(({ name, checked, id,values }, i) => {
          return (
            <div className="mt-4 pl-4 space-y-4" key={i}>
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <Field
                    id={id}
                    name="applicable_items"
                    type="checkbox"
                    value={id}
                    checked={checked}
                    onChange={(e) => {
                      // handleChange(e);
                      onItemClick(e, index, i,setFieldValue);
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
      {/* </fieldset> */}
    </div>
  );
}
