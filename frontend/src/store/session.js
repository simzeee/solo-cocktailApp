import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const DELETE_USER = 'session/deleteUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const deleteOneUser = (userId) => ({
  type: DELETE_USER,
  userId,
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const createUser = (user) => async (dispatch) => {
  const { images, image, username, email, password } = user;
  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);

  // for multiple files
  if (images && images.length !== 0) {
    for (var i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
  }

  // for single file
  if (image) formData.append('image', image);

  const res = await csrfFetch(`/api/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(setUser(data.user));
};

export const editUser = (user) => async (dispatch) => {
  const { username, email, password, userId, file } = user;
  if (file) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', file);
    formData.append('userId', userId);

    const response = await csrfFetch(`/api/users/withImage/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (response.ok) {
      const editedUser = await response.json();
      dispatch(setUser(editedUser));
      return editedUser;
    }
  }
  else {
    const response = await csrfFetch(`/api/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(user)
    });
    if (response.ok) {
      const editedUser = await response.json();
      dispatch(setUser(editedUser));
      return editedUser;
    }
  }
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

export const deleteUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(deleteOneUser(user));
  }
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // case SET_USER:
    //   newState = Object.assign({}, state);
    //   newState.user = action.payload;
    //   return newState;
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
