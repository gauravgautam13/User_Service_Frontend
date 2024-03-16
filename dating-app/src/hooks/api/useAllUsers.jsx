import axios from 'axios'

const useAllUsers = () => {

    const getAllUsers = async () => {
      const apiToken = localStorage.getItem('apiToken');
        try {
            const response = await axios.get("http://localhost:8080/api/v1/user/users",{
                headers: {
                  Authorization: `Bearer ${apiToken}`
                }
              });
            console.log(response);
            return response?.data;

        } catch (error) {
            console.log(error);
        }
    }
  return { getAllUsers };
}

export default useAllUsers