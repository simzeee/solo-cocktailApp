import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Cocktails.module.css'
import { deleteCocktail} from '../../store/cocktails'


const CocktailCard = ({cocktail}) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {

    dispatch(deleteCocktail(id))
    
   }


  return (
  <div className={styles.actualCocktail}>
  <div className={styles.cocktailName} >{cocktail.name}</div> 
 <img
 style={{ width: "200px" }}
 src={cocktail.imageUrl}
 alt="profile"
/>
<button onClick={()=>handleDelete(cocktail.id)}>Delete</button>
<NavLink to={`/edit/${cocktail.id}`}><button>Edit</button></NavLink>
</div>
  )

}

export default CocktailCard