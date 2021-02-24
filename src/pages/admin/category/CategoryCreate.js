import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import Loader from "../../../components/Loader"
import HeadingFull from "../../../components/HeadingFull";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <>
    <HeadingFull headingMarginTop={true}>Category Create</HeadingFull>
    {/* import HeadingFull from "../../../components/HeadingFull"; */}

    
        <div className="center-cards grid__shop">
          <AdminNav />
        

        <div>
          {loading ? (
            <Loader/>
          ) : (
            
            <div className="grid__flex grid__flex--col grid__flex--white">
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* step 5 */}
          {categories.filter(searched(keyword)).map((c) => (
            <div className="grid__flex grid__flex--row" key={c._id}>
              <div className="grid__flex">
              {c.name}
              </div>
              
                <DeleteOutlined onClick={() => handleRemove(c.slug)}  />
              <Link to={`/admin/category/${c.slug}`}>
                  <EditOutlined className="grid__flex--justify-self-end" />
              </Link></div>
            
          ))}
          </div>
          )}

</div>
</div>
 </>
  );
};

export default CategoryCreate;
