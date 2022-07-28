export interface IDataPaginator {
    currentPage: number;
    perPage: number;
    pages: number;
    total: number;
    numbers: any[],
}

export interface IPaginatorProps {
    dataPaginator: IDataPaginator;
    changePageBack: () => void;
    changePageNext: () => void;
}