import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Cocktails.module.css';
import { deleteCocktail } from '../../store/cocktails';
import CocktailDescription from '../CocktailDescription';
import { useEffect, useRef, useState } from 'react'

const CocktailCard = ({ cocktail }) => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false)

  const parent = useRef()
  const child = useRef()

  const handleDelete = (id) => {
    dispatch(deleteCocktail(id));
  };

  useEffect(()=>{

    if(parent.current && child.current){
      parent.current.onmouseover = () =>{
        child.current.style.height = '200px'
      }
      parent.current.onmouseleave = () =>{
       child.current.style.height = "0px"
      }
    }

    
  }, [parent])

  return (
    <div className={styles.fullCocktail}>
      <div className={styles.cocktailContainerLeft}>
      <div ref={parent} className={styles.actualCocktail}>
        <div className={styles.cocktailName}>{cocktail.name}</div>
        <img src={cocktail.imageUrl} alt="profile" />
        <button onClick={() => handleDelete(cocktail.id)}>Delete</button>
        <NavLink to={`/edit/${cocktail.id}`}>
          <button>Edit</button>
        </NavLink>
      </div>
      </div>
      <div ref={child} className={styles.cocktailDescription}>
        <CocktailDescription props={{cocktail}} key={cocktail.id} />
      </div>
    </div>
  );
};

export default CocktailCard;
