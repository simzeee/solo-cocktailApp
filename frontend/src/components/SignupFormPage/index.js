import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as sessionActions from '../../store/session';
import { createUser } from '../../store/session';
import { useHistory } from 'react-router-dom';

import styles from './SignupForm.module.css';

function SignupFormPage() {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  // for multuple file upload
  //   const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    dispatch(createUser({ username, email, password, image }))
      .then(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setImage(null);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          newErrors = data.errors;
          setErrors(newErrors);
        }
        else{history.push('/cocktails')}
      });
      
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
    <div className={styles.wrapper}>
      <div className={styles.formContainer}>
        <div>
          {errors.length > 0 &&
            errors.map((error) => <div key={error}>{error}</div>)}
          <form
            style={{ display: 'flex', flexFlow: 'column' }}
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
            <div>
              <label>
                <input type="file" onChange={updateFile} />
              </label>
            </div>
            {/* <label>
            Multiple Upload
            <input 
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
            <button className={styles.changesButton} type="submit">
              Create User
            </button>
          </form>
          <div>
            {user && (
              <div>
                <h1>{user.username}</h1>
                <img
                  style={{ width: '150px' }}
                  src={user.profileImageUrl}
                  alt="profile"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
