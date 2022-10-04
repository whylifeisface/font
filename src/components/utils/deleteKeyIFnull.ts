   function deleteKeyIfnull<T>(object:T) {
    if(Object.keys(object).length == 0)return
    const  m = {} as any
    (Object.keys(object)as  Array<keyof T>).map(
        i =>{   
            console.log(i);
            
            if(object[i] != null &&object[i] != undefined&&object[i]) 
            m[i] = object[i]
            console.log("deleteKeyIfnull m ",m);
            
        }
    )
    return m
    // s.reduce((target,key) => {
    //     target[key] = object[key]
    //     return  target
    // })
}
export default deleteKeyIfnull