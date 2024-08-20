export const environment = "C://Users/user/Downloads/";
// export const paymentRoute="https://icredit.rivhit.co.il/API/PaymentPageRequest.svc/GetUrl";

export const local = "https://testfactory.online/";
export const serverUrl = "https://testfactory.online/";
export const serverImageUrl = "https://testfactory.online";

// export const frontEndPath = "https://youtest-git-main-zuhads-projects.vercel.app/"
export const frontEndPath = "http://localhost:3000/";
// export const local = "http://localhost:4000/";
// export const serverUrl = "http://localhost:4000/";
// export const serverImageUrl = "http://localhost:4000";
export const signup = local + "api/user/signUp";
export const forgotpass = local + "api/user/forgotpassword";
export const resetpass = local + "api/user/resetpassword";
export const verifyEmail = local + "api/user/verifyemail";
export const login = local + "api/user/login";
export const userTestDetails = local + "api/userTest/getUserTestDetails";
export const startUserTest = local + "api/userTest/startTest";
export const saveUserTest = local + "api/userTest/saveUserTest";
export const endUserTest = local + "api/userTest/endUserTest";
export const getResult = local + "api/userTest/getResult";
export const updateLandingPageInResult =
  local + "api/userTest/submitLandingPageDetails";
export const paymentRoute = local + "api/payment-handler";
export const userPackage = local + "api/user/getPackage";
export const myInfo = local + "api/user/myprofile";

// test apis
export const getMyTest = local + "api/test/getMyTest";
export const createMyTest = local + "api/test/createTest";
export const duplicateTest = local + "api/test/duplicateTest";
export const transferTests = local + "api/test/transferTest";
export const copyTest = local + "api/test/copyTest";
export const getMySingleTest = local + "api/test/getSingleTest";
export const deletemyTest = local + "api/test/deleteTest";
export const getAllPreviousQuestions =
  local + "api/test/getAllPreviousQuestions";

export const getPackage = local + "api/admin/getPackage";
export const createPackage = local + "api/admin/createPackage";
export const updatePackage = local + "api/admin/updatePackage";
export const deletePackage = local + "api/admin/deletePackage";

//file upload

export const logoUploader = local + "api/test/uploadFIle";

//mailing list

export const getMailingList = local + "api/mailingList/getMailingList";
export const addMailingList = local + "api/mailingList/addMailingList";
export const addMailingListUser =
  local + "api/mailingListUser/addMailingListUser";
export const updateMailingList = local + "api/mailingList/updateMailingList";
export const deleteMailingList = local + "api/mailingList/deleteMailingList";
export const getMailingListUser =
  local + "api/mailingListUser/getMailingListUser";
export const deleteUserInMailingListApi =
  local + "api/mailingListUser/deleteMailingListUser";
export const editUserOfMailingList =
  local + "api/mailingListUser/updateMailingListUser";

//landing pages
export const addLandingPage = local + "api/landingPage/addLandingPage";
export const sendUserInfo = local + "api/landingPage/UserInfo";
export const getLandingPage = local + "api/landingPage/getLandingPage";
export const getSingleLandingPage =
  local + "api/landingPage/getSingleLandingPage";
export const deleteLandingPage = local + "api/landingPage/deleteLandingPage";
export const updateLandingPage = local + "api/landingPage/updateLandingPage";
export const linkTest = local + "api/landingPage/updateLandingPage";
export const viewAttachedTests = local + "api/landingPage/getAttachedTest";
export const pathToViewTest = frontEndPath + "filltest";
//send mailign list

export const sendMailingList = local + "api/userTest/initiateTestForUser";

//send test history

export const getQuestionaireHistoryList =
  local + "api/userTest/getUserTestHistory";

//admin login
export const adminlogin = local + "api/admin/login";
export const getUsers = local + "api/admin/getUsers";
export const getUser = local + "api/admin/getUser";
export const getTests = local + "api/admin/getTests";
export const updateUser = local + "api/admin/updateUser";
export const updateTest = local + "api/admin/updateTest";
export const deleteUser = local + "api/admin/deleteUser";
export const deleteTest = local + "api/admin/deleteTest";
export const getResults = local + "api/admin/getResults";

//send info to user
