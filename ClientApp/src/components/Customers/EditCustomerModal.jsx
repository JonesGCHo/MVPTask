import './../App.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';

function EditCustomerModal({ open, onClose }) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    if (!open) return null

    return ReactDOM.createPortal(
        <>
            <div className="modalOverlayStyle" />
            <div className="modalStyle">

                <form class="ui form">
                    <div class="field">
                        <label>NAME</label>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div class="field">
                        <label>ADDRESS</label>
                        <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    </div>
                    <button class="ui black button" floated="right" onClick={onClose}>Close</button>
                    <button class="positive ui button" floated="right" onClick={editData(0)}>Create</button>
                </form>
            </div>

        </>,
        document.getElementById('portal')
    );

    function editData(id) {
        var data = { id, name, address }
        return (

            fetch('api/depts/' + id, {
                method: 'PUT', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        )

    }
}

export default EditCustomerModal;

//placeholder = { children }