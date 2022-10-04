const array_length_to_0 =  function<T>(array:[T]){
    console.log("array_length_to_0",array.length);
        const length = array.length
        for (let index = 0; index < length; index++) {
            // const element = array[index];
            array.pop()
            
        }
        return array;
}
export default array_length_to_0