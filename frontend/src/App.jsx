import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { DefaultComponent } from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { useQuery } from "react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/usersSlide";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import { ConfigProvider } from "antd";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    let storageData = localStorage.getItem("access_token");

    if (storageData) {
      let decoded = jwtDecode(storageData);

      if (decoded?.sub) {
        handleGetDetailsUser(decoded?.sub, storageData);
      }
    }

    setIsLoading(false);
  }, []);

  const handleGetDetailsUser = async (email, token) => {
    const res = await UserService.getUserProfile(email, token);
    dispatch(updateUser({ ...res, token }));
  };

  return (
    <ConfigProvider theme={{
      token: {
        fontFamily: '"Inter", sans-serif'
      }
    }}>
      <div>
        <LoadingComponent isLoading={isLoading}>
          <Router>
            <Routes>
              {routes.map((route) => {
                const Page = route.page;
                const isCheckAuth =
                  !route.isPrivate ||
                  user.roles.some((role) => role.name === "ROLE_ADMIN");

                const Layout = route.isShowHeader ? DefaultComponent : Fragment;

                return (
                  <Route
                    key={route.path}
                    path={isCheckAuth ? route.path : "/invalid/route/here"}
                    element={
                      <>
                        <Layout>
                          <Page />
                        </Layout>
                      </>
                    }
                  />
                );
              })}
            </Routes>
          </Router>
        </LoadingComponent>
      </div>
    </ConfigProvider>
  );
}

export default App;
