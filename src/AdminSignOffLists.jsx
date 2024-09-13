// const AdminSignOffLists = () => {
//   const { getAccessToken } = useAuth0();
//   const [signOffData, setSignOffData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchSignOffData = async () => {
//     const accessToken = await getAccessToken(endPoint);
//     try {
//       const [response] = await fetcherWithAxios(
//         `https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs${endPoint}`
//       );
//       setSignOffData(response);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       setSignOffData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return <></>;
// };

// export default AdminSignOffLists;
