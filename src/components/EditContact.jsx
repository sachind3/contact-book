import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditContact = () => {
  const { id } = useParams();
  const contacts = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setMobile(currentContact.mobile);
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkEmail = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.email === email
    );
    const checkContact = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.mobile === mobile
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
      id: parseInt(id),
      name,
      email,
      mobile,
    };
    dispatch({ type: "UPDATE_CONTACT", payload: data });
    toast.success("Contact update successfully!");
    history.push("/");
  };

  return (
    <div className="container my-5">
      {currentContact ? (
        <div className="row">
          <h1 className="display-6 text-center mb-4">Edit contact</h1>
          <div className="col-md-6 shadow mx-auto">
            <form className="py-3" onSubmit={handleSubmit}>
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
                Update
              </button>
              <Link to="/" className="btn btn-danger mx-3">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditContact;
