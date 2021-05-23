const SET_COCKTAILS = 'cocktails/SET_COCKTAILS';
const ADD_COCKTAIL = 'cocktails/ADD_COCKTAIL';

const setCocktails = (cocktails) => ({
  type: SET_COCKTAILS,
  cocktails,
});

const addOneCocktail = (cocktail) => ({
  type: ADD_COCKTAIL,
  cocktail,
});

export const getCocktails = () => async (dispatch) => {
  const res = await fetch('/api/cocktails');

  const cocktails = await res.json();

  dispatch(setCocktails(cocktails));
};

export const createCocktail = (data) => async (dispatch) => {
  const response = await fetch('/api/cocktails', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  );
  if(response.ok){
    const newCocktail = await response.json();
    dispatch(addOneCocktail(newCocktail))
    return newCocktail
  }
};

const initialState = {};

const cocktailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COCKTAILS:
      const newState = { ...state };
      action.cocktails.forEach((cocktail) => {
        newState[cocktail.id] = cocktail;
      });
      return newState;
      case ADD_COCKTAIL:
        if (!state[action.cocktail.id]) {
          const newState = {
            ...state,
            [action.cocktail.id]: action.cocktail
          };
          const cocktailList = newState.cocktails.map(id => newState[id]);
          cocktailList.push(action.cocktail);
          newState.cocktails = cocktailList
          return newState
        }
        return {
          ...state,
          [action.cocktailList.id]: {
            ...state[action.pokemon.id],
            ...action.pokemon,
          }
        }
    default:
      return state;
  }
};

export default cocktailsReducer;
