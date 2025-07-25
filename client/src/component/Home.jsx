// Home.jsx
import React, { useEffect, useState } from "react";
import { bookBaseUrl } from "../axiosinstance";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
    Id: "",
  });
  const [booklist, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const getAllbookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("/booklists");
      setBookList(data?.BookList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllbookList();
  }, []);

  const handelFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (
        !bookForm?.BookName ||
        !bookForm?.BookTitle ||
        !bookForm?.Author ||
        !bookForm?.SellingPrice ||
        !bookForm?.PublishDate
      ) {
        alert("All fields are required");
        return;
      }

      const { data } = isUpdating
        ? await bookBaseUrl.put("/updatebook", bookForm)
        : await bookBaseUrl.post("/addbook", bookForm);

      if (data?.Success) {
        alert(data?.Message);
        setBookForm({
          BookName: "",
          BookTitle: "",
          Author: "",
          SellingPrice: "",
          PublishDate: "",
          Id: "",
        });
        setIsUpdating(false);
        await getAllbookList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.post("/deletebook", { Id: id });
      if (data?.Success) {
        alert(data?.Message);
        getAllbookList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelUpdate = (data) => {
    setBookForm({
      BookName: data?.BookName,
      BookTitle: data?.BookTitle,
      Author: data?.Author,
      SellingPrice: data?.SellingPrice,
      PublishDate: data?.PublishDate,
      Id: data?._id,
    });
    setIsUpdating(true);
  };

  return (
    <div className="w-full px-5 min-h-[calc(100vh-60px)]">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 my-4">
        {[
          { label: "Book Name", name: "BookName" },
          { label: "Book Title", name: "BookTitle" },
          { label: "Author", name: "Author" },
          { label: "Selling Price", name: "SellingPrice" },
          { label: "Publish Date", name: "PublishDate", type: "date" },
        ].map(({ label, name, type = "text" }) => (
          <div className="w-full flex flex-col gap-2" key={name}>
            <label>{label}</label>
            <input
              type={type}
              placeholder={label}
              className="w-full border border-gray-200 rounded-sm outline-none h-9 px-2 text-gray-800"
              name={name}
              value={bookForm[name]}
              onChange={handelFormChange}
            />
          </div>
        ))}
      </div>

      <div className="w-full flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-gray-700 text-white h-10 px-5 rounded-md hover:bg-gray-800 transition"
        >
          {isUpdating ? "Update" : "Submit"}
        </button>
      </div>

      <div className="w-full mt-10 overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Added min-width wrapper to preserve table layout and fix overflow on small screens */}
          <table className="w-full bg-white divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Book Name", "Book Title", "Author", "Selling Price", "Publish Date", "Actions"].map((col) => (
                  <th
                    key={col}
                    className="tracking-wider px-4 py-3 text-left font-medium text-gray-500 uppercase"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {booklist?.map((book, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-3 whitespace-nowrap">{book?.BookName}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{book?.BookTitle}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{book?.Author}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{book?.SellingPrice}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{book?.PublishDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => handelDelete(book._id)}
                        className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <MdDelete />
                      </button>
                      <button
                        onClick={() => handelUpdate(book)}
                        className="p-2 rounded bg-green-100 text-green-600 hover:bg-green-200"
                      >
                        <FaPen />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
