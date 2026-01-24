/**
 * @file GuestManagement.js
 * @description This component handles guest management functionality including viewing, adding, editing, and managing relationships between guests.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import { useState } from "react";
import { FaSearch, FaUserEdit } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { FaSort } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosRemoveCircle } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const GuestManagement = ({ guests, setGuests }) => {
  const [activeSubTab, setActiveSubTab] = useState("view-guests-list"); // Start the active sub tab with view-guests-list
  const [selectedGuest, setSelectedGuest] = useState(null); // If null no guest is selected

  // Render the sub tabs with a switch statement
  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "view-guests-list":
        return (
          <ViewGuestsList
            guests={guests}
            setGuests={setGuests}
            setActiveSubTab={setActiveSubTab}
            setSelectedGuest={setSelectedGuest}
          />
        );
      case "edit-add-guest":
        return (
          <EditAddGuest
            guests={guests}
            setGuests={setGuests}
            selectedGuest={selectedGuest}
            setSelectedGuest={setSelectedGuest}
          />
        );
      case "manage-relationships":
        return <ManageRelationships guests={guests} setGuests={setGuests} />;
      default:
        return (
          <ViewGuestsList
            guests={guests}
            setGuests={setGuests}
            setActiveSubTab={setActiveSubTab}
            setSelectedGuest={setSelectedGuest}
          />
        );
    }
  };

  return (
    <div className="w-full flex flex-col jusify-start items-start">
      <h4 className="text-2xl font-bold mb-6 text-left text-[#d72660]">
        Quản lý khách mời
      </h4>

      <div className=" w-full flex justify-start flex-wrap gap-2 md:gap-4">
        {/* Buttons to switch between sub tabs */}
        <button
          onClick={() => setActiveSubTab("view-guests-list")}
          className={`h-8 p-3 max-sm:text-sm flex justify-center items-center rounded-lg font-semibold transition duration-300
      ${
        activeSubTab === "view-guests-list"
          ? "bg-[#d72660] text-[#fffdfc]"
          : "bg-transparent border-2 border-[#dcb46d] text-[#d72660] hover:bg-[#dcb46d] hover:text-[#fffdfc]"
      }`}
        >
          Danh sách khách
        </button>
        <button
          onClick={() => setActiveSubTab("edit-add-guest")}
          className={`h-8 p-3 max-sm:text-sm flex justify-center items-center rounded-lg font-semibold transition duration-300
      ${
        activeSubTab === "edit-add-guest"
          ? "bg-[#d72660] text-[#fffdfc]"
          : "bg-transparent border-2 border-[#dcb46d] text-[#d72660] hover:bg-[#dcb46d] hover:text-[#fffdfc]"
      }`}
        >
          Thêm/Sửa khách
        </button>
        <button
          onClick={() => setActiveSubTab("manage-relationships")}
          className={`h-8 p-3 max-sm:text-sm flex justify-center items-center rounded-lg font-semibold transition duration-300
      ${
        activeSubTab === "manage-relationships"
          ? "bg-[#d72660] text-[#fffdfc]"
          : "bg-transparent border-2 border-[#dcb46d] text-[#d72660] hover:bg-[#dcb46d] hover:text-[#fffdfc]"
      }`}
        >
          Quản lý quan hệ
        </button>
      </div>
      {/* Render sub tabs */}
      {renderSubTabContent()}
    </div>
  );
};

export default GuestManagement;

