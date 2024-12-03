import { createProductPost } from "@/api/addProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import FormItem from "../form/FormItem";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Box, Button, Loader, NativeSelect } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { fetchSubCategories } from "@/api/subcategory";
import { Select } from "@mantine/core";
import { fetchCollection } from "@/api/collection";
import { toast } from "react-toastify";
import { fetchCategory } from "@/api/Category";
import { fetchProducts, updateProduct } from "@/api/product";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
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
  const [isProductForKids, setIsProductForKids] = useState();
  const [gender, setGender] = useState(null);
  const [category, setCategory] = useState(null);
  const [collection, setCollection] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subList, setSubList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("");
  // const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();
  const { id } = useParams();
  //get
  const { data: productlist } = useQuery({
    queryKey: ["productdata"],
    queryFn: fetchProducts,
  });
  const {
    data: categorylist,
    isLoading: isLoadingCategories,
    isError: isCategoryError,
    error: categoryError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  useEffect(() => {
    const fetchSubcategoriesForCategory = async () => {
      if (category) {
        try {
          const subcategoriesData = await fetchSubCategories(category);
          setSubList(subcategoriesData);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      }
    };
    fetchSubcategoriesForCategory();
  }, [category]);

  // console.log("categorylist", subList);
  const { data: collectionlist } = useQuery({
    queryKey: ["collection"],
    queryFn: fetchCollection,
  });
  // console.log("collection", collectionlist);

  const handleChangeCategory = (categoryId) => {
    // console.log("category", categoryId);
    const selectedCategoryName = categorylist?.categories?.find(
      (category) => category._id === categoryId
    );
    if (selectedCategoryName) {
      setSelectedCategory(selectedCategoryName.name);
      setCategory(categoryId);
    }
  };

  const handleChangeSubCategory = (subCategoryId) => {
    // console.log("subcategory", subCategoryId);
    const selectedSubCategoryName = subList?.subCategory?.find(
      (subcategory) => subcategory._id === subCategoryId
    );
    if (selectedSubCategoryName) {
      setSelectedSubCategoryName(selectedSubCategoryName.subCategoryName);
      setSubCategory(subCategoryId);
    }
  };
  const handleChangeCollection = (collectionId) => {
    const collectionName = collectionlist?.collection.find(
      (collection) => collection._id === collectionId
    );
    if (collectionName) {
      setCollectionName(collectionName.name);
      setCollection(collectionName._id);
    }
    // console.log("collectionId", collectionId);
  };

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

  const { mutate: handleSubmitUpdateProduct } = useMutation({
    mutationKey: ["updateproduct", id],
    mutationFn: (formData) => updateProduct(id, formData),
    onSuccess: () => {
      toast.success("Product added successfully");
      queryClient.invalidateQueries({ queryKey: ["productdata"] });
    },
    onError: (error) => {
      toast.error(`Failed to add product: ${error.message}`);
    },
  });
  useEffect(() => {
    if (productlist) {
      const product = productlist?.products.find(
        (product) => product._id === id
      );
      if (product) {
        console.log("product", product);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setDiscount(product.discount);
        setDiscountedPrice(product.discountedPrice);
        setQuantity(product.productquantity);
        setSizelength(product.sizelength);
        setSizewidth(product.sizewidth);
        setGender(product.gender);
        setIsProductForKids(product.isProductForKids);
        setCategory(product.category._id);
        setCollection(product.collection._id);
        setSubCategory(product.subcategory._id);
        setImage(product.image_id);

        // setSubCategory(product.subcategories);
        // setCategory(product.category); // Assuming `category` object contains `_id`
        // setSubCategory(product.subcategories); // Assuming subcategory is an object with `_id`
        // setCollection(product.collection); // Assuming collection contains `_id`
        // setSelectedCategory(product.category);
      }
    }
  }, [productlist, id]);
  console.log(category);
  console.log("collectionName", collection);
  console.log("Subcategory", subCategory);
  console.log("image", image);
  //update
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("discountedPrice", discountedPrice);
    formData.append("productquantity", quantity);
    formData.append("sizelength", sizelength);
    formData.append("sizewidth", sizewidth);
    formData.append("gender", gender);
    formData.append("isProductForKids", isProductForKids);
    formData.append("category", category);
    formData.append("collection", collection);
    formData.append("subcategory", subCategory);

    for (let i = 0; i < image.length; i++) {
      formData.append("image_id", image[i]);
      console.log("image_id", image[i].size);
    }
    console.log("FormData Contents:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    handleSubmitUpdateProduct({ _id: id, formData });
  };

  if (isLoadingCategories)
    return (
      <div className="flex justify-center items-center  h-64">
        <Loader />
      </div>
    );
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
      <ScrollArea type="never">
        <Box>
          <form
            className="shadow-xl rounded-lg m-5 p-5 w-full"
            onSubmit={handleUpdateProduct}
          >
            <h1 className="text-gray-800 text-3xl font-bold tracking-wide my-5">
              Update Product
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
                <Select
                  placeholder="Please select a category"
                  data={categorylist?.categories?.map((category) => ({
                    label: category.name,
                    value: category._id,
                  }))}
                  value={category}
                  onChange={handleChangeCategory}
                />
              </FormItem>
              <FormItem>
                <label className="text-gray-700" htmlFor="subcategory">
                  Sub Categories
                </label>

                <Select
                  placeholder="Please select a subcategory"
                  data={subList?.subCategory?.map((subcategory) => ({
                    label: subcategory.subCategoryName,
                    value: subcategory._id,
                  }))}
                  value={subCategory}
                  disabled={!category || subList?.length === 0}
                  onChange={handleChangeSubCategory} // Disable if no category is selected
                />
              </FormItem>
              <FormItem>
                <label className="text-gray-700" htmlFor="category">
                  Collection
                </label>
                <Select
                  placeholder={"Please select a collection"}
                  data={collectionlist?.collection?.map((collection) => ({
                    label: collection.name,
                    value: collection._id,
                    // setCollection: collection,
                  }))}
                  value={collection}
                  onChange={handleChangeCollection}
                />
              </FormItem>
              <FormItem>
                <label className="text-gray-700" htmlFor="isProductForKids">
                  Is Product For Kids
                </label>
                <NativeSelect
                  value={isProductForKids ? "true" : "false"}
                  onChange={(e) =>
                    setIsProductForKids(e.target.value === "true")
                  }
                  data={[
                    { value: "false", label: "No" },
                    { value: "true", label: "Yes" },
                  ]}
                />
              </FormItem>

              <FormItem>
                <label className="text-gray-700" htmlFor="sex">
                  Gender
                </label>
                <NativeSelect
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  data={["", "Male", "Female", "Neutral"]}
                  placeholder="Select Gender"
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
                {isPending ? "Please wait..." : "Update Product"}
              </Button>
            </div>
          </form>
        </Box>
      </ScrollArea>
    </div>
  );
};

export default UpdateProduct;
