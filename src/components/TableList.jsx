import React, { useEffect, useState } from "react";

const TableList = ({ data }) => {
  const [search, setsearch] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [filteredData, setfilteredData] = useState(data);
  const [filterDate, setfilterDate] = useState(null);
  // const filteredData = data.filter((item) => {
  //   const date = item.checkIn.split("/");
  //   // const fd = filterDate
  //   // return filterDate==null ? true : date[0] == 12; // Filter the data based on the date
  //   if(filterDate!=null){
  //     const fd = filterDate.split('-');
  //   }
  // });

  useEffect(() => {
    // console.log(filterDate);
    // console.log(filterDate);
    if (filterDate != null && filterDate!='') {
      // yyyy-mm-dd
      const filtered = data.filter((item) => {
        // Assuming the date format in your data is "mm/dd/yyyy"
        // console.log(item.checkIn);
        const d = filterDate.split("-");

        const i = item.checkIn.split("/");

        return d[0].includes(i[2])&&d[1].includes(i[0])&&d[2].includes(i[1]);
      });
      setfilteredData(filtered);
      // console.log(filtered);
    } else {
      setfilteredData(data);
      // console.log(filtered);
    }
  }, [filterDate]);

  const checkInFilterDate = (ev) => {
    console.log(ev.target.value);
    setfilterDate(ev.target.value);
  };

  return (
    <div className="">
      <div className="flex my-6 bg-gray-200 px-6 rounded-full items-center mr-4">
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <input
          value={search}
          onChange={(ev) => setsearch(ev.target.value)}
          type="text"
          className="w-full text-gray-600 px-4 bg-gray-200 py-2 rounded-md focus:outline-none"
          placeholder="Search Table with Name"
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="p-2 w-full h-10 bg-gray-400 font-bold">
            <td className="pl-2">Name</td>
            <td>email</td>
            <td>gender</td>
            <td>How much paid</td>
            <td>due amount</td>
            <td>stocks</td>
            <td className="">
              Check In
              <input
                type="date"
                id="selectedDate"
                // value={selectedDate}
                onChange={checkInFilterDate}
                className="bg-gray-200 rounded-md w-4"
              />
            </td>
            <td>Check Out</td>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData
              .filter((item) => {
                return search === ""
                  ? item
                  : item.first_name
                      .toLowerCase()
                      .includes(search.toLowerCase());
              })
              .map((item, ind) => {
                return (
                  <tr key={ind} className="bg-slate-400">
                    <td className="pl-2">{item.first_name + " " + item.last_name}</td>
                    <td>{item.email}</td>
                    <td>{item.gender}</td>
                    <td>{item.paid}</td>
                    <td>{item.due}</td>
                    <td>{item.stocks}</td>
                    <td>{item.checkIn}</td>
                    <td>{item.checkOut}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
