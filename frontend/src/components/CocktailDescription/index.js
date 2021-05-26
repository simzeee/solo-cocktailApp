import styles from './CocktailDescription.module.css';

const CocktailDescription = ({ cocktail }) => {
  return (
    <div className={styles.description}>
      <div className={styles.contentDescription}>
        <p>{cocktail.description}</p>
        </div>
    </div>
  );
};

export default CocktailDescription;
