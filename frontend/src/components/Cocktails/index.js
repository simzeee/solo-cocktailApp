import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cocktailsReducer, { getCocktails } from '../../store/cocktails';
// import styles from './UsersContainer.module.css';
// import { fakeUsers } from '../../assets';
// import UserRow from '../UserRow';

const CocktailsContainer = () => {

  const dispatch = useDispatch();
  const cocktails = useSelector((state)=> Object.values(state.cocktails));
console.log(cocktails[0])
  useEffect(()=>{
    dispatch(getCocktails());
  }, [dispatch])

return (
  <div>
   {cocktails && (
          <div>
            <h1>{cocktails.name}</h1>
            {cocktails.map((cocktail)=>(
            <div key={cocktail.id}>{cocktail.name}</div>  
            ))}
            <h2>Image</h2>
            {cocktails.map((cocktail)=>(
               <img key={cocktail.id}
               style={{ width: "200px" }}
               src={cocktail.imageUrl}
               alt="profile"
             />
            ))}
          </div>
        )}
  </div>
)
}

export default CocktailsContainer