// ViewGuestsList component displays the list of all guests with search and sort functionality.
const ViewGuestsList = ({
  guests,
  setGuests,
  setActiveSubTab,
  setSelectedGuest,
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // for the search input
  const [sortOption, setSortOption] = useState("id"); // default sort is by id
  const [guestsList, setGuestsList] = useState(guests); // pass the guest list into a state

  // function to handle 'Edit Guest'
  const handleEditGuest = (guest) => {
    setSelectedGuest(guest); // Set the selected guest for editing
    setActiveSubTab("edit-add-guest"); // Switch to edit form
  };

  // function to handle 'Delete Guest' and its relationships
  const handleDeleteGuest = async (guestId) => {
    // Find the guest to be deleted
    const guestToDelete = guestsList.find((guest) => guest.id === guestId);

    // return if the guests to be deleted doesn't exists
    if (!guestToDelete) {
      console.error("Guest not found");
      alert("Guest not found");
      return;
    }

    try {
      // Find all guests who have a relationship with the guest to be deleted
      const guestsWithRelationship = guestsList.filter(
        (guest) =>
          guest.relationshipIds && guest.relationshipIds.includes(guestId)
      );

      // Update each guest who has a relationship with the guest to be deleted
      for (let guest of guestsWithRelationship) {
        const updatedRelationships = guest.relationshipIds.filter(
          (id) => id !== guestId
        );

        // Update Firestore for each guest
        const guestDocRef = doc(db, "guests", String(guest.id));
        await updateDoc(guestDocRef, {
          relationshipIds: updatedRelationships,
        });

        // Update the local state for each guest
        guest.relationshipIds = updatedRelationships;
      }

      setGuestsList([...guestsList]); // Trigger re-render with updated relationships
      setGuests([...guestsList]); // Update the main guests state

      // Delete the guest from Firestore
      await deleteGuest(guestId);

      // Update the local guest list after deletion
      const updatedGuests = guestsList.filter((guest) => guest.id !== guestId);
      setGuestsList(updatedGuests);
      setGuests(updatedGuests);

      console.log(`Guest with ID ${guestId} deleted successfully`);
      alert(`Guest deleted successfully`);
    } catch (error) {
      console.error("Error deleting guest and updating relationships:", error);
      alert(`Error deleting the guest and updating relationships`);
    }
  };

  // Function for deleting the guests from Firestore
  const deleteGuest = async (guestId) => {
    try {
      const guestDocRef = doc(db, "guests", String(guestId));
      await deleteDoc(guestDocRef);
      console.log(`Guest with ID ${guestId} deleted successfully`);
      alert(`Guest deleted successfully`);
    } catch (error) {
      console.error("Error deleting guest:", error);
      alert(`Error deleting the guests`);
      throw error;
    }
  };

  // Filter and sort guests based on search term and sort option
  const filteredGuests = guestsList
    .filter((guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "id":
          return a.id - b.id;
        case "name":
          return a.name.localeCompare(b.name);
        case "name-reverse":
          return b.name.localeCompare(a.name);
        case "karolina":
          return a.guestSide === "Karolina" && b.guestSide !== "Karolina"
            ? -1
            : 1;
        case "emanuele":
          return a.guestSide === "Emanuele" && b.guestSide !== "Emanuele"
            ? -1
            : 1;
        case "status-yes":
          return a.attending === "Yes" && b.attending !== "Yes" ? -1 : 1;
        case "status-no":
          return a.attending === "No" && b.attending !== "No" ? -1 : 1;
        case "status-unknown":
          return a.attending === "Unknown" && b.attending !== "Unknown"
            ? -1
            : 1;
        default:
          return 0;
      }
    });

  return (
    <div className="w-full flex flex-col jusify-start items-start mt-4">
      {guestsList.length === 0 ? (
        <p>Fetching...</p>
      ) : (
        <>
          <div className="w-full flex gap-2 justify-between flex-wrap border-b pb-4 mb-4">
            {/* Search bar */}
            <div className="w-full max-w-[400px] flex gap-2 items-center justify-center">
              <FaSearch className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px] text-neutral-600" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search guests by name"
                className="max-sm:h-[33px] border  sm:p-2 w-full focus:outline-none focus:ring-0"
              />
            </div>

            {/* Sort options */}
            <div className="w-full max-w-[400px] flex gap-2 items-center justify-center">
              <FaSort className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px] text-neutral-600" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border p-1 sm:p-2 focus:outline-none focus:ring-0"
              >
                <option value="id" className="max-sm:text-[15px]">
                  Sort by ID
                </option>
                <option value="name" className="max-sm:text-[15px]">
                  Sort by Name {"("}A-Z{")"}
                </option>
                <option value="name-reverse" className="max-sm:text-[15px]">
                  Sort by Name {"("}Z-A{")"}
                </option>
                <option value="karolina" className="max-sm:text-[15px]">
                  Sort by Karolina&apos;s Side
                </option>
                <option value="emanuele" className="max-sm:text-[15px]">
                  Sort by Emanuele&apos;s Side
                </option>
                <option value="status-yes" className="max-sm:text-[15px]">
                  Sort by Status: Yes
                </option>
                <option value="status-no" className="max-sm:text-[15px]">
                  Sort by Status: No
                </option>
                <option value="status-unknown" className="max-sm:text-[15px]">
                  Sort by Status: Unknown
                </option>
              </select>
            </div>
          </div>

          {/* Guest list */}
          <ul className="w-full border rounded max-h-[650px] sm:max-h-[500px] overflow-y-auto pr-8">
            {filteredGuests.map((guest) => (
              <li
                key={guest.id}
                className="w-full flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center border-b last:border-b-0  sm:gap-12 "
              >
                <div className="flex">
                  <div className="flex">
                    <p className="font-sans font-semibold p-2 bg-neutral-200">
                      {guest.id}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start p-3">
                    <div className=" flex gap-2 items-center">
                      <h6 className="font-sans max-sm:text-base  bg-orange-200 p-1 sm:p-2 text-left">
                        {guest.name}
                      </h6>
                      <div
                        className={`w-6 h-6 rounded-full ${
                          guest.attending === "No"
                            ? "bg-red-500"
                            : guest.attending === "Yes"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      />
                    </div>

                    <p className="font-sans max-sm:text-sm text-left max-sm:mb-[5px]">
                      <span className="font-semibold">Attending:</span>{" "}
                      {guest.attending}
                    </p>
                    <p className="font-sans max-sm:text-sm text-left max-sm:mb-[5px]">
                      <span className="font-semibold">Side:</span>{" "}
                      {guest.guestSide}
                    </p>
                    <p className="font-sans max-sm:text-sm text-left max-sm:mb-[5px]">
                      <span className="font-semibold">Note:</span>{" "}
                      {guest.note.length === 0 ? "" : guest.note}
                    </p>
                  </div>
                </div>
                <div className="max-sm:w-full flex flex-row sm:flex-col gap-2 max-sm:mb-4 max-sm justify-between">
                  <button
                    onClick={() => handleEditGuest(guest)}
                    className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full bg-cyan-600 flex flex-grow justify-center items-center"
                  >
                    <FaUserEdit
                      color="white"
                      className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px]"
                    />
                  </button>

                  <AlertDialog>
                    <AlertDialogTrigger className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full bg-red-600 flex flex-grow justify-center items-center">
                      <RiDeleteBin5Fill
                        color="white"
                        className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px]"
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This guest will be removed from the list
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteGuest(guest.id)}
                        >
                          Delete Guest
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// EditAddGuest component handles the form for adding a new guest or editing an existing guest's details.
const EditAddGuest = ({
  selectedGuest,
  setSelectedGuest,
  setGuests,
  guests,
}) => {
  // States for input fields. If they are empty strings, we are in "add guest" mode
  const [name, setName] = useState(selectedGuest?.name || "");
  const [guestSide, setGuestSide] = useState(selectedGuest?.guestSide || "");
  const [attending, setAttending] = useState(selectedGuest?.attending || "");
  const [note, setNote] = useState(selectedGuest?.note || "");

  // Function to handle the submt, with either updating a guest or adding a new one
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedGuest) {
      // Edit mode
      try {
        const guestDocRef = doc(db, "guests", String(selectedGuest.id));
        await updateDoc(guestDocRef, { name, guestSide, attending, note });
        setGuests((prevGuests) =>
          prevGuests.map((guest) =>
            guest.id === selectedGuest.id
              ? { ...guest, name, guestSide, attending, note }
              : guest
          )
        );
        console.log("Guest updated successfully");
        alert("Guest info updated");
        setName("");
        setGuestSide("");
        setAttending("");
        setNote("");
        setSelectedGuest(null);
      } catch (error) {
        console.error("Error updating guest:", error);
        alert("Error updating guest");
      }
    } else {
      // Add mode
      // Find the highest existing ID
      const highestId = guests.reduce(
        (maxId, guest) => Math.max(maxId, guest.id),
        0
      );
      const newGuest = {
        id: highestId + 1, // Assign the next ID
        name,
        guestSide,
        attending,
        note,
      };

      try {
        const guestDocRef = doc(db, "guests", String(newGuest.id));
        await setDoc(guestDocRef, newGuest);
        setGuests((prev) => [...prev, newGuest]);
        console.log("Guest added successfully");
        alert("New guest added to the list");
        // Add the new guest to the guests state, ensuring no duplicates
        setGuests((prevGuests) => {
          // Check if the guest is already in the list
          const guestExists = prevGuests.some(
            (guest) => guest.id === newGuest.id
          );
          if (!guestExists) {
            return [...prevGuests, newGuest];
          }
          return prevGuests;
        });
        setName("");
        setGuestSide("");
        setAttending("");
        setNote("");
      } catch (error) {
        console.error("Error adding guest:", error);
        alert("Error adding new guest");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-start items-start gap-4 mt-6"
    >
      <div className="max-sm:w-full sm:min-w-[500px] flex flex-col gap-1">
        <label>Guest Name *</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="max-w-[500px] border  sm:p-2 w-full focus:outline-none focus:ring-0"
        />
      </div>
      <div className="max-sm:w-full sm:min-w-[500px] flex flex-col gap-1">
        <label>Side *</label>
        <select
          value={guestSide}
          onChange={(e) => setGuestSide(e.target.value)}
          required
          className="max-w-[500px] border  sm:p-2 w-full focus:outline-none focus:ring-0"
        >
          <option value="" disabled>
            Select Side
          </option>
          <option value="Emanuele">Emanuele</option>
          <option value="Karolina">Karolina</option>
        </select>
      </div>
      <div className="max-sm:w-full sm:min-w-[500px] flex flex-col gap-1">
        <label>Attending *</label>
        <select
          value={attending}
          onChange={(e) => setAttending(e.target.value)}
          required
          className="max-w-[500px] border  sm:p-2 w-full focus:outline-none focus:ring-0"
        >
          <option value="" disabled>
            Attending?
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      <div className="max-sm:w-full sm:min-w-[500px] flex flex-col gap-1">
        <label>Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)"
          className="max-w-[500px] border  p-2 w-full focus:outline-none focus:ring-0"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-green-900 text-white p-2 font-bold"
      >
        {selectedGuest ? "Update Guest" : "Add Guest"}
      </button>
    </form>
  );
};

// ManageRelationships component allows users to manage guest relationships by adding or removing connections between guests.
const ManageRelationships = ({ guests, setGuests }) => {
  const [searchTerm, setSearchTerm] = useState(""); // For the search input
  const [sortOption, setSortOption] = useState("id"); // default sort is by id
  const [selectedGuest, setSelectedGuest] = useState(null); // If null no guest is selected
  const [relationshipSearch, setRelationshipSearch] = useState(""); // for relationships search input

  // Filter and sort guests based on search term and sort option
  const filteredGuests = guests
    .filter((guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "id":
          return a.id - b.id;
        case "name":
          return a.name.localeCompare(b.name);
        case "name-reverse":
          return b.name.localeCompare(a.name);
        case "karolina":
          return a.guestSide === "Karolina" && b.guestSide !== "Karolina"
            ? -1
            : 1;
        case "emanuele":
          return a.guestSide === "Emanuele" && b.guestSide !== "Emanuele"
            ? -1
            : 1;
        case "with-relationships":
          return a.relationshipIds?.length > 0 ? -1 : 1;
        case "without-relationships":
          return a.relationshipIds?.length === 0 ? -1 : 1;
        default:
          return 0;
      }
    });

  // Filter for relationship modal
  const filteredRelationshipGuests = guests
    .filter(
      (g) =>
        g.id !== selectedGuest?.id &&
        g.name.toLowerCase().includes(relationshipSearch.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  // Function to add relationships to both guests
  const handleAddRelationship = async (relationshipGuest) => {
    if (!selectedGuest) return;

    const selectedGuestId = selectedGuest.id;
    const relationshipGuestId = relationshipGuest.id;

    console.log(
      `Adding relationship between ${selectedGuest.name} and ${relationshipGuest.name}`
    );

    // Add relationshipGuestId to selectedGuest
    const updatedSelectedGuestRelationships = Array.from(
      new Set([...(selectedGuest.relationshipIds || []), relationshipGuestId])
    );

    // Add selectedGuestId to relationshipGuest
    const updatedRelationshipGuestRelationships = Array.from(
      new Set([...(relationshipGuest.relationshipIds || []), selectedGuestId])
    );

    // Update Firestore for both guests
    try {
      const selectedGuestRef = doc(db, "guests", String(selectedGuestId));
      const relationshipGuestRef = doc(
        db,
        "guests",
        String(relationshipGuestId)
      );

      // Update the relationships for both guests in Firestore
      await updateDoc(selectedGuestRef, {
        relationshipIds: updatedSelectedGuestRelationships,
      });

      await updateDoc(relationshipGuestRef, {
        relationshipIds: updatedRelationshipGuestRelationships,
      });

      // Update local state for both guests
      setGuests((prevGuests) =>
        prevGuests.map((guest) => {
          if (guest.id === selectedGuestId) {
            return {
              ...guest,
              relationshipIds: updatedSelectedGuestRelationships,
            };
          }
          if (guest.id === relationshipGuestId) {
            return {
              ...guest,
              relationshipIds: updatedRelationshipGuestRelationships,
            };
          }
          return guest;
        })
      );

      console.log(
        `Relationship successfully added between ${selectedGuest.name} and ${relationshipGuest.name}`
      );
      alert(
        `Relationship successfully added between ${selectedGuest.name} and ${relationshipGuest.name}`
      );
      // Close the modal after adding the relationship
      setSelectedGuest(null);
      setRelationshipSearch("");
    } catch (error) {
      console.error("Error adding relationship:", error);
      alert("Error adding relationship");
    }
  };

  // function fro handlisng 'Remove Relationship'
  const handleRemoveRelationship = async (guestId, relationshipGuestId) => {
    // Find the guest and the relationship guest from the state
    const guest = guests.find((g) => g.id === guestId);
    const relationshipGuest = guests.find((g) => g.id === relationshipGuestId);

    if (!guest || !relationshipGuest) {
      console.error("One or both guests not found");
      return;
    }

    // Remove relationshipGuestId from guest's relationshipIds
    const updatedGuestRelationships = (guest.relationshipIds || []).filter(
      (id) => id !== relationshipGuestId
    );

    // Remove guestId from relationshipGuest's relationshipIds
    const updatedRelationshipGuestRelationships = (
      relationshipGuest.relationshipIds || []
    ).filter((id) => id !== guestId);

    // Update Firestore for both guests
    try {
      const guestRef = doc(db, "guests", String(guestId));
      const relationshipGuestRef = doc(
        db,
        "guests",
        String(relationshipGuestId)
      );

      // Update the relationships for both guests in Firestore
      await updateDoc(guestRef, {
        relationshipIds: updatedGuestRelationships,
      });

      await updateDoc(relationshipGuestRef, {
        relationshipIds: updatedRelationshipGuestRelationships,
      });

      // Update local state for both guests
      setGuests((prevGuests) =>
        prevGuests.map((g) => {
          if (g.id === guestId) {
            return {
              ...g,
              relationshipIds: updatedGuestRelationships,
            };
          }
          if (g.id === relationshipGuestId) {
            return {
              ...g,
              relationshipIds: updatedRelationshipGuestRelationships,
            };
          }
          return g;
        })
      );

      console.log(
        `Relationship successfully removed between ${guest.name} and ${relationshipGuest.name}`
      );
      alert(
        `Relationship successfully removed between ${guest.name} and ${relationshipGuest.name}`
      );
    } catch (error) {
      console.error("Error removing relationship:", error);
      alert("Error removing relationship");
    }
  };

  return (
    <div className="w-full flex flex-col jusify-start items-start mt-4">
      {guests.length === 0 ? (
        <p>Fetching...</p>
      ) : (
        <>
          <div className="w-full flex gap-2 justify-between flex-wrap border-b pb-4 mb-4">
            {/* Search bar */}
            <div className="w-full max-w-[400px] flex gap-2 items-center justify-center">
              <FaSearch className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px] text-neutral-600" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search guests by name"
                className="max-sm:h-[33px] border sm:p-2 w-full focus:outline-none focus:ring-0"
              />
            </div>

            {/* Sort options */}
            <div className="w-full max-w-[400px] flex gap-2 items-center justify-center">
              <FaSort className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px] text-neutral-600" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border p-1 sm:p-2 focus:outline-none focus:ring-0"
              >
                <option value="id">Sort by ID</option>
                <option value="name">Sort by Name (A-Z)</option>
                <option value="name-reverse">Sort by Name (Z-A)</option>
                <option value="karolina">Sort by Karolina&apos;s Side</option>
                <option value="emanuele">Sort by Emanuele&apos;s Side</option>
                <option value="with-relationships">With Relationships</option>
                <option value="without-relationships">
                  Without Relationships
                </option>
              </select>
            </div>
          </div>

          {/* Guest list */}
          <ul className="w-full border rounded max-h-[650px] sm:max-h-[500px] overflow-y-auto pr-8">
            {filteredGuests.map((guest) => (
              <li
                key={guest.id}
                className="w-full flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center border-b last:border-b-0 sm:gap-12"
              >
                <div className="flex">
                  <div className="flex">
                    <p className="font-sans font-semibold p-2 bg-neutral-200">
                      {guest.id}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start p-3">
                    <h6 className="font-sans max-sm:text-base bg-orange-200 p-1 sm:p-2 text-left">
                      {guest.name}
                    </h6>

                    <div className="flex flex-wrap mb-4">
                      {guest.relationshipIds &&
                      guest.relationshipIds.length > 0 ? (
                        guest.relationshipIds.map((relId) => {
                          const relationshipGuest = guests.find(
                            (g) => g.id === relId
                          );
                          return (
                            <span
                              key={relId}
                              className="font-sans text-sm md:text-lg bg-blue-200 px-2 py-1 rounded-full flex items-center gap-1"
                            >
                              - {relationshipGuest?.name || relId}
                              <button
                                onClick={() =>
                                  handleRemoveRelationship(
                                    guest.id,
                                    relationshipGuest.id
                                  )
                                }
                                className="text-red-500 ml-1"
                              >
                                <IoIosRemoveCircle size={26} />
                              </button>
                            </span>
                          );
                        })
                      ) : (
                        <p className="text-gray-500 font-sans text-lg">
                          No relationships
                        </p>
                      )}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="font-sans rounded-sm bg-cyan-600 flex flex-grow justify-center items-center text-white font-semibold px-2"
                          onClick={() => setSelectedGuest(guest)}
                        >
                          Add Relationship
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[600px]">
                        <DialogHeader>
                          <DialogTitle className="font-sans">
                            Add a Relationship
                          </DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-full overflow-y-auto">
                          <input
                            type="text"
                            value={relationshipSearch}
                            onChange={(e) =>
                              setRelationshipSearch(e.target.value)
                            }
                            placeholder="Search guest"
                            className="mb-4 border p-2 w-full"
                          />
                          <ul>
                            {filteredRelationshipGuests.map((guest) => (
                              <li
                                key={guest.id}
                                className="py-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleAddRelationship(guest)}
                              >
                                {guest.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
