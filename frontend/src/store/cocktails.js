import {csrfFetch} from './csrf'

const SET_COCKTAILS = 'cocktails/SET_COCKTAILS';
const ADD_COCKTAIL = 'cocktails/ADD_COCKTAIL';
const DELETE_COCKTAIL = 'cocktails/DElETE_COCKTAIL'
const EDIT_COCKTAIL = 'cocktails/EDIT_COCKTAIL'

const setCocktails = (cocktails) => ({
  type: SET_COCKTAILS,
  cocktails,
});

const addOneCocktail = (cocktail) => ({
  type: ADD_COCKTAIL,
  cocktail,
});

const deleteOneCocktail = (cocktailId) => ({
  type: DELETE_COCKTAIL,
  cocktailId
})

const editOneCocktail = (cocktailId) => ({
  type: EDIT_COCKTAIL,
  cocktailId
})

export const getCocktails = () => async (dispatch) => {
  const res = await fetch('/api/cocktails');

  const cocktails = await res.json();

  dispatch(setCocktails(cocktails));
};

// export const createLand =  (land) => async (dispatch) => {
//   const {name, description, userId} = land;
//   const response = await csrfFetch("/api/lands", {
//     method: "POST",
//     body: JSON.stringify({
//       name,
//       description,
//       userId,
//     }),
//   });
//   const data = await response.json();
// }


export const createCocktail = (cocktail) => async (dispatch) => {
  const {name, description, imageUrl, classic, userId} = cocktail
  const response = await csrfFetch('/api/cocktails', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      imageUrl,
      classic,
      userId
    })
  }
  );
  if(response.ok){
    const newCocktail = await response.json();
    dispatch(addOneCocktail(newCocktail))
    return newCocktail
  }
};

export const editCocktail = (cocktail) => async (dispatch) => {
  const {name, description, imageUrl, classic, userId} = cocktail

  const response = await csrfFetch(`/api/cocktails/${cocktail.id}`, //not sure about this
  {
    method: 'PATCH',
    body: JSON.stringify({
      name,
      description,
      imageUrl,
      classic,
      userId
    })
  }
);

if(response.ok){
  const editedCocktail = await response.json();
  dispatch(editOneCocktail(editedCocktail))
  return editedCocktail
}
}

export const deleteCocktail = (cocktailId) => async (dispatch) => {
  console.log('cocktailId', cocktailId)
  const response = await csrfFetch(`/api/cocktails/${cocktailId}`,
  {
    method: 'DELETE',
    })

if (response.ok){
  const cocktail = await response.json();
  console.log("This is the cocktail:", cocktail)
  dispatch(deleteOneCocktail(cocktail))
}

}

const initialState = {};

const cocktailsReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case SET_COCKTAILS:
      newState = { ...state };
      action.cocktails.forEach((cocktail) => {
        newState[cocktail.id] = cocktail;
      });
      return newState;
      case ADD_COCKTAIL:
        newState = {...state}
         const cocktail = action.cocktail
            newState[cocktail.cocktail.id] = cocktail
            return newState
        case DELETE_COCKTAIL: {
        newState = {...state};
          delete newState[action.cocktailId];
          return newState
        }
        case EDIT_COCKTAIL: {
          newState = {...state};
          const editedCocktail = action.cocktailId
            newState[editedCocktail.id] = editedCocktail
            return newState
        }
    default:
      return state;
  }
};

export default cocktailsReducer;
