import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Gallery from "./Component/Gallery";
import Slider from "./Component/Slider";
import Newsandnotice from "./Component/news&notice/newsandnotice";
import Flashnews from "./Component/flashnews/Flashnews";
import GeneralSetting from "./Component/GeneralSetting/GeneralSetting";
import Event from "./Component/Event";
import Download from "./Component/Download";
import Testimonials from "./Component/Testimonials";
import VideoMaster from "./Component/VideoMaster";
import HPBodyCard from "./Component/HPBodyCard";
import HPContentMaster from "./Component/HPContenMaster/HPContentMaster";
import TCIssued from "./Component/TCIssued/TCIssued";
import Contact from "./Component/Contact/Contact";
import TopHeader from "./Component/TopHeadder/TopHeader";
import Results from "./Component/Result/Results";
import Menumaster from "./Component/Menumaster/Menumaster";
import Login from "./Component/User/Login";
import Authentication from "./Component/Authentication/Authentication";
import Pricemaster from "./Component/PriceMaster/Pricemaster";
import Client from "./Component/Clientss/Client";
import PageViewMAster from "./Component/PageViewMAster/PageViewMAster";
import AcademicMaster from "./Component/AcademicMaster/AcademicMaster";
import CourseMaster from "./Component/CourseMaster/CourseMaster";
import Footer from "./Component/Footer/Footer";
import FontAwesome from "./Component/FontAwesome/FontAwesome";
import DashboardPage from "./Component/DashboardPage/DashboardPage";
import FrontEndPage from "./Component/FrontEndPages/FrontEndPage";
import DashboardCard from "./Component/DashboardCard/DashboardCard";
import HeaderTopMaster from "./Component/HeaderTopMaster/HeaderTopMaster";
import UserAuthentication from "./Component/UserAuthentication/UserAuthentication";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ProductMaster from "./Component/ProductMaster/ProductMaster";
import ProductCategoryMaster from "./Component/ProductCategoryMaster/ProductCategoryMaster";
import AdvertisementMaster from "./Component/AdvertisementMaster/AdvertisementMaster";
import CompanySignup from "./Component/CompanyCreate/CompanySignup";
import Dashboard from "./Component/Dashboard/Dashboard";
import UserCreate from "./Component/Usercreate/Usercreate";
import UserCreateForm from "./Component/UserCreateForm/UserCreateForm";
import { jwtDecode } from "jwt-decode";
import BlacklistedUser from "./Component/BlacklistedUser/BlacklistedUser";
import RouteAccessCheck from "./utill/RouteAccessCheck";
import JsonObject from "./Component/JsonObject/JsonObject";
import Employee from "./Component/EmployeeDownload/Employee";
import Careermain from "./Component/Career/Careermain";
import Career from "./Component/Career/Career";
import CurrentOp from "./Component/CurrentOp/CurrentOp";
import Walkon from "./Component/Walkon/Walkon";


function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebartogle, setsidebartogle] = useState(false)
  const [cookie, setCookie, removeCookie] = useCookies(['token'])
  const [AllowField, setallowfield] = useState([])
  const [tokendata, settokendata] = useState(null)

  return (
    // <div className="App">

    <>
      {cookie.token && <TopHeader sidebartogle={sidebartogle} setsidebartogle={setsidebartogle} />}
      <div className={`w-full h-[50px]  `}></div>

      <Routes>
        {/* <Route path="/" element={<Authentication><Gallery /></Authentication>} /> */}
        <Route path="/login" element={<Login />} />

        <Route path="/gallery" element={
          <Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle} >
            <RouteAccessCheck>
              <Gallery />
            </RouteAccessCheck></Authentication>
        } />

        <Route path="/pricemaster" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Pricemaster />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/slider" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Slider />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/newsnotice" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Newsandnotice />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/flashnews" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Flashnews />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/GeneralSetting" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <GeneralSetting />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/Event" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}><RouteAccessCheck>
          <Event />
        </RouteAccessCheck>
        </Authentication>} />

        <Route path="/Download" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Download />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/testimonials" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Testimonials />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}><Dashboard /></Authentication>} />

        <Route path="/videoMaster" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <VideoMaster />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/homepageBodycard" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}><RouteAccessCheck>
          <HPBodyCard />
        </RouteAccessCheck>
        </Authentication>} />

        <Route path="/homepage/contentmaster" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <HPContentMaster />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/jsonobject" element={
          <Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
            <RouteAccessCheck>
              <JsonObject />
            </RouteAccessCheck>
          </Authentication>
        } />


        <Route path="/tcissued" element={
          <Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
            <RouteAccessCheck>
              <TCIssued />
            </RouteAccessCheck>
          </Authentication>} />

        <Route path="/currentop" element={
          <Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
            <RouteAccessCheck>
              <CurrentOp />
            </RouteAccessCheck>
          </Authentication>} />

        <Route path="/walkon" element={
          <Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
            <RouteAccessCheck>
              <Walkon />
            </RouteAccessCheck>
          </Authentication>
        } />

        <Route path="/contact" element={
          <Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
            <RouteAccessCheck>
              <Contact />
            </RouteAccessCheck>
          </Authentication>} />

        <Route path="/employee" element={
          <Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
            <RouteAccessCheck>
              <Employee />
            </RouteAccessCheck>
          </Authentication>} />

        <Route path="/career" element={
          <Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
            <RouteAccessCheck>
              <Career />
            </RouteAccessCheck>
          </Authentication>} />

        <Route path="/results" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Results />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/menumaster" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Menumaster />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/client" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Client />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/pageviewmaster" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <PageViewMAster />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/academicmaster" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <AcademicMaster />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/coursemaster" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <CourseMaster />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/footer" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Footer />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/fontawesome" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <FontAwesome />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/creteCompany" element={<CompanySignup />} />

        <Route path="/" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Dashboard />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/frontendpage" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <FrontEndPage />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/dashboardcard" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <DashboardCard />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/headertop" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <HeaderTopMaster />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/auth" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <UserAuthentication />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/flash-news" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <Flashnews />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/productMaster" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <ProductMaster />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/product-category-master" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <ProductCategoryMaster />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/advertismentmaster" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <AdvertisementMaster />
          </RouteAccessCheck>
        </Authentication>} />
        {/* <Route path="/usercreate" element={<UserCreate />} /> */}
        <Route path="UserCreate" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <UserCreateForm />
          </RouteAccessCheck>
        </Authentication>} />

        <Route path="/blacklisted" element={<Authentication sidebartogle={sidebartogle} setsidebartogle={setsidebartogle}>
          <RouteAccessCheck>
            <BlacklistedUser />
          </RouteAccessCheck>
        </Authentication>} />
      </Routes>

    </>

    // </div>
  );
}

export default App;
