import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {alertActions} from "../../store/alert";
import AlertMessage from "../UI/AlertMessage";
import Header from "./Header";

const RootLayout = () => {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => dispatch(alertActions.hideAlert()), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.show, dispatch]);

  return (
    <Fragment>
      <Header/>
      {alert.show && <AlertMessage variant={alert.variant} message={alert.message} title={alert.title}/>}
      <main>
        <Outlet/>
      </main>
    </Fragment>
  );
}

export default RootLayout;
