import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For extracting URL parameters
import FillQuestion from "../../../../questionaire/components/fillquestion";
import { apiCall } from "../../../../../apiCalls/apiCalls";
import { getMySingleTest } from "../../../../../apiCalls/apiRoutes";
import SideBar from "../../../../mainComponent/SideBar";

// Example API function to fetch data based on ID

const Preview = (props) => {
  const { id } = useParams(); // Extracts the 'id' from the URL
  const [data, setData] = useState(null);

  const fetchDataById = async (id) => {
    apiCall("post", getMySingleTest, { id: id }).then((response) => {
      if (response.status == 200) {
        // console.log(response?.data?.data?.rows[0]);
        // const converted = convertData(response?.data?.data?.rows[0]);
        // console.log(converted);
        // mainObj = {
        // ...response?.data?.data?.rows[0],
        // ...converted
        // };
        const data = response?.data?.data;
        console.log(data);
        setData({
          id: data.obj.id,
          sendAll: !!data.sendAll,
          orientation: data.orientation,
          scoringType: data.scoringType,
          randomOrder: data.randomOrder,
          timeLimit: data.timeLimit,
          questions: data.questions,
          resultStructure: data.resultStructure,
          automaticText: data.automaticText,
          freeText: data.freeText,
          beforeTestText: data.beforeTestText,
          afterTestText: data.afterTestText,
          name: data.name,
          categoryStore: data.categoryStore,
          layout: data.layout,
          testObj: data.getobj,
        });
      }
    });
  };

  useEffect(() => {
    if (id) {
      const getData = async () => {
        try {
          const result = await fetchDataById(id);
          setData(result); // Save the data in state
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      getData();
    }
  }, [id]); // Re-fetch data if the ID changes

  return (
    <>
      <div hidden={props.obj?.tabSelected === "PREVIEW" ? false : true}></div>

      <SideBar />
      <div id="content" className=" w-auto sm:w-auto">
        {data?.testObj && (
          <div className="w-[80%] mx-auto">
            <div className="flex justify-center mt-8">
              <img
                src="/4.webp"
                alt="some image"
                width="300px"
                height="300px"
                className="pic"
              />
            </div>
            <FillQuestion
              questionData={data.testObj}
              language={data.language || "english"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Preview;
