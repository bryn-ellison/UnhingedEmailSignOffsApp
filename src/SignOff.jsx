import { useState, useEffect } from 'react'
import { fetcherWithAxios } from './FetchWithAxios';

const SignOff = () => {

    const [signOffData, setSignOffData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
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
  
    return (
    <>
        <div>
            {loading && (<div>Loading...</div>)}
            {error && <div>{error}</div>}
            <div>
                <h2>{signOffData?.signOff}</h2>
                <p>{signOffData?.author}</p>
            </div>
        </div>
    </>
    );
  };

export default SignOff;