// <!-- id name productCount level showStatus navStatus -->

interface A{
    id:number,
    name:string
    productCount:number
    level:string
    showStatus:number
    navStatus:string
}

interface treeTable{
    price:number | undefined,
    stock:number | undefined,
    low_stock:number | undefined,
    sku_code:number | undefined
}
interface threeForm {
    inputList:string,
    name:string
}
type three = treeTable & threeForm

type State = {
    Loaddata:[A | any],
    diavisible:Boolean,
    total:number,
    dialogValue:Object
}

interface B{
    parentId: number,
    id: number, 
    name: string, 
    level: number,
    productCount: number,
    productUnit: string,
    navStatus: string,
    showStatus: number,
    sort: number,
    icon: string, 
    keywords: string, 
    description: string,
    index:string
}

interface AC {
    verifyStatus:string|null
    ,publishtatus:string|null
    ,brandName:string|null
    ,productCategoryName:string|null
    ,productSn:string|null
    ,name:string|null
}

interface AB {
    productCategoryName:string,
    name:string,
    subTitle:string,
    brandName:string
    ,description:string,
    productSn:string,
    price:string,
    originalPrice:string,
    stock:string,
    unit:string,
    weight:string,
    sort:string
}    

interface two {
    serviceIds: number[],
    giftPoint:string,
    giftGrowth:string,
    usePointLimit:string,
    previewStatus:number,
    publishStatus:number,
    recommandStatus:number,
    newStatus:number,
    detailTitle:string,
    detailDesc:string,
    keywords:string,
    note:string
}

export { A,State,B,AC,AB,two,treeTable,three,threeForm }