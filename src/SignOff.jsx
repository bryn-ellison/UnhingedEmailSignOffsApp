import { useState, useEffect, useCallback } from 'react'
import { fetcherWithAxios } from './FetchWithAxios';
import Typewriter from './TypeEffect';
import GetNewSignOffButton from './GetNewSignOffButton';
import CopySignOffButton from './CopySignOffButton';
import CreateSignOffButton from './assets/CreateSignOffButton';

const SignOff = () => {
    const [signOffData, setSignOffData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [finishedTyping, setFinishedTyping] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    
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

    const copyToClipBoard = async (signOffData) => {
      try {
        await navigator.clipboard.writeText(signOffData.signOff);
        setCopySuccess('Copied!');
      } catch (err) {
        setCopySuccess('Failed to copy!');
      }
    };

    const handleReset = () => {  
        setFinishedTyping(false)
        setSignOffData(null)
        setCopySuccess("")
        fetchSignOffData()
    }  

    const DisplayAuthor = () => {      
        if (finishedTyping === false) { 
            return;
        } else if (copySuccess !== "") {
            return <p>{signOffData.author}</p>;
        } else {
            return <Typewriter text= {signOffData.author} speed={40} handleFinishedtyping={handleFinishedtyping}/>;
        }
    };

    return (
    <>
        <div className='signOff-container'>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {signOffData && (<Typewriter text={signOffData.signOff} speed={40} handleFinishedtyping={handleFinishedtyping}/>)}
            <DisplayAuthor />
            <p className='copy-message'>{copySuccess}</p>
            <CopySignOffButton copyToClipBoard={copyToClipBoard} text={signOffData?.signOff}/>
            
        </div>
        <div className='buttons-container'>
          <GetNewSignOffButton handleFinishedtyping={handleReset}/>
          <CreateSignOffButton />
        </div>
    </>
    );
  };

export default SignOff;