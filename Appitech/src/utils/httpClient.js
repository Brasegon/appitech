import AsyncStorage from '@react-native-async-storage/async-storage';
export default httpClient = (url, method, data) => {
    async function getAuthorization() {
        var info; 
        var authorization
        info = await AsyncStorage.getItem('@account')
        info = JSON.parse(info);
        if (info && info.accessToken) {
            authorization =  "Bearer " + info.accessToken 
        }

        return fetch(url, {
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