import styles from './CocktailDescription.module.css';

const CocktailDescription = ({ props }) => {

  const { cocktail} = props

  return ( 
      <div  className={styles.contentDescription}>
        <p>{cocktail.description}</p>
        </div>
  );
};

export default CocktailDescription;
