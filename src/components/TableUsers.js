import Table from 'react-bootstrap/Table';
import {useEffect, useState}from 'react';
import {fetchAllUser} from '../services/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './modalEditUser';

const TableUsers = (props) => {

    const[listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPager, setTotalPager] = useState(0);

    const [isShowModalAddNew, getisShowModalAddNew] = useState(false);
    const [isShowModalEdit,getisShowModalEdit] = useState(false);
    const [dataUserEdit, setdataUserEdit] = useState("");

    const handleUpdateTable = (user) => {
      setListUser([user,...listUser])
    }

    const handleClose = () => {
      getisShowModalAddNew(false);
      getisShowModalEdit(false)

    }



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

    const handleEditUser = (user) => {
      setdataUserEdit(user)
      getisShowModalEdit(user)
    }
    
 
    return (<>
      <div className='my-3 add-new'>
          <span><b>List User:</b></span> 
          <button type="button" class="btn btn-success" onClick={() => getisShowModalAddNew(true)}>Add new user</button>
        </div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>User Name</th>
          <th>Actions</th>
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
          <td>
              <button className='btn btn-warning mx-3'
                onClick={() => handleEditUser(item)}
              >Edit</button>
              <button className='btn btn-danger'>Delete</button>
          </td>
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

  <ModalAddNew
        show = {isShowModalAddNew}
        handleClose = {handleClose}
        handleUpdateTable = {handleUpdateTable}
  />
  <ModalEditUser
        show = {isShowModalEdit}
        dataUserEdit = {dataUserEdit}
        handleClose = {handleClose}
  />
    </>)
}


export default TableUsers;