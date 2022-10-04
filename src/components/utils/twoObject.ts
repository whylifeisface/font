
export function twoObject(beIn:Object,out:Object) {
    out = Object.fromEntries(
        Object.entries(beIn).map( i => 
            [i[0],i[1]]
    ))
    return out
}