const SET_COCKTAILS = 'cocktails/SET_COCKTAILS'

const setCocktails = (cocktails) => ({
  type: SET_COCKTAILS,
  cocktails,
})

export const getCocktails = () => async (dispatch) => {
  const res = await fetch('/api/cocktails');

  const cocktails = await res.json();

  dispatch(setCocktails(cocktails))
}

const initialState = {}

const cocktailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COCKTAILS:
      const newState = {...state};
      action.cocktails.forEach((cocktail)=>{
        newState[cocktail.id] = cocktail
      });
      return newState;
      default:
        return state;
  }
}

export default cocktailsReducer