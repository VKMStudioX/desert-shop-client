import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import Loader from "../../../components/Loader"
import HeadingFull from "../../../components/HeadingFull";

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <>
    <HeadingFull headingMarginTop={true}>Category update</HeadingFull>
       
        <div className="center-cards grid__shop">
          <AdminNav />
    

        <div >
          {loading ? (
           <Loader/>
          ) : (
            <div className="grid__flex grid__flex--col grid__flex--white">
            <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          </div>
          )}
        </div>
      </div>
      </>
  );
};

export default CategoryUpdate;
