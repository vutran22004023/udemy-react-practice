import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {DeleteUser} from '../services/UserServices';
import { toast } from'react-toastify';

const ModalComfirm = (props) => {
    const {show,handleClose,dataUserDelete,handDeleteUserFromModal} = props;

    const ComfirmDelete = async () =>  {
        let res = await DeleteUser(dataUserDelete.id);
        if(res && +res.statusCode === 204) {
            handleClose();
            handDeleteUserFromModal(dataUserDelete);
            toast.success("Da xoa thanh cong");
            
        }else {
            handleClose();
            toast.error ("Xoa khong thanh cong");
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
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                Ban co muon xoa truong nay ko?
                <br/>
                truong co email la <b>{dataUserDelete.email} ?</b>
            </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => ComfirmDelete()}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComfirm;



