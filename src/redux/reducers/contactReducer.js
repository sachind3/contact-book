const initialState = [
  {
    id: 1628682766909,
    name: "John Smith",
    email: "john@gmail.com",
    mobile: "8888976456",
  },
  {
    id: 1628682785012,
    name: "Sameer Dev",
    email: "sameer@gmail.com",
    mobile: "8788976456",
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "UPDATE_CONTACT":
      const updateState = state.filter((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateState;
      return state;
    case "DELETE_USER":
      const newcontact = state.filter(
        (contact) => contact.id !== action.payload
      );
      state = newcontact;
      return state;
    default:
      return state;
  }
};

export default contactReducer;
