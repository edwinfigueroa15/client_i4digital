import { IPaginatorProps } from '../interfaces/IPaginator';

const Paginator = ({ dataPaginator, changePageBack, changePageNext }: IPaginatorProps) => {

    return (
        <nav className='d-flex justify-content-center'>
            <ul className="pagination m-0 mt-3">
                <li className="page-item">
                    <button className="page-link" onClick={changePageBack} disabled={!(dataPaginator.currentPage > 0)}>
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                { dataPaginator.numbers.map((item, index) => (
                    <li className={ dataPaginator.currentPage === index ? 'page-item active' : 'page-item'} key={index}>
                        <button className="page-link">{index+1}</button>
                    </li>
                ))}
                <li className="page-item">
                    <button className="page-link" onClick={changePageNext} disabled={!(dataPaginator.currentPage < dataPaginator.pages-1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Paginator;