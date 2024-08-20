import { Navigate, useRoutes } from 'react-router-dom';
import HomePage from './pages/homepage';
import MainQuestionaire from './pages/questionaire/main';
import AddNewListing from './pages/listings/addNewLisitng';
import AddUserInList from './pages/listings/addUserInListing';
import Dashboard from './pages/dashboard/dashboard';
import MultiStepForm from './pages/questionaire/multistepForm/newQuestionaire';
import ResultPage from './pages/resultpage.js/resultpage';
import Login from './pages/LoginPages/login';
import SignUp from './pages/LoginPages/signUp';
import MSFDemo from './pages/questionaire/multistepForm/multistepform';
import FormHandler from './pages/questionaire/multistepForm/newformhandler';
import FillTest from './pages/tester/filltest';
import Temp from './pages/questionaire/temp';
import CreateTest from './pages/Testee/MyTest/createTest';
import MailingPageIndex from './pages/mailingList/mailingListPage';
import SendTestFunctionality from './pages/questionaire/sendTestFunctionality';
import MailingPageUI from './pages/mailingList/components/mailingList';
import LandingPages from './pages/mailingList/components/mailingList';
import LandingPage from './pages/LandingPage/landingpage';
import EditLandingPage from './pages/mailingList/editLandingPage';
import EditTest from './pages/Testee/MyTest/editTest';
import AdminLogin from './pages/admin/adminLogin';
import AdminDashboard from './pages/admin/admindashboard';
import Users from './pages/admin/users';
import Tests from './pages/admin/tests';
import AdminEditTest from './pages/admin/editTest';
import Results from './pages/admin/results';
import Verify from './pages/LoginPages/verify';
import LandingPageForm from './pages/LandingPage/landingpageform';
import LandingPageData from './pages/LandingPage/landingpagedata';
import RPage from './pages/resultpage.js/rpage';
import ForgotPassword from './pages/LoginPages/ForgotPassword';
import Resetpassword from './pages/LoginPages/Resetpassword';
import PricingPlace from './pages/LandingPage/PricingPlace';
import Packages from './pages/admin/packages';
import SuccessPage from './pages/payment/sucess';
import UpdateUser from './pages/user/updateUser';
import ChangePassword from './pages/user/changePassword';
import Preview from './pages/Testee/MyTest/components/AllSteps/Preview';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'mytest', element: <MainQuestionaire /> },
        { path: 'questionaire-history', element: <MainQuestionaire /> },
        { path: 'landing-pages', element: <LandingPageData /> },
        { path: 'PricingPlace', element: <PricingPlace /> },
        { path: 'my-landing-pages', element: <MainQuestionaire /> },
        { path: 'my-mailing-list', element: <MainQuestionaire /> },
        { path: 'update', element: <UpdateUser /> },
        { path: 'change-password', element: <ChangePassword /> }
      ],
    },
    {
      path: '/',  
      element: <HomePage />,
    },
    {
      path: '/questionare',
      element: <MainQuestionaire />,
    },
    {
      path: '/newlisting',
      element: <AddNewListing />,
    },
    {
      path: '/PricingPlace',
      element: <PricingPlace />,
    },
    {
      path: '/dashboard/paymentsucess',
      element: <SuccessPage />
    },
    {
      path: '/addusersinlisting',
      element: <AddUserInList />,
    },
    {
      path:`/preview/:id`,
      element:<Preview/>,
    },

    {
      path: '/newquestion',
      element: <MultiStepForm />,
    },
    {
      path: '/resultpage/*',
      element: <ResultPage />,
    },
    {
      path: '/login/:email?',
      element: <Login />,
    },

    {
      path: '/admin/login/:email?',
      element: <AdminLogin />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/msf',
      element: <MSFDemo />,
    },
    {
      path: '/formhandler',
      element: <FormHandler />,
    },
    {
      path: '/filltest/*',
      element: <FillTest />,
    },
    {
      path: '/landingpage/:id?',
      element: <LandingPage />
    },
    {
      path: '/landingpageform/:id?',
      element: <LandingPageForm />,
    },
    {
      path: '/temp/*',
      element: <Temp />,
    },
    {
      path: '/admin/dashboard',
      element: <AdminDashboard />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'users', element: <Users /> },
        { path: 'tests', element: <Tests /> },
        { path: 'tests/:id?', element: <AdminEditTest /> },
        { path: 'results', element: <Results /> },
        { path: 'packages', element: <Packages /> },

        // { path: 'questionaire-history', element: <MainQuestionaire /> },
        // { path: 'landing-pages', element: <LandingPages /> },
        // { path: 'my-landing-pages', element: <MainQuestionaire /> },
        // { path: 'my-mailing-list', element: <MainQuestionaire /> },
      ],
    },
    {
      path: '/dashboard/mytest/createtest',
      element: <CreateTest />
    },
    {
      path: '/dashboard/mytest/edittest/:id?',
      element: <EditTest />
    },

    {
      path: '/dashboard/landingPage',
      element: <MailingPageIndex />
    },
    {
      path: '/dashboard/editLandingPage/:id?',
      element: <EditLandingPage />
    },
    {
      path: '/verify/:token?',
      element: <Verify />
    },
    {
      path: '/respage/*',
      element: <RPage />,
    },
    {
      path: '/ForgotPassword',
      element: <ForgotPassword />,
    },
    {
      path: '/Resetpassword',
      element: <Resetpassword />,
    },
  ]);
  return routes;
}