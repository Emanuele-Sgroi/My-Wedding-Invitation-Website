const guestsList = [
  {
    id: 1,
    name: "John Doe",
    guestSide: "Emanuele",
    relationshipIds: [2, 3],
    attending: null,
  },
  {
    id: 2,
    name: "Jane Doe",
    guestSide: "Emanuele",
    relationshipIds: [1, 3],
    attending: null,
  },
  {
    id: 3,
    name: "Emily Doe",
    guestSide: "Emanuele",
    relationshipIds: [1, 2],
    attending: null,
  },
  {
    id: 4,
    name: "Mark Smith",
    guestSide: "Emanuele",
    relationshipIds: [],
    attending: null,
  },
  {
    id: 5,
    name: "Sarah Johnson",
    guestSide: "Emanuele",
    relationshipIds: [6],
    attending: null,
  },
  {
    id: 6,
    name: "Michael Brown",
    guestSide: "Emanuele",
    relationshipIds: [5],
    attending: null,
  },
  {
    id: 7,
    name: "David Wilson",
    guestSide: "Emanuele",
    relationshipIds: [],
    attending: null,
  },
  {
    id: 8,
    name: "Anna Lee",
    guestSide: "Emanuele",
    relationshipIds: [],
    attending: null,
  },
];

module.exports = guestsList;