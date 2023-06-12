import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import ModalAddNew from './components/ModalAddNew';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';


function App() {
  const [isShowModalAddNew, getisShowModalAddNew] = useState(false);

  const handleClose = () => {
    getisShowModalAddNew(false);
  }
  return (
    <div className ='app-container'>
      <Header />
      <Container>
        <div className='my-3 add-new'>
          <span><b>List User:</b></span> 
          <button type="button" class="btn btn-success" onClick={() => getisShowModalAddNew(true)}>Add new user</button>
        </div>
        <TableUsers />
      </Container>

      <ModalAddNew
        show = {isShowModalAddNew}
        handleClose = {handleClose}
      />
    </div>
  );
}

export default App;
