import Table from 'react-bootstrap/Table';
import {useEffect, useState}from 'react';
import {fetchAllUser} from '../services/UserServices';
import ReactPaginate from 'react-paginate';

const TableUsers = (props) => {

    const[listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPager, setTotalPager] = useState(0);
    useEffect (() => {
      // call apis

      getUser(1);
    },[])

    const getUser = async (page) => {
      let res = await fetchAllUser(page);
      if(res && res.data) {
        console.log(res);
        setTotalUsers(res.total);
        setListUser(res.data)
        setTotalPager(res.total_pages);
      }
    }
    
    const handlePageClick = (event) => {
      console.log("event : ", event);
      getUser(+event.selected + 1);
    }
 
    return (<>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>User Name</th>
        </tr>
      </thead>
      <tbody>
      {listUser && listUser.length >0 &&
      
      listUser.map((item, index) => {
        return (
          <tr key = {`user ${index}`}>
          <td>{item.id}</td>
          <td>{item.email}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
        </tr>
        )
      })
      }
      </tbody>
    </Table>
    <ReactPaginate
    nextLabel="next >"
    onPageChange={handlePageClick}
    pageRangeDisplayed={3}
    marginPagesDisplayed={2}
    pageCount={totalPager}
    previousLabel="< previous"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    previousClassName="page-item"
    previousLinkClassName="page-link"
    nextClassName="page-item"
    nextLinkClassName="page-link"
    breakLabel="..."
    breakClassName="page-item"
    breakLinkClassName="page-link"
    containerClassName="pagination"
    activeClassName="active"
    renderOnZeroPageCount={null}
  />
    </>)
}


export default TableUsers;