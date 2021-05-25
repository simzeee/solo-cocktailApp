import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCocktail } from '../../store/cocktails';
import { NavLink } from 'react-router-dom';
import CocktailCard from './CocktailCard';
import CocktailDescription from '../CocktailDescription/index';

import styles from './Cocktails.module.css';

import { getCocktails } from '../../store/cocktails';

const CocktailsContainer = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => Object.values(state.cocktails));

  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);

  return (
    <>
      <div className={styles.cocktailMain}>
        {cocktails && (
          <div className={styles.cocktailContainer}>
            {cocktails.map((cocktail) => (
              <CocktailCard cocktail={cocktail} key={cocktail.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CocktailsContainer;
