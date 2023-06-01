export interface CreateKindOfWork extends Omit<KindOfWorkItemEntity, 'id'> {
    id?:string;
}

export interface KindOfWorkItemEntity {
    id: string;
    hourstype:string;
}

export interface ListKindOfWorkRes {
    place: number;
    hour:KindOfWorkItemEntity;
}
