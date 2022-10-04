export default function ObjectValueTonull<T>(data:T){
    
    const M = {} as any
    (Object.keys(data)as Array<keyof T>).map( i =>{
            M[i] = " "
    })

    return M
}