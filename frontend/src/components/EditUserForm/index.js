import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { editUser } from "../../store/session";
import { deleteUser } from "../../store/session"

// import './SignupForm.css';


function EditUserForm() {
  const {userId} = useParams()
  const dispatch = useDispatch();
  const history = useHistory()

  const user = useSelector((state) => state.session.user);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [profileImageUrl, setImage] = useState('');
  // for multiple file upload
  //   const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);


  // const updateUsername = (e) => setUsername(e.target.value)
  // const updateEmail = (e) => setEmail(e.target.value)
  // const updatePassword = (e) => setPassword(e.target.value)
  // const updateImage = (e) => setPassword(e.target.value)
  const logout = (e) => {
    dispatch(sessionActions.logout());
  };


const handleDelete = (id) =>{

  dispatch(deleteUser(id))
  logout()

  history.push('/cocktails');


}

  const handleSubmit = (e) => {
    e.preventDefault();
 

    const payload = {
      userId,
      username,
      email,
      password,
      file: profileImageUrl
    }
    // const file = e.target.files[0];
    // if (file) setImage(file);

    let editedUser = dispatch(editUser(payload));

    if (editedUser){
      history.push(`/cocktails`)
    }

  };



  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  // for multiple file upload
  //   const updateFiles = (e) => {
  //     const files = e.target.files;
  //     setImages(files);
  //   };

  return (
    <div>
      <h1>AWS S3 Express-React Demo</h1>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
      <form
        style={{ display: "flex", flexFlow: "column" }}
        onSubmit={handleSubmit}
      >
        <label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <input type="file" onChange={updateFile} />
        </label>
        {/* <label>
            Multiple Upload
            <input 
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
        <button type="submit">Make Changes</button>
      </form>
      <div>
        {user && (
          <div>
            <h1>{user.username}</h1>
            <img
              style={{ width: "150px" }}
              src={user.profileImageUrl}
              alt="profile"
            />
          </div>
        )}
      </div>
        <button onClick={()=>handleDelete(user.id)}>Delete</button>
    </div>
  );
};

export default EditUserForm;