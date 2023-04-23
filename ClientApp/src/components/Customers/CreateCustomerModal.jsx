import './../App.css';
import ReactDOM from 'react-dom'
import { useState } from 'react';

function CreateCustomerModal({ open, onClose }) {
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
                        <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div class="field">
                        <label>ADDRESS</label>
                        <input type="text" name="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    </div>
                    <button class="ui black button" floated="right" onClick={onClose}>Close</button>
                    <button class="positive ui button" type="submit" floated="right" onClick={saveData}>Create</button>
                </form>
            </div>

        </>,
        document.getElementById('portal')
    );

    function saveData() {
        const data = { name: name, address: address }

        fetch('api/depts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(data)
        })
            .then(function (res) { return res.json(); })
            .then(function (json) { console.log(json); });
    }
}

export default CreateCustomerModal;