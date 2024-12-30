export  class ItemViewModel {
    master!: MasterViewModel;
    detail!: DetailViewModel[];
}

export  class MasterViewModel {
    id!:number;
    itemName!: string;
}

export  class DetailViewModel {
    name!: string;
    description!: string;
    qty!: number;
}
