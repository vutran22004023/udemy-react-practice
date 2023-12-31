import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {putUpdateUser} from '../services/UserServices';
import {toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const {show,handleClose,dataUserEdit,handEditUserFromModal} = props;
    const [name,setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = async () => {
       let res = await putUpdateUser(name,job)
       if(res && res.updateAt) {
        handEditUserFromModal ({
           first_name: name,
           id: dataUserEdit.id
        })
        handleClose();
        toast.success("Cap nhap thanh cong")
       }
    }

    useEffect(() => {
        if(show) {
            setName(dataUserEdit.first_name)
        }
    },[dataUserEdit])
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal
       show={show} 
       onHide={handleClose}
       backdrop="static"
      keyboard={false}
       >
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                <div class="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text"
                     className="form-control"
                     value ={name}
                    onChange = {(event) => setName(event.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label  className="form-label">Job</label>
                    <input 
                    type="text" 
                    class="form-control"
                    value ={job}
                    onChange = {(event) => setJob(event.target.value)}
                    />
                </div>
            </div>

            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalEditUser;



