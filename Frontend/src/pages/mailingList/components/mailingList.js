import sectionImage from "../../homepage/css/images/sdas.png";
import sidesection from "../../homepage/css/images/3.avif";
import { React, useState, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import draftToHtml from 'draftjs-to-html';
import { apiCall } from "../../../apiCalls/apiCalls";
import { logoUploader, local, addLandingPage } from "../../../apiCalls/apiRoutes";
import "../style.css";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { json } from "react-router-dom";
import htmlToDraft from "html-to-draftjs";
import { ContentState } from "draft-js";
import { formToJSON } from "axios";
function MailingPageUI(params) {
  const navigate = useNavigate()
  const [showBox, setShowBox] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState();
  const [itemShowSelect, setItemShowSelect] = useState("");
  const [showChangeColor, setShowChangeColor] = useState(false);
  const [showPicEditor, setShowPicEditor] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [imageId, setImageId] = useState('');
  const [showPicAdder, setShowPicAdder] = useState(false);
  const [elementAttribute, setElementAttributes] = useState({
    paragraphTextContent: "",
    headingTextContent: "",
    imageUrl: "",
  });

  const [beforeTextState, setBeforeTextState] = useState(() =>
    EditorState.createEmpty()
  );
  const [beforeTestTextHtml, setBeforeTestTextHtml] = useState();
  // useEffect(() => {
  //   let html = convertToHTML(beforeTextState.getCurrentContent());
  //   setBeforeTestTextHtml(html);
  // }, [beforeTextState]);
  useEffect(() => {
    const isEmpty = beforeTextState.getCurrentContent().hasText() === false;
    if (!isEmpty) {
      let html = draftToHtml(convertToRaw(beforeTextState.getCurrentContent()));
      setBeforeTestTextHtml(html);
    }
  }, [beforeTextState])

  useEffect(() => {
    setBeforeTestTextHtml('')
    setBeforeTextState(() =>
      EditorState.createEmpty())
  }, [showTextEditor])

  const editTextEditorFunction = (e) => {
    console.log("texteditorfunction");
  };
  useEffect(() => {
    //add the html of selected seciton into the editorstate
    const selectedOne = document.getElementById(selectedDiv);
    if (selectedDiv === 'mmainNav6') {
      selectedOne = document?.getElementById('mainNav6');
    }
    if (selectedOne) {
      const html = selectedOne?.innerHTML;
      let contentBlock = htmlToDraft(html);
      if (contentBlock) {
        let contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        let editorState = EditorState.createWithContent(contentState);
        setBeforeTextState(editorState);
      }
    }
    setBeforeTestTextHtml('')
    // setBeforeTextState(() =>
    //   EditorState.createEmpty())
  }, [showTextEditor])
  const showToastMessage = (text, color, notify) => {
    if (notify == 1) {
      toast.success(text, {
        position: toast.POSITION.TOP_RIGHT,
        style: { color: color },
      });
    } else {
      toast.warning(text, {
        position: toast.POSITION.TOP_RIGHT,
        style: { color: color },
      });
    }
  };
  function addNewElement(nav) {
    setItemShowSelect("elements");
    setSelectedDiv(nav);
    setShowBox(true);
    document.querySelector(".dashboard").style.width = "15%";
    document.querySelector(".dashboard").style.display = "block";
    document.querySelector(".pageSection").style.width = "60%";
  }

  function adderFunction(params) {
    setItemShowSelect("attribute");
    setShowBox(false);
    setShowPicAdder(true);
    setShowTextEditor(false)
  }

  const editImageFunctionality = (e) => {
    setImageId(e.target.id)
    setShowPicEditor(true)
  };

  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    console.log(selectedDiv);
  }, [selectedDiv]);
  const imageUploaderFunction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    apiCall("post", logoUploader, formData)
      .then((res) => {
        let url = local + res.data.data;
        var newimg = document.createElement("img");
        newimg.src = url;
        newimg.id = selectedDiv + "img" + Math.random(1000);
        newimg.onclick = editImageFunctionality;
        var appendTo = document.getElementById(selectedDiv);
        console.log(appendTo);
        var sectionNameElement = appendTo.querySelector('h4.section-name');
        if (sectionNameElement) {
          sectionNameElement.parentNode.removeChild(sectionNameElement);
        }
        appendTo.appendChild(newimg);
        setShowPicAdder(false);
        showToastMessage("Logo uploaded Successfully ", "green", 1);

      })
      .then((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);

      });
  };

  const imageEditorFunction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    apiCall("post", logoUploader, formData)
      .then((res) => {
        let url = local + res.data.data;
        document.getElementById(imageId).src = url
        setShowPicEditor(false)
      })
      .then((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const form = document.getElementById('submissionForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    })
    return () => {
      form.removeEventListener('submit', (e) => {
        e.preventDefault();
      })
    }
  },[])
  const getImageFunction = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const imageUploadeFrFunction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    apiCall("post", logoUploader, formData)
      .then((res) => {
        let url = local + res.data.data;
        var newimg = document.createElement("img");
        newimg.src = url;
        newimg.id = selectedDiv + "img" + Math.random(1000);
        newimg.onclick = editImageFunctionality;
        var appendTo = document.getElementById(selectedDiv);
        console.log(appendTo);
        var sectionNameElement = appendTo.querySelector('h4.section-name');

        if (sectionNameElement) {
          sectionNameElement.parentNode.removeChild(sectionNameElement);
        }
        appendTo.appendChild(newimg);
        setShowPicAdder(false);
        showToastMessage("Image uploaded Successfully ", "green", 1);
      });
  };

  const hideFunctionality = () => {
    document.querySelector(".dashboard").style.width = "0%";
    document.querySelector(".dashboard").style.display = "none";
    document.querySelector(".pageSection").style.width = "90%";
  };

  const changeBackgroundColor = (e) => {
    let selectedOne = document.getElementById(selectedDiv);
    if (selectedDiv === 'mainNav6') {
      selectedOne = document.getElementById('mmainNav6');
    }
    selectedOne.style.background = e.target.value;

    var allnodes = selectedOne.childNodes;
    allnodes.forEach((ele) => {
      if (ele.style) {
        ele.style.color = "white";
      }
    });
  };

  const changeFontColor = (e) => {
    const selectedOne = document.getElementById(selectedDiv);
    selectedOne.childNodes.forEach((ele) => {
      if (ele.style) {
        ele.style.color = e.target.value
      }
    })
  }

  const [namingConvention, setNamingConvention] = useState({
    mainNav1: 'Section 1',
    mainNav2: 'Section 2',
    mainNav3: "Section 3",
    mainNav6: "Section 4",
    mainNav4: "Section 5",
    mainNav5: 'Section 6',
  })

  const savePageFunctionality = () => {
    const fullhtml = document.querySelector('.sectionToGet');

    if (fullhtml) {
      const convertedHtml = fullhtml.innerHTML.toString();

      apiCall('post', addLandingPage, { html: convertedHtml }, true)
        .then((res) => {
          if (res.status === 200) {
            showToastMessage("Landing Page added Successfully", "green", 1);
            // You can add code here to navigate to the dashboard if needed.
          }
        })
        .catch((err) => {
          showToastMessage(err?.response?.data?.message || "An error occurred", "red", 2);
        });
    } else {
      showToastMessage("Element with class 'sectionToGet' not found", "red", 2);
    }
  };


  return (
    <div className="fullWidth">
      <div className="dashboard">
        <h2> {namingConvention[selectedDiv]} </h2>
        <h5 onClick={() => {
          setShowTextEditor(true);
          setShowPicAdder(false);
        }}> Add text </h5>
        <h5 onClick={() => {
          adderFunction("img");
        }}>Add image</h5>
        <h5
          onClick={() => {
            setShowChangeColor(true)
          }}
        >Change Colors</h5>

        <h5 onClick={hideFunctionality}>Close sidear</h5>
      </div>
      <div className="pageSection" style={{ width: "100%" }}>
        <div className="sectionToGet">
          <div className="textEditorClass"
            style={showTextEditor ? { display: "block" } : { display: "none" }}
          >
            <div onClick={() => { setShowTextEditor(false) }} className="closebutton">X</div>
            <Editor
              editorState={beforeTextState}
              onEditorStateChange={setBeforeTextState}
              id="afterTestText"
              wrapperClassName="wrapper-class"
              // editorClassName="editor-class"
              editorStyle={{ backgroundColor: document.getElementById(selectedDiv)?.style?.background }}
              toolbarClassName="toolbar-class"
            />
            <button
              onClick={() => {
                const selectedOne = document.getElementById(selectedDiv);
                const newDiv = document.createElement("div");
                newDiv.innerHTML = beforeTestTextHtml;
                newDiv.onclick = editTextEditorFunction();
                newDiv.className = "dynamicDivClass";
                newDiv.id = "texteditor" + Math.random(10);
                // selectedOne.appendChild(newDiv);
                selectedOne.innerHTML = beforeTestTextHtml;
                setShowTextEditor(false)
              }}
            >
              Save
            </button>
          </div>
          <div
            className="textEditorClass"
            style={showPicAdder ? { display: "block" } : { display: "none" }}>
            <div onClick={() => { setShowPicAdder(false) }} className="closebutton">X</div>
            <form onSubmit={imageUploadeFrFunction} style={{ textAlign: "center" }}>
              <h2>Please choose a file</h2>
              <input className="form-control-file m-5 " type="file" onChange={getImageFunction} required /><br />
              <button type="submit"> Upload Image </button>
            </form>
          </div>

          <div
            className="textEditorClass"
            style={showPicEditor ? { display: "block" } : { display: "none" }}>
            <div onClick={() => { setShowPicEditor(false) }} className="closebutton">X</div>
            <form onSubmit={imageEditorFunction} style={{ textAlign: "center" }}>
              <h2>Please choose a file</h2>
              <input className="form-control-file m-5 " type="file" onChange={getImageFunction} required /><br />
              <button type="submit"> Upload Image </button>
            </form>
          </div>

          <div
            className="textEditorClass"
            style={showChangeColor ? { display: "block" } : { display: "none" }}>
            <div onClick={() => { setShowChangeColor(false) }} className="closebutton">X</div>
            <div className="m-5" style={{ textAlign: 'center' }}>
              <h2>Please Select Color</h2>
              <label className="mt-4">Background Color</label><br />
              <input className="form-control-file m-2" type="color" onChange={changeBackgroundColor} required /><br />

              <label className="mt-4">Font Color</label><br />
              <input className="form-control-file m-2" type="color" onChange={changeFontColor} required /><br />
              <button onClick={() => { setShowChangeColor(false) }}> Save </button>
            </div>
          </div>
          <section
            id="home"
            onClick={() => {
              addNewElement("mainNav1");
            }}
            className="parallax-section"
          >
            {/* <div className="container"> */}
            <div className="row">
              <div
                className="col-md-offset-1 col-md-12 col-sm-12 text-center"
                id="mainNav1"
              >
                {/* <h1 className="wow fadeInUp" data-wow-delay="1.6s">
                  SECTION 1
                </h1> */}
                <h4 class="section-name">Section 1</h4>

              </div>
            </div>
            {/* </div> */}
          </section>
          {showBox && (
            <div
              style={{
                display: "inline-block",
                top: "10px",
                backgroundColor: "yellow",
                position: "fixed",
              }}
            >
            </div>
          )}
          <section id="overview" className="parallax-section mt-5 container">
            {/* <div className="container"> */}
            <div className="row justify-content-center">
              <div
                className="col-md-5 col-sm-12 text-md-end"
                id="mainNav2"
                style={{ paddingRight: '10px', borderRadius: '10px', margin: '10px' }}
                onClick={() => {
                  addNewElement("mainNav2");
                }}
              >
                <h4 class="section-name">Section 2</h4>
              </div>
              <div
                className="wow fadeInUp col-md-5 col-sm-12 text-md-start"
                data-wow-delay="1s"
                style={{ paddingLeft: '10px', borderRadius: '10px', margin: '10px' }}
                id="mainNav3"
                onClick={() => {
                  addNewElement("mainNav3");
                }}
              >
                <div className="overview-detail">
                  <h4 class="section-name">Section 3</h4>
                </div>
              </div>
            </div>
            {/* </div> */}
          </section>

          <section id="blog" className="parallax-section mt-5" style={{ padding: 0 }}>
            <div className="container" id="mmainNav6" >
              <div className="row">
                <div className="col-md-12 col-sm-12 text-center container m-auto" id="mainNav6"
                  onClick={() => {
                    addNewElement("mainNav6");
                  }}>
                  <h4>
                    Enter the details here and we will contact you with the
                    results.
                  </h4>
                </div>
                <div
                  className="wow fadeInUp col-md-12 col-sm-12 w-50 m-auto"
                  data-wow-delay="0.9s"
                >
                  <form id="submissionForm" >
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        aria-describedby="emailHelp"
                        placeholder="First Name..."
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name..."
                        name="lastName"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email Address..."
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Phone Number..."
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="termAndCondition"
                        id="termAndCondition"
                        placeholder="First Name..."
                      />
                      <label className="form-check-label" htmlFor="exampleCheck1">
                        I agree to be sent promotional material from time to time. This registration can be removed at any time.
                      </label>
                    </div>
                    <button id='formsubmitbutton' type="submit" className="btn btn-primary">  
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section id="price" className="parallax-section mt-5 mb-5 container">
            {/* <div className="container"> */}
            <div className="row justify-content-center">
              <div
                className="wow fadeInUp col-md-5 col-sm-12 text-md-end"
                data-wow-delay="0.9s"
                id="mainNav4"
                style={{ paddingRight: '10px', borderRadius: '10px', margin: '10px' }}
                onClick={() => {
                  addNewElement("mainNav4");
                }}
              >
                <div className="pricing__item">
                  <h4 class="section-name">Section 5</h4>
                </div>
              </div>
              <div
                className="wow fadeInUp col-md-5 col-sm-12 text-md-start"
                data-wow-delay="1.6s"
                style={{ paddingLeft: '10px', borderRadius: '10px', margin: '10px' }}
                id="mainNav5"
                onClick={() => {
                  addNewElement("mainNav5");
                }}
              >
                <div className="pricing__item">
                  <h4 class="section-name">Section 6</h4>
                </div>
              </div>
            </div>
            {/* </div> */}
          </section>
        </div>
        <button className="btn btn-primary" onClick={() => { savePageFunctionality() }}>Save Landing page</button>
      </div>


    </div>
  );
}

export default MailingPageUI;
