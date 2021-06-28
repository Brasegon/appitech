import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config';
export default httpClient = (url, method, data) => {
    async function getAuthorization() {
        var info; 
        var authorization
        info = await AsyncStorage.getItem('@account')
        console.log(info)
        info = JSON.parse(info);
        if (info && info.token) {
            authorization =  "Bearer " + info.token 
        }

        return fetch(Config.url + url, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: authorization
            },
            body: JSON.stringify(data)
        })
        .then((response) => {return response.json()})
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
    }
    return getAuthorization();
}