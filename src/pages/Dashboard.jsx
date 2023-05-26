import React, { useState, useEffect } from "react";
import Scorecard from "../components/Scorecard";
import ChartView from "../components/Chart";
import TableList from "../components/TableList";
import { listings } from "../static/data";
import { alldata } from "../api/MOCK_DATA";
import { chartdata } from "../api/chartdata";

const Dashboard = () => {
  const [tabledata, settabledata] = useState([]);
  const [filterWord, setfilterWord] = useState("Today");
  const [tablefilterWord, settablefilterWord] = useState("Today");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
  const [id, setid] = useState(1);
  const [filteredUsers, setfilteredUsers] = useState(
    listings.filter((user) => {
      return user.givenAt.slice(8, 10) == 25;
    })
  );

  const categories = new Set();
  chartdata.forEach((obj) => {
    // mm/dd/yyyy
    // const d = obj.checkIn.split('/');
    categories.add(obj.date);
    // console.log(obj.date);
  });

  const data = new Set();
  chartdata.forEach((obj) => {
    data.add(obj.revenue);
  });

  // setfilteredUsers(listings.filter((user)=>user.userId===1));
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const onTableDropDownToggle = () => {
    // console.log("clicked");
    setIsTableDropdownOpen(!isTableDropdownOpen);
  };
  let sum = 0;
  for (let i = 0; i < listings.length; i++) {
    sum += listings[i].listings;
  }
  // console.log(listings[0].givenAt.slice(8,10));
  useEffect(() => {
    if (filterWord === "Today") {
      const listingData = listings.filter((user) => {
        return user.givenAt.slice(8, 10) >= 25;
      });
      setfilteredUsers(listingData);
    } else if (filterWord === "Last 7 days") {
      const listingData = listings.filter((user) => {
        return user.givenAt.slice(8, 10) >= 18;
      });
      setfilteredUsers(listingData);
    } else {
      const listingData = listings.filter((user) => {
        return user.givenAt.slice(8, 10) >= 1;
      });
      setfilteredUsers(listingData);
    }
  }, [filterWord]);

  useEffect(() => {
    if (tablefilterWord === "Start Date") {
      const sortedData = [...listings].sort((a, b) => {
        // Extract the createdAt values from the data objects
        const dateA = a.givenAt.slice(8, 10);
        const dateB = b.givenAt.slice(8, 10);

        if (dateA < dateB) {
          return -1; // a should come before b
        } else if (dateA > dateB) {
          return 1; // a should come after b
        } else {
          return 0; // a and b are equal
        }
      });
      settabledata(sortedData);
    }
  }, [tablefilterWord]);

  return (
    <div className="my-4">
      {/* Filtering Section */}
      <div className="flex items-center gap-4">
        <div className="w-4 h-8 rounded-sm bg-orange-300"></div>
        <h1 className="text-2xl font-bold">Listing Overview</h1>
        {/* Filtering Container */}
        <div
          onClick={toggleDropdown}
          className="flex items-center relative cursor-pointer gap-2 border rounded-full border-black px-4 py-1"
        >
          <h1 className="text-sm">{filterWord}</h1>
          {/* drop down icon */}

          {isDropdownOpen && (
            <div className="absolute min-w-max left-full mt-2 py-2 bg-white border border-gray-300 rounded shadow-lg">
              {/* Dropdown content */}
              <h1
                onClick={(ev) => setfilterWord("Today")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Today
              </h1>
              <h1
                onClick={(ev) => setfilterWord("Last 7 days")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Last 7 days
              </h1>
              <h1
                onClick={(ev) => setfilterWord("Last 30 days")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Last 30 days
              </h1>
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>

      {/* Scorecards Section */}
      <div className="flex gap-4 mt-4">
        <Scorecard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>
          }
          title={"Active listings"}
          number={filteredUsers.length}
          text={"765 this week"}
          color={"bg-blue-200"}
        />
        <Scorecard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
          }
          title={"Draft listings"}
          number={"2453"}
          text={"765 this week"}
          color={"bg-red-300"}
        />
      </div>
      {/* Chart Section */}
      <div className="flex items-center mt-6 gap-4">
        <div className="w-4 h-8 rounded-sm bg-orange-300"></div>
        <h1 className="text-2xl font-bold">Revenue Stats</h1>
      </div>
      <h1 className="text-2xl font-bold">{`\$${sum}k total revenue`}</h1>
      <ChartView categories={[...categories]} data={[...data]} />

      {/* Table List */}

      {/* Table Filtering Section */}

      <div className="flex items-center gap-4">
        <div className="w-4 h-8 rounded-sm bg-orange-300"></div>
        <h1 className="text-2xl font-bold">Employees Overview</h1>
        {/* Filtering Container */}
        <div
          onClick={onTableDropDownToggle}
          className="flex items-center relative cursor-pointer gap-2 border rounded-full border-black px-4 py-1"
        >
          <h1 className="text-sm">{tablefilterWord}</h1>
          {/* drop down icon */}

          {isTableDropdownOpen && (
            <div className="absolute min-w-max left-full mt-2 py-2 bg-white border border-gray-300 rounded shadow-lg">
              {/* Dropdown content */}
              <h1
                onClick={(ev) => settablefilterWord("End Date")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                End Date
              </h1>
              <h1
                onClick={(ev) => settablefilterWord("Start Date")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Start Date
              </h1>
              <h1
                onClick={(ev) => settablefilterWord("Engagement")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Engagement
              </h1>
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      <h1 className="py-3 font-bold ps-3 my-3 bg-red-400">
        Click on the calender icon near{" "}
        <span className="bg-green-300 rounded-full px-2">Check In</span> to
        filter according to date
      </h1>
      {/* <h1>You can also filter acc</h1> */}
      <TableList data={alldata} />
    </div>
  );
};

export default Dashboard;
