import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {postCreateUser} from '../services/UserServices';
import {toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const {show,handleClose,handleUpdateTable} = props;
    const [name,setName] = useState("");
    const [job, setJob]= useState("");

    const handleSaveUser = async () => {
      let res = await postCreateUser(name,job);
        if(res && res.id) {
          //suress
          handleClose();
          setName('');
          setJob('');
          toast.success("ban da cap nhap thanh cong!");
          handleUpdateTable({first_name: name, id: res.id});
        }else {
          //error
          toast.error("ban da cap nhap That bai!");
        }
    }
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
          <Modal.Title>Add New user</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddNew;



