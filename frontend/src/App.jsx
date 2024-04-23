import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { DefaultComponent } from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { useQuery } from "react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/usersSlide";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let storageData = localStorage.getItem('access_token');

    if (storageData) {
      
      const decoded = jwtDecode(storageData);

      if (decoded?.sub) {
        handleGetDetailsUser(decoded?.sub, storageData);
      }
    }
  }, []);

  const handleGetDetailsUser = async (email, token) => {
    const res = await UserService.getUserProfile(email, token);
    dispatch(updateUser({...res, token}));
  };


  return (
    <div>
      
      <Router>
        <Routes>
          {
            routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;

              return (
                <Route key={route.path} path={route.path} element={
                  <>
                    <Layout>
                      <Page/>
                    </Layout>
                  </>
                } />
              )
            })
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;