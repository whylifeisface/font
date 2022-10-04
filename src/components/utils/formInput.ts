export function formInput<T>(input:T){
    const M:T = {} as T;
    (Object.keys(input) as  Array<keyof T>).map((data)=>{
            M[data] = input[data]
    })
    return M
}