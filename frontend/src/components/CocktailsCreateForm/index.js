import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCocktails } from '../../store/cocktails';
import { useHistory } from 'react-router-dom';
import { createCocktail } from '../../store/cocktails';



const CreateCocktailForm = () => {
  // const cocktailtypes = useSelector(state => state.cocktails.cocktails)
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [classic, setClassic] = useState(true);
  // const [cocktailRedirect, setCocktailRedirect] = useState(false)
  
  


  const sessionUser = useSelector((state) => state.session.user);

  const userId = sessionUser.id;

  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  // const updateClassic = (e) => setClassic(e.target.value)

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      
      name,
      description,
      imageUrl,
      classic,
      userId,
    };
    
    let createdCocktail = await dispatch(createCocktail(payload));
    
    if (createdCocktail) {
    
      history.push(`/cocktails/${createdCocktail.cocktail.id}`);
    
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" value={name} onChange={updateName} />
      </label>
      <label>
        Description
        <input type="text" value={description} onChange={updateDescription} />
      </label>
      <label>
        Image
        <input type="text" value={imageUrl} onChange={updateImageUrl} />
      </label>
      <label>
        Classic:
        <input
          type="radio"
          value="yes"
          name="classic"
          checked={classic === 'yes'}
          onChange={(e) => setClassic('yes')}
        />
      </label>
      <label>
        Specialty:
        <input
          type="radio"
          value="no"
          name="specialty"
          checked={classic === 'no'}
          onChange={(e) => setClassic('no')}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateCocktailForm;
