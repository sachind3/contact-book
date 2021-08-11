import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const contacts = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );
    const checkContact = contacts.find(
      (contact) => contact.mobile === mobile && mobile
    );
    if (!name || !email || !mobile) {
      return toast.error("Please fill all the fields!");
    }
    if (checkEmail) {
      return toast.error("This email is already exist!");
    }
    if (checkContact) {
      return toast.error("This contact is already exist!");
    }
    const data = {
      id: new Date().getTime(),
      name,
      email,
      mobile,
    };
    dispatch({ type: "ADD_CONTACT", payload: data });
    toast.success("Contact added successfully!");
    history.push("/");
  };
  return (
    <div className="container my-5">
      <div className="row">
        <h1 className="display-6 text-center mb-4">Add new contact</h1>
        <div className="col-md-6 shadow mx-auto">
          <form className="py-3" onSubmit={handleSubmit} id="contactForm">
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Conact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
