"use client";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
];
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DatePicker,
} from "@nextui-org/react";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function DataTable({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    // onClose()
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-4xl font-semibold text-gray-900">Books</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their title,
            author and created at.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button color="primary" radius="none" onPress={onOpen}>
            Open Modal
          </Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Created By
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {item.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.author}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.publishYear}
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 space-x-3">
                      <button className="border border-blue-500 p-2">
                        <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                      </button>
                      <button className="border border-red-400 p-2">
                        <TrashIcon className="h-5 w-5 text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="none">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Add Book
              </ModalHeader>
              <ModalBody>
                <Input
                  radius="none"
                  type="text"
                  label="Book Title"
                  name="title"
                  placeholder="Enter Book Title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <Input
                  radius="none"
                  type="text"
                  label="Book Author"
                  name="author"
                  placeholder="Enter name"
                  value={formData.author}
                  onChange={handleChange}
                />
                <DatePicker
                  radius="none"
                  name="publishYear"
                  label="Created At"
                  //   value={formData?.publishYear || '03/23/2024'}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  className="bg-red-100"
                  radius="none"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button color="primary" radius="none" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
