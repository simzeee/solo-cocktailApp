import styles from './CocktailDescription.module.css'



const CocktailDescription = ({cocktail}) => {

  return(
    <div className={styles.description}>{cocktail.description}</div>
  )

}

export default CocktailDescription