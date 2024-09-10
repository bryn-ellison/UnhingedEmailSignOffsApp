import { useState, useEffect, useCallback } from 'react'
import { fetcherWithAxios } from './FetchWithAxios';
import Typewriter from './TypeEffect';
import GetNewSignOffButton from './GetNewSignOffButton';
import CopySignOffButton from './CopySignOffButton';

const SignOff = () => {
    const [signOffData, setSignOffData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [finishedTyping, setFinishedTyping] = useState(false);
    
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

    useEffect(() => {
      fetchSignOffData();
    }, []);
    
    const handleFinishedtyping = (bool) => {  
        setFinishedTyping(bool)  
    }  

    const handleReset = () => {  
        setFinishedTyping(false)
        setSignOffData(null)
        fetchSignOffData()
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
        <div className='signOff-container'>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {signOffData && (<Typewriter text={signOffData.signOff} speed={40} handleFinishedtyping={handleFinishedtyping}/>)}
            <DisplayAuthor />
            <CopySignOffButton text={signOffData?.signOff}/>
        </div>
        <GetNewSignOffButton handleFinishedtyping={handleReset}/>
    </>
    );
  };

export default SignOff;