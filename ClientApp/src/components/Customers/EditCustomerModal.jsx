import './../App.css';
import ReactDOM from 'react-dom'
import { Button, Icon } from 'semantic-ui-react'
import { useState } from 'react';

function EditCustomerModal(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [show, setShow] = useState(props.showEditModal)

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    function handleSave() {
        props.editCustomer(props.id, name, address);

    }

    if (!show) return (<Button color='yellow' onClick={handleOpen}><Icon name='external alternate' />Edit</Button>)

    return ReactDOM.createPortal(
        <>
            <div className="modalOverlayStyle" />
            <div className="modalStyle">

                <div>
                    <h2>Edit Customer</h2>
                    <br></br>
                </div>

                <form class="ui form">
                    <div class="field">
                        <label>NAME</label>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div class="field">
                        <label>ADDRESS</label>
                        <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    </div>
                    <button class="right floated positive ui right labeled icon button" onClick={handleSave}>Edit<Icon name='check icon' /></button>
                    <button class="ui black right floated button" onClick={handleClose}>Cancel</button>
                </form>
            </div>

        </>,
        document.getElementById('portal')
    );


}

export default EditCustomerModal;