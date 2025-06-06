import { useParams, useNavigate } from 'react-router-dom';

const withRouter = (Component) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  };
};

export default withRouter;
