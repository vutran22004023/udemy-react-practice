import './TableUsers.scss';
import Table from 'react-bootstrap/Table';
import {useEffect, useState}from 'react';
import {fetchAllUser} from '../services/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './modalEditUser';
import ModalComfirm from './ModalComfirm';
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";

const TableUsers = (props) => {

    const[listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPager, setTotalPager] = useState(0);

    const [isShowModalAddNew, getisShowModalAddNew] = useState(false);

    const [isShowModalEdit,getisShowModalEdit] = useState(false);
    const [dataUserEdit, setdataUserEdit] = useState ({});

    const [isShowModalDelete,setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setdataUserDelete] = useState({});


    const [keyworld,setKeyBorld] = useState("");

    const handleUpdateTable = (user) => {
      setListUser([user,...listUser])
    }
    const handEditUserFromModal = (user) => {
      let cloneListUser = _.cloneDeep(listUser);
      let  index = listUser.findIndex(item => item.id  === user.id)
      cloneListUser[index].first_name = user.first_name;
      setListUser(cloneListUser);
    }

    const handleClose = () => {
      getisShowModalAddNew(false);
      getisShowModalEdit(false)
      setIsShowModalDelete(false)
    }



    useEffect (() => {
      // call apis

      getUser(1);
    },[])

    const getUser = async (page) => {
      let res = await fetchAllUser(page);
      if(res && res.data) {
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
      getisShowModalEdit(true)
    }
    
    const handDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setdataUserDelete(user);
    }

    const handDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = cloneListUser.filter(item => item.id !== useEffect.id)
        setListUser(cloneListUser);
    }
    
    const handSearch = debounce((event) => {
        console.log(event.target.value)
        let term = event.target.value;
        if(term) {
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = cloneListUser.filter(item => item.email.includes(term));
        setListUser(cloneListUser);
        }else {
          getUser(1);
        }
    },500)

    const csvData = [
      ["firstname", "lastname", "email"],
      ["Ahmed", "Tomi", "ah@smthing.co.com"],
      ["Raed", "Labes", "rl@smthing.co.com"],
      ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    return (<>
      <div className='my-3 add-new'>
          <span><b>List User:</b></span>
          <div className='group-btns'>
            <label htmlFor="test" className='btn btn-warning'>
            <i className="fa-solid fa-file-import"></i> Import
            </label>
              <input id='test' type='file' hidden/>

            <CSVLink
            filename={"my-file.csv"}
            className="btn btn-primary"
             data={csvData}><i className="fa-solid fa-cloud-arrow-down"></i> Export</CSVLink>           
            <button type="button"
              class="btn btn-success" onClick={() => getisShowModalAddNew(true)}>
              <i class="fa-sharp fa-solid fa-circle-plus"></i> Add new
          </button>

          </div> 
          
        </div>

      <div className='col-4 my-3'>
          <input className='form-control'
           placeholder='Search user by email '
          //  value={keyworld}
           onChange={(event) => handSearch(event)}
           />
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
              <button
              onClick={() => handDeleteUser (item)}
                className='btn btn-danger'>
                Delete
              </button>
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
        handEditUserFromModal = {handEditUserFromModal}
  />
  <ModalComfirm
        show ={isShowModalDelete}
        handleClose = {handleClose}
        dataUserDelete ={dataUserDelete}
        handDeleteUserFromModal = {handDeleteUserFromModal}
  />
    </>)
}


export default TableUsers;