import { fetchCategories } from "@/api/addProduct";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { SelectOptionWithSearch } from "../ComboBox";
import FormItem from "../form/FormItem";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Box, Button, NativeSelect } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { fetchSubCategories } from "@/api/subcategory";

const AddProduct = () => {
  const [isPending, setIsPending] = useState();
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
  const [openSubCategorySelector, setOpenSubCategorySelector] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [filteredSubcategoryList, setFilteredSubCategoryList] = useState([]);
  const [isProductForKids, setIsProductForKids] = useState();
  const [sex, setSex] = useState(null);

  const {
    data: categorylist,
    isLoading: isLoadingCategories,
    isError: isCategoryError,
    error: categoryError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
  });

  // Fetching subcategories based on selected category
  const { data: subcategorylist = [], isLoading: isLoadingSubcategories } =
    useQuery({
      queryKey: ["subcategory", selectedCategory?.value],
      queryFn: () => fetchSubCategories(selectedCategory.value),
      enabled: !!selectedCategory, // Only fetch when a category is selected
    });

  // console.log(subcategorylist);
  // const { mutate, isPending } = useMutation({
  //   mutationKey: queryMutationKeys.addProduct,
  //   mutationFn: createProduct,
  //   onSuccess: () => {
  //     toast.success("Product added successfully");
  //   },
  //   onError: (error) => {
  //     toast.error(`Failed to add product: ${error.message}`);
  //   },
  // });

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

  // Filtering subcategories based on selected category
  useEffect(() => {
    if (selectedCategory && Array.isArray(subcategorylist)) {
      const filteredSubcategories = subcategorylist.filter(
        (subcategory) => subcategory.category === selectedCategory.value
      );
      setFilteredSubCategoryList(filteredSubcategories);
    } else {
      setFilteredSubCategoryList([]);
    }
  }, [selectedCategory, subcategorylist]);

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
    formData.append("subcategory", selectedSubCategory?.value);
    formData.append("sex", sex);
    formData.append("isProductForKids", isProductForKids);

    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]);
    }

    mutate(formData);
  };
  if (isLoadingCategories) return "Loading categories...";
  if (isCategoryError)
    return `Error loading categories: ${categoryError.message}`;

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        className="fixed"
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <ScrollArea type="always">
        <Box w={900}>
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
                  selectedStatus={selectedCategory}
                  placeholder={"Please select a category"}
                  data={categorylist?.categories.map((category) => ({
                    label: category.name,
                    value: category._id,
                  }))}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  setSelectedStatus={setSelectedCategory}
                  // onChange={e.target.value}
                  value={selectedCategory}
                  open={openCategorySelector}
                  setOpen={setOpenCategorySelector}
                />
              </FormItem>
              <FormItem>
                <label className="text-gray-700" htmlFor="subcategory">
                  Sub Categories
                </label>
                <SelectOptionWithSearch
                  selectedStatus={selectedSubCategory}
                  placeholder={"Please select a subcategory"}
                  data={filteredSubcategoryList.map((subcategory) => ({
                    label: subcategory.subCategoryName,
                    value: subcategory._id,
                  }))}
                  onChange={(e) => setSelectedSubCategory(e)}
                  setSelectedStatus={setSelectedSubCategory}
                  value={selectedSubCategory}
                  open={openSubCategorySelector}
                  setOpen={setOpenSubCategorySelector}
                />
              </FormItem>
              <FormItem>
                <label className="text-gray-700" htmlFor="isProductForKids">
                  Is Product For Kids
                </label>
                <NativeSelect
                  value={isProductForKids}
                  onChange={(e) => setIsProductForKids(e.target.value)}
                  data={["False", "True"]}
                />
              </FormItem>
              <FormItem>
                <label className="text-gray-700" htmlFor="sex">
                  Sex
                </label>
                <NativeSelect
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  data={["Male", "Female"]}
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
        </Box>
      </ScrollArea>
    </div>
  );
};

export default AddProduct;
