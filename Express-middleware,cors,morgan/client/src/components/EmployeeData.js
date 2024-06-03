import React, { useEffect, useRef, useState } from "react";

function EmployeeData() {
  useEffect(() => {
    getCountriesListFromServer();
    getDepartmentListFromServer();
    getGenderListFromServer();
  }, []);

  let [employees, setEmployees] = useState([]);
  let [countriesList, setCountriesList] = useState([]);
  let [departmentList, setdepartmentList] = useState([]);
  let [genderList, setGenderList] = useState([]);

  let countrySelectRef = useRef();
  let genderSelectRef = useRef();
  let departmentSelectRef = useRef();

  let getEmployeeData = async () => {
    let reqOption = {
      method: "GET",
    };
    let url = `http://localhost:4444/employees?country=${countrySelectRef.current.value}&gender=${genderSelectRef.current.value}&department=${departmentSelectRef.current.value}`;
    // let url = `http://localhost:4444/employees/${countrySelectRef.current.value}/${genderSelectRef.current.value}/${departmentSelectRef.current.value}?order="asc"`;  ** params and query string **

    console.log(url);
    let JSONData = await fetch(url, reqOption);
    let JSOData = await JSONData.json();
    setEmployees(JSOData);
    console.log(JSOData);
  };
  let getCountriesListFromServer = async () => {
    let reqOption = {
      method: "GET",
    };
    let JSONData = await fetch(
      "http://localhost:4444/countriesList",
      reqOption
    );
    let JSOData = await JSONData.json();
    setCountriesList(JSOData);
    console.log(JSOData);
  };
  let getDepartmentListFromServer = async () => {
    let reqOption = {
      method: "GET",
    };
    let JSONData = await fetch(
      "http://localhost:4444/departmentList",
      reqOption
    );
    let JSOData = await JSONData.json();
    setdepartmentList(JSOData);
    console.log(JSOData);
  };
  let getGenderListFromServer = async () => {
    let reqOption = {
      method: "GET",
    };
    let JSONData = await fetch("http://localhost:4444/genderList", reqOption);
    let JSOData = await JSONData.json();
    setGenderList(JSOData);
    console.log(JSOData);
  };
  return (
    <div>
      <form>
        <div className="selectStyle">
          <label>Country: </label>
          <select ref={countrySelectRef}>
            {countriesList.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
          <label>Gender: </label>
          <select ref={genderSelectRef}>
            {genderList.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
          <label>Department: </label>
          <select ref={departmentSelectRef}>
            {departmentList.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              getEmployeeData();
            }}
          >
            Get Employee Data
          </button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>S.NO</th>
            <th>id</th>
            <th>ProfilePicture</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>

            <th>Country</th>
            <th>Department</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((ele, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{ele.id}</td>
                <td>
                  <img src={ele.profilepicture} alt="profileimg"></img>
                </td>
                <td>{ele.first_name}</td>
                <td>{ele.last_name}</td>
                <td>{ele.email}</td>
                <td>{ele.age}</td>
                <td>{ele.gender}</td>

                <td>{ele.country}</td>
                <td>{ele.department}</td>
                <td>₹ {ele.salary}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default EmployeeData;
