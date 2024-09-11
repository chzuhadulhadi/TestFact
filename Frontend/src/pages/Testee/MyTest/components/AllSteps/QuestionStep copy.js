import React, { useState, useRef } from "react";
import {
  Grid,
  Button,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { PhotoCamera, AttachFile, Delete, Search } from "@mui/icons-material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

function QuestionStep(props) {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState({
    type: "Single Choice",
    question: "",
    options: [],
    timeLimit: 20,
    points: 1,
    image: null,
    file: null,
    answers: [],
    correctAnswers: [],
    answerImages: [],
    freeTextImage: null, // Added for free text image
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const resetFields = () => {
    setCurrentQuestion({
      type: "Single Choice",
      question: "",
      options: [],
      timeLimit: 20,
      points: 1,
      image: null,
      file: null,
      answers: [],
      correctAnswers: [],
      answerImages: [],
      freeTextImage: null, // Reset free text image
    });
  };

  const isValidQuestion = () => {
    const { question, options, answers, type } = currentQuestion;
    if (!question.trim()) return false; // Check if question is empty
    if (type !== "Free Text" && options.length === 0) return false; // Ensure options are present if not Free Text
    if (type !== "Free Text" && answers.length !== options.length) return false; // Ensure answers match options
    return true;
  };

  const handleAddQuestion = () => {
    if (!isValidQuestion()) {
      alert("Please complete all required fields before adding the question.");
      return;
    }
    setQuestions([...questions, { ...currentQuestion }]);
    resetFields();
    handleClose();
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...currentQuestion.answers];
    newAnswers[index] = value;
    setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
  };

  const handleCorrectAnswerChange = (index, value) => {
    const newCorrectAnswers = [...currentQuestion.correctAnswers];
    newCorrectAnswers[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswers: newCorrectAnswers,
    });
  };

  const handleAnswerImageChange = (index, e) => {
    const newAnswerImages = [...currentQuestion.answerImages];
    newAnswerImages[index] = e.target.files[0];
    setCurrentQuestion({ ...currentQuestion, answerImages: newAnswerImages });
  };

  const handleImageChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, image: e.target.files[0] });
  };

  const handleFileChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, file: e.target.files[0] });
  };

  const handleFreeTextImageChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      freeTextImage: e.target.files[0],
    });
  };

  const handleDeleteAnswer = (index) => {
    const newOptions = [...currentQuestion.options];
    const newAnswers = [...currentQuestion.answers];
    const newCorrectAnswers = [...currentQuestion.correctAnswers];
    const newAnswerImages = [...currentQuestion.answerImages];

    newOptions.splice(index, 1);
    newAnswers.splice(index, 1);
    newCorrectAnswers.splice(index, 1);
    newAnswerImages.splice(index, 1);

    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
      answers: newAnswers,
      correctAnswers: newCorrectAnswers,
      answerImages: newAnswerImages,
    });
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSaveQuestion = () => {
    if (!isValidQuestion()) {
      alert("Please complete all required fields before saving the question.");
      return;
    }
    setQuestions([...questions, { ...currentQuestion }]);
    resetFields();
    handleClose();
  };

  const handleAddOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [
        ...currentQuestion.options,
        `Option ${currentQuestion.options.length + 1}`,
      ],
      answers: [...currentQuestion.answers, ""],
      correctAnswers: [...currentQuestion.correctAnswers, false],
      answerImages: [...currentQuestion.answerImages, null],
    });
  };

  // Search functionality
  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return props.obj.tabSelected == "QUESTIONS" ? (
    <>
      <h2 className="m-4 w-[90%] mx-auto">3# - Question</h2>
      <div className="w-[90%] mx-auto">
        <TextField
          className="w-[30%]"
          label="Search Questions"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginTop: "20px", marginBottom: "20px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{
          marginTop: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Add a Question
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle}>
          <Grid
            container
            spacing={2}
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Grid item xs={12} style={{ display: "flex", gap: "10px" }}>
              <Select
                label="Question Type"
                variant="outlined"
                fullWidth
                value={currentQuestion.type}
                onChange={handleQuestionChange}
                name="type"
              >
                <MenuItem value="Single Choice">Single Choice</MenuItem>
                <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                <MenuItem value="Free Text">Free Text</MenuItem>
              </Select>

              <TextField
                label="Time Limit (seconds)"
                variant="outlined"
                type="number"
                fullWidth
                name="timeLimit"
                value={currentQuestion.timeLimit}
                onChange={handleQuestionChange}
              />

              <TextField
                label="Points"
                variant="outlined"
                type="number"
                fullWidth
                name="points"
                value={currentQuestion.points}
                onChange={handleQuestionChange}
              />
            </Grid>

            <Grid item xs={12} style={{ display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<PhotoCamera />}
              >
                Add Image
                <input type="file" hidden onChange={handleImageChange} />
              </Button>

              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<AttachFile />}
              >
                Attach File
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Question"
                variant="outlined"
                fullWidth
                name="question"
                value={currentQuestion.question}
                onChange={handleQuestionChange}
                multiline
                rows={4}
              />
            </Grid>

            {currentQuestion.type !== "Free Text" && (
              <>
                {currentQuestion.options.map((option, index) => (
                  <Grid item xs={12} key={index}>
                    <TextField
                      label={`Option ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={currentQuestion.answers[index] || ""}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={
                                    currentQuestion.correctAnswers[index] ||
                                    false
                                  }
                                  onChange={(e) =>
                                    handleCorrectAnswerChange(
                                      index,
                                      e.target.checked
                                    )
                                  }
                                />
                              }
                              label="Correct"
                            />
                            <IconButton
                              onClick={() => handleDeleteAnswer(index)}
                              edge="end"
                            >
                              <Delete />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onClick={(e) => e.stopPropagation()} // Prevent blur when clicking on the option
                    />
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      startIcon={<PhotoCamera />}
                      style={{ marginTop: "10px" }}
                    >
                      Add Image to Option
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleAnswerImageChange(index, e)}
                      />
                    </Button>
                    {currentQuestion.answerImages[index] && (
                      <img
                        src={URL.createObjectURL(
                          currentQuestion.answerImages[index]
                        )}
                        alt={`Answer ${index + 1}`}
                        style={{
                          maxWidth: "100%",
                          marginTop: "10px",
                        }}
                      />
                    )}
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleAddOption}
                    fullWidth
                  >
                    Add Option
                  </Button>
                </Grid>
              </>
            )}

            {currentQuestion.type === "Free Text" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    name="freeTextAnswer"
                    value={currentQuestion.answers[0] || ""}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        answers: [e.target.value],
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12} style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    startIcon={<PhotoCamera />}
                  >
                    Add Image to Answer
                    <input
                      type="file"
                      hidden
                      onChange={handleFreeTextImageChange}
                    />
                  </Button>
                  {currentQuestion.freeTextImage && (
                    <img
                      src={URL.createObjectURL(currentQuestion.freeTextImage)}
                      alt="Free Text Answer"
                      style={{ maxWidth: "100%", marginTop: "10px" }}
                    />
                  )}
                </Grid>
              </>
            )}

            <Grid item xs={12} style={{ display: "flex", gap: "10px" }}>
              <Button
                onClick={handleSaveQuestion}
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
              <Button
                onClick={handleAddQuestion}
                variant="contained"
                color="primary"
              >
                Save and Add Another
              </Button>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>

      <div style={{ marginTop: "40px" }}>
        {questions
          .filter((q) => q.question)
          .map((question, index) => (
            <div key={index} style={questionStyle}>
              <Typography variant="h6">
                {index + 1}. {question.question}
              </Typography>
              {question.image && (
                <img
                  src={URL.createObjectURL(question.image)}
                  alt="question"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
              )}
              {question.file && <p>Attached File: {question.file.name}</p>}
              <ul>
                {question.answers.map((answer, i) => (
                  <li key={i}>
                    {answer}
                    {question.answerImages[i] && (
                      <img
                        src={URL.createObjectURL(question.answerImages[i])}
                        alt={`Answer ${i + 1}`}
                        style={{ maxWidth: "100px", marginLeft: "10px" }}
                      />
                    )}
                    {question.correctAnswers[i] && (
                      <span style={{ color: "green" }}> (Correct)</span>
                    )}
                    {!question.correctAnswers[i] &&
                      question.type === "Multiple Choice" && (
                        <span> - {question.points} Points</span>
                      )}
                  </li>
                ))}
                {question.freeTextImage && (
                  <img
                    src={URL.createObjectURL(question.freeTextImage)}
                    alt="Free Text Answer"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )}
              </ul>
              <button onClick={() => handleDeleteQuestion(index)} edge="end">
                Delete Question
              </button>
            </div>
          ))}
      </div>
      <div className="fixed  bottom-0 left-0 shadow-lg p-3 bg-white w-full">
        <div className="w-[90%]">
          <button
            type="submit"
            className="float-end  w-max   bg-blue-500 text-white py-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.obj.apiCallToCreateTest(e);
            }}
          >
            Save Test & Close
          </button>
        </div>
      </div>

      <button
        onClick={() => props.obj.setTabSelected("CATEGORIES")}
        className="fixed ml-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
      >
        <ArrowBackIosRoundedIcon />
      </button>
      <button
        onClick={() => props.obj.setTabSelected("LAYOUT")}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
      >
        <ArrowForwardIosRoundedIcon />
      </button>
    </>
  ) : (
    <></>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const questionStyle = {
  marginBottom: "20px",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

export default QuestionStep;
