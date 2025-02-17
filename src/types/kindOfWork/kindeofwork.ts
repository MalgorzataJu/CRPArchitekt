export interface CreateKindOfWork extends Omit<KindOfWorkItemEntity, 'id'> {
    id?:string;
}

export interface KindOfWorkItemEntityRes {
    id: string;
    hourstype:string;
}
export interface KindOfWorkItemEntity {
    id: string;
    hourstype:string;
    price?:number;
}
export interface ListKindOfWorkRes {
    place: number;
    kow:KindOfWorkItemEntity;
}
