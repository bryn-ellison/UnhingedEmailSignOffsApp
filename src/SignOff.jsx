import { useState, useEffect } from 'react'
import { fetcherWithAxios } from './FetchWithAxios';
import Typewriter from './TypeEffect';


const SignOff = () => {

    const [signOffData, setSignOffData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [finishedTyping, setFinishedTyping] = useState(false);
  
    useEffect(() => {
      const fetchSignOffData = async () => {
        try {
          const [ response ] = await fetcherWithAxios(
            `https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs`
          );
          setSignOffData(response);
          setError(null);
        } catch (err) {
          setError(err.message);
          setSignOffData(null);
        } finally {
          setLoading(false);
        }
      };
      fetchSignOffData();
    }, []);
    
    const handleFinishedtyping = (bool) => {  
        setFinishedTyping(bool)  
    }  

    const DisplayAuthor = () => {      
        if (finishedTyping === false) {
            return
        } else {
            return <Typewriter text= {signOffData.author} speed={40} handleFinishedtyping={handleFinishedtyping}/>
        }
    };

    return (
    <>
        <div>
            {loading && (<div>Loading...</div>)}
            {error && (<div>{error}</div>)}
            {signOffData && (<Typewriter text={signOffData.signOff} speed={40} handleFinishedtyping={handleFinishedtyping}/>)}
            <DisplayAuthor />
        </div>
    </>
    );
  };

export default SignOff;