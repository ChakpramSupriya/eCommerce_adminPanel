import { createProduct } from "@/api/addProduct";
import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SelectOptionWithSearch } from "../ComboBox";
import FormItem from "../form/FormItem";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { queryMutationKeys } from "@/constants/queryMutationKeys";

const categories = [
  { label: "Category 1", value: "category 1" },
  { label: "Category 2", value: "category 2" },
  { label: "Category 3", value: "category 3" },
  { label: "Category 4", value: "category 4" },
  { label: "Category 5", value: "category 5" },
];

const AddProduct = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [sizelength, setSizelength] = useState("");
  const [sizewidth, setSizewidth] = useState("");
  const [image, setImage] = useState([]);
  const [openCategorySelector, setOpenCategorySelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationKey: queryMutationKeys.addProduct,
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product added successfully");
    },
    onError: (error) => {
      toast.error(`Failed to add product: ${error.message}`);
    },
  });

  const handleFileChange = (event) => {
    setImage(event.target.files);
  };

  const calculateDiscountedPrice = () => {
    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;
    setDiscountedPrice(finalPrice);
  };

  useEffect(() => {
    if (price && discount) {
      calculateDiscountedPrice();
    }
  }, [price, discount]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const addProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("category", selectedCategory.value);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("discountedPrice", discountedPrice);
    formData.append("quantity", quantity);
    formData.append("sizelength", sizelength);
    formData.append("sizewidth", sizewidth);

    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]);
    }

    mutate(formData);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <form
        className="shadow-xl rounded-lg m-5 p-5 w-full"
        onSubmit={addProduct}
      >
        <h1 className="text-gray-800 text-3xl font-bold tracking-wide my-5">
          Add Product
        </h1>
        <div className="grid gap-2">
          <FormItem>
            <label className="text-gray-700" htmlFor="productImage">
              Upload Product Image
            </label>
            <Input
              id="productImage"
              name="productImage"
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </FormItem>
          <FormItem>
            <label className="text-gray-700" htmlFor="productName">
              Product Name
            </label>
            <Input
              id="productName"
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <label className="text-gray-700" htmlFor="price">
              Price
            </label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <label className="text-gray-700" htmlFor="discount">
              Discount (%)
            </label>
            <Input
              type="number"
              id="discount"
              name="discount"
              placeholder="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <label className="text-gray-700" htmlFor="discountedPrice">
              Discounted Price
            </label>
            <Input
              type="number"
              id="discountedPrice"
              name="discountedPrice"
              value={discountedPrice}
              readOnly
            />
          </FormItem>
          <FormItem>
            <label className="text-gray-700" htmlFor="quantity">
              Quantity
            </label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="quantity"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <label className="text-gray-700" htmlFor="sizeLength">
              Size Length
            </label>
            <Input
              id="sizeLength"
              name="sizeLength"
              type="text"
              placeholder="sizelength"
              value={sizelength}
              onChange={(e) => setSizelength(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <label className="text-gray-700" htmlFor="sizeWidth">
              Size Width
            </label>
            <Input
              id="sizeWidth"
              name="sizeWidth"
              type="text"
              placeholder="sizewidth"
              value={sizewidth}
              onChange={(e) => setSizewidth(e.target.value)}
            />
          </FormItem>

          <FormItem>
            <label className="text-gray-700" htmlFor="category">
              Category
            </label>
            <SelectOptionWithSearch
              open={openCategorySelector}
              selectedStatus={selectedCategory}
              placeholder={"Please select a category"}
              data={categories}
              setOpen={setOpenCategorySelector}
              setSelectedStatus={setSelectedCategory}
            />
          </FormItem>
          <FormItem>
            <label className="text-gray-700" htmlFor="description">
              Description
            </label>
            <Textarea
              name="description"
              id="description"
              cols={50}
              rows={4}
              placeholder="About Product"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormItem>
          <Button disabled={isPending} type="submit" className="my-10">
            {isPending ? "Please wait..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
