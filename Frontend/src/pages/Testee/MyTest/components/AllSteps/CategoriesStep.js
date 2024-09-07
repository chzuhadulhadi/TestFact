import React, { Component, useEffect, useState } from "react";
import "./steps.css";
import Modal from "react-bootstrap/Modal";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

var categoryCounter = 0;

function CategoriesStep(props) {
  const [categoryadder, setCategoryAdder] = useState(0);
  const [html, setHtml] = useState({});
  const [categoryHaveData, setCategoryHaveData] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = (e) => {
    e.preventDefault();
    setFormVisibility(!isFormVisible);
  };

  const [selectedCat, setSelectedCat] = useState({
    noOfQuestion: null,
    categoryName: "",
  });

  const [originalCat, setOriginalCat] = useState({
    noOfQuestion: null,
    categoryName: "",
  });

  useEffect(() => {
    if (Object.keys(props.obj.categoryStore).length > 0) {
      setCategoryHaveData(true);
    } else {
      setCategoryHaveData(false);
    }
  }, [props.obj.categoryStore]);

  useEffect(() => {
    if (props.obj?.mainObj?.categoryStore) {
      if (
        Object.keys(props.obj?.mainObj?.categoryStore).length > 0 &&
        categoryCounter === 0
      ) {
        setFormVisibility(true);
        categoryCounter +=
          Object.keys(props.obj?.mainObj?.categoryStore).length + 1;
      }
    }
  }, [props.obj?.mainObj?.categoryStore]);

  const categoryValueAdder = (e, name) => {
    props.obj.setCategoryStore((prev) => {
      let prevObj = Object.assign({}, prev);
      prevObj[categoryCounter]
        ? (prevObj[categoryCounter] = { ...prevObj[categoryCounter] })
        : (prevObj[categoryCounter] = { categoryName: "", noOfQuestion: 0 });
      prevObj[categoryCounter][name] = e.target.value;

      return {
        ...prevObj,
      };
    });
    return 0;
  };

  function addCategory(e) {
    e.preventDefault();
    document.getElementById("category-form").reset();
    ++categoryCounter;
    props.obj.addCategoryStoreToMain();
    props.obj.setNewCategoryCreated(categoryadder + 1);
    setCategoryAdder(categoryadder + 1);
  }

  function deleteCategory(e) {
    setCategoryHaveData(false);
    delete props.obj.categoryStore[e.target.id];
    setTimeout(() => {
      setCategoryHaveData(true);
    }, 30);
  }

  const editFunctionality = (e) => {
    setSelectedCategory(e);
    const catName = document.getElementById("categoryName" + e.index);
    const catQuestionNo = document.getElementById("noOfQuestion" + e.index);

    const Name = catName?.innerText;
    const QsNo = catQuestionNo?.innerText;
    setSelectedCat({
      categoryName: Name,
      noOfQuestion: QsNo,
    });

    setOriginalCat({
      categoryName: Name,
      noOfQuestion: QsNo,
    });

    setShowEditModal(true);
  };

  const handleClose = () => setShowEditModal(false);

  const editHandler = (e, selectedOne) => {
    setSelectedCat((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    var slctedone = document.getElementById(
      selectedOne + selectedCategory?.index
    );
    slctedone.innerHTML = e.target.value;

    props.obj.setCategoryStore((prev) => {
      let prevObj = Object.assign({}, prev);
      prevObj[selectedCategory?.index]
        ? (prevObj[selectedCategory?.index] = {
            ...prevObj[selectedCategory?.index],
          })
        : (prevObj[selectedCategory?.index] = {
            categoryName: "",
            noOfQuestion: 0,
          });
      prevObj[selectedCategory?.index][selectedOne] = e.target.value;

      return {
        ...prevObj,
      };
    });
  };

  function handleCategoryEditForm() {
    props.obj.setNewCategoryCreated(categoryadder + 1);
    setCategoryAdder(categoryadder + 1);
    props.obj.addCategoryStoreToMain();
    Object.keys(props.obj.mainObj.questions).map((key) => {
      if (
        props.obj.mainObj.questions[key].categoryName ===
        originalCat.categoryName
      ) {
        props.obj.mainObj.questions[key].categoryName =
          selectedCat.categoryName;
      }
    });
    setShowEditModal(false);
  }

  return (
    <>
      <div className="">
        <div hidden={props.obj.tabSelected === "CATEGORIES" ? false : true}>
          <div className="categories-content w-[70%] pb-20 mx-auto flex flex-col md:flex-row sm:w-[80%]">
            <div className="leftHalf w-[80%] mx-auto  lg:w-1/2">
              <Modal
                show={showEditModal}
                onHide={handleClose}
                animation={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="questionSetter">
                    <label className="form-label">Name of Category</label>
                    <input
                      id="categoryName"
                      type="text"
                      name="categoryField"
                      value={selectedCat?.categoryName}
                      onChange={(e) => editHandler(e, "categoryName")}
                      className="form-control mb-3 pt-3 pb-3 w-full"
                    />
                    <label className="form-label">No of Questions</label>
                    <input
                      id="noOfQuestion"
                      type="number"
                      value={selectedCat?.noOfQuestion}
                      onChange={(e) => editHandler(e, "noOfQuestion")}
                      className="form-control mb-3 pt-3 pb-3"
                    ></input>
                    <button onClick={handleCategoryEditForm}>Submit</button>
                  </div>
                </Modal.Body>
              </Modal>

              <form
                id="category-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  props.obj.showTab("QUESTIONS");
                }}
                className="formClass mt-5"
              >
                <section className="toggle">
                  <button
                    type="submit"
                    onClick={toggleFormVisibility}
                    className="md:w-1/2 w-full m-2"
                    style={{ position: "relative", right: "15px" }}
                  >
                    {isFormVisible ? "Create a category" : "Create a category"}
                  </button>
                  <button
                    type="button"
                    className="next-button md:w-1/2 w-full m-2"
                    onClick={() => {
                      props.obj.showTab("QUESTIONS");
                    }}
                    style={{ position: "relative", right: "15px" }}
                  >
                    Continue without categories
                  </button>

                  <h2 className="cate">
                    This is an advanced option which makes it possible to divide
                    your test into several
                    <br /> categories
                  </h2>
                </section>

                {isFormVisible && (
                  <>
                    <h3 className="ml-4">#2 - Categories</h3>
                    <div className="questionSetter ml-3">
                      <label className="form-label text-xs">
                        Name of Category
                      </label>
                      <input
                        id={"category"}
                        type="text"
                        name="categoryField"
                        onChange={(e) => categoryValueAdder(e, "categoryName")}
                        placeholder="Name Of Category"
                        className="form-control mb-3 pt-3 pb-3"
                      />
                      <label className="form-label">No of Questions</label>
                      <input
                        id={"category"}
                        type="number"
                        onInput={(e) => categoryValueAdder(e, "noOfQuestion")}
                        placeholder="No Of Qs"
                        className="form-control mb-3 pt-3 pb-3"
                      />
                      <br />
                    </div>
                    <button
                      onClick={(e) => addCategory(e)}
                      className="md:w-1/2 w-full m-2"
                      style={{ position: "relative", right: "3px" }}
                    >
                      Save Category
                    </button>
                  </>
                )}

                <br />
                <div className="fixed  bottom-0 left-0 shadow-lg p-3 bg-white w-full">
                  <div className="w-[90%]">
                    <button
                      type="submit"
                      className="float-end  w-max   text-white py-2 rounded"
                      onClick={(e) => {
                        props.obj.apiCallToCreateTest(e);
                      }}
                    >
                      Save Test & Close
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="rightHalf  lg:w-1/2 mt-5 md:mt-0">
              {categoryHaveData && (
                <>
                  {isFormVisible && (
                    <>
                      <h2>Categories Created</h2>
                      <table className="table table-striped w-full">
                        <thead>
                          <tr>
                            <th scope="col">Category</th>
                            <th scope="col">No of Qs</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(props.obj.categoryStore).map(
                            (key, index) => (
                              <tr key={index}>
                                <td
                                  id={"categoryName" + index}
                                  name="categoryName"
                                >
                                  {props.obj.categoryStore[key]["categoryName"]}
                                </td>
                                <td
                                  id={"noOfQuestion" + index}
                                  name="noOfQuestion"
                                >
                                  {props.obj.categoryStore[key]["noOfQuestion"]}
                                </td>
                                <td>
                                  <span
                                    style={{ color: "blue" }}
                                    className="btn"
                                    id={key}
                                    onClick={deleteCategory}
                                  >
                                    Delete
                                  </span>
                                  |
                                  <span
                                    style={{ color: "blue" }}
                                    className="btn"
                                    id={key}
                                    onClick={(e) => {
                                      editFunctionality({ index: index });
                                    }}
                                  >
                                    Edit
                                  </span>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <button
            onClick={() => props.obj.setTabSelected("PROPERTIES")}
            className="fixed ml-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
          >
            <ArrowBackIosRoundedIcon />
          </button>
          <button
            onClick={() => props.obj.setTabSelected("QUESTIONS")}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
          >
            <ArrowForwardIosRoundedIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default CategoriesStep;
