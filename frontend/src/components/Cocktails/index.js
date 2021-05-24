import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCocktail} from '../../store/cocktails'

import styles from './Cocktails.module.css'

import { getCocktails } from '../../store/cocktails';


const CocktailsContainer = () => {

  const dispatch = useDispatch();
  const cocktails = useSelector((state)=> Object.values(state.cocktails));

  const handleDelete = async (e) => {
    e.preventDefault()

  
    await dispatch(deleteCocktail(e.target.id))

  }
  

  useEffect(()=>{
    dispatch(getCocktails());
  }, [dispatch])

return (
  <div className={styles.cocktailMain}>
   {cocktails && (
          <div>
            <h1>{cocktails.name} </h1>
            {cocktails.map((cocktail)=>(
            <div key={cocktail.id}>{cocktail.name}</div>  
            ))}
            <h2>Image</h2>
            {cocktails.map((cocktail)=>(
              <div>
               <img key={cocktail.id}
               style={{ width: "200px" }}
               src={cocktail.imageUrl}
               alt="profile"
             />
            <button onClick={handleDelete}>Delete</button>
             </div>
            ))}
          </div>
        )}
  </div>
)
}

export default CocktailsContainer