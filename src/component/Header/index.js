import Button from '../Shared/Button';
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { LoginpopHandle } from 'store/authSlice';
import './header.css';

const Header = () => {
  const Navigate=useNavigate();
  const dispatch=useDispatch();
  const {isLoggedin,loginOpen} = useSelector((state) => state.auth);
  const startHandle = () => {
    if(isLoggedin)
      Navigate('/dashboard');
    else
    dispatch(LoginpopHandle());
  }
  return (
    <>
      <div className="header">
        <div className="header-text">
          <div className="header-desc">
            <p>
              Avoid Distraction And Become More
              Focused And Consistent
            </p>
            <p>
              Optimize your workflow and personal growth effortlessly
              with seamless task management,
              personalized insights, and advanced personality
              evaluations.
            </p>
            <Button type="text" className="header-btn" onClick={startHandle} children="start"
              backgroundColor="rgb(126, 28, 254)" width="150px" height="40px" />
          </div>
        </div>
        <div className="header-video">
          <video  url='https://www.youtube.com/watch?v=gKYt2wJUmiQ&ab_channel=BeProductive' controls />
        </div>
      </div>
    </>
  )
}

export default Header;