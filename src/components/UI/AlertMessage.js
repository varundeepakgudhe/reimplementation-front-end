import Alert from "react-bootstrap/Alert";
import {useDispatch} from "react-redux";
import {alertActions} from "../../store/alert";

const AlertMessage = (props) => {
  const dispatch = useDispatch();
  const hideAlertHandler = () => dispatch(alertActions.hideAlert());

  return (
    <Alert variant={props.variant} onClose={hideAlertHandler} dismissible>
      {props.title && <Alert.Heading>{props.title}</Alert.Heading>}
      <p>{props.message}</p>
    </Alert>
  );

}

export default AlertMessage;