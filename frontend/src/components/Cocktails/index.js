import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCocktail} from '../../store/cocktails'

import styles from './Cocktails.module.css'

import { getCocktails } from '../../store/cocktails';


const CocktailsContainer = () => {

  const dispatch = useDispatch();
  const cocktails = useSelector((state)=> Object.values(state.cocktails));

  const handleDelete = (id) => {

   dispatch(deleteCocktail(id))

  }
  

  useEffect(()=>{
    dispatch(getCocktails());
  }, [dispatch])

return (
  <div className={styles.cocktailMain}>
   {cocktails && (
          <div className={styles.cocktailContainer}>
            {cocktails.map((cocktail)=>(
              <div className={styles.actualCocktail}>
                <div className={styles.cocktailName} key={cocktail.id}>{cocktail.name}</div> 
               <img key={cocktail.id}
               style={{ width: "200px" }}
               src={cocktail.imageUrl}
               alt="profile"
             />
            <button onClick={()=>handleDelete(cocktail.id)}>Delete</button>
             </div>
            ))}
          </div>
        )}
  </div>
)
}

export default CocktailsContainer