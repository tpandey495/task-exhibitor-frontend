import React,{useState} from 'react';
import './profile.css';
import Profiledata from "config/profile";
import API from "utils/api";

const Profile = () => {
  const [file, setFile] = useState(null);
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }
    const formData = new FormData();
    formData.append('profilePicture', file);
    try {
      await API.updateUserProfile(formData,(flag,res)=>console.log(res))
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  }

  return (
    <div className="profile-section">
     <div className="quiz-title">Update Your Profile Picture</div>
     <form on onSubmit={handleSubmit} className="profile-pic">
        <input className="profile-picture" onChange={handleFileChange} type="file" name="profile pic"/>
        <button type="submit">Save</button>
     </form>
     <div className="profile-title">Update Your Profile </div>
   <div className="profile-field-parent">
    {
    Profiledata&& Profiledata.map((item,index)=>{
      return <div className="profile-field" key={item?.id}>
        <div className="profile-name">{item?.name}</div>
          <div className="profile-input">
          <form>
            <input type={item?.type} name={item?.name}  placeholder="enter your details"/>
          </form>
          </div>
      </div>
      })
    }  
    </div>
    <button id="submit-button" className="profile-submit">Submit</button>
  </div>
  )
}
export default Profile;