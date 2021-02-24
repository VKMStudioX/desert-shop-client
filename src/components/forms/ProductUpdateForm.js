import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  // destructure
  const {
    artist,
    title,
    description,
    release,
    price,
    category,
    quantity,
    streaming
  } = values;

  return (
  <div className="grid__flex grid__flex--col grid__flex--white">
    <form>
      <div className="input-holder">
        <label>Artist</label>
        <input
          type="text"
          name="artist"
          className="input-3"
          value={artist}
          onChange={handleChange}
        />
      </div>

      <div className="input-holder">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="input-3"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="input-holder">
        <label>Release date</label>
        <input
          type="text"
          name="release"
          className="input-3"
          value={release}
          onChange={handleChange}
        />
      </div>

      <div className="input-holder">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="input-3"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="input-holder">
        <label>SpotifyAlbumID</label>
        <input
          type="text"
          name="streaming"
          className="input-3"
          value={streaming}
          onChange={handleChange}
        />
      </div>

      <div className="input-holder">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="input-3"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="input-holder">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="input-3"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="input-holder">
        <label>Category</label>
        <select
          name="category"
          className="input-3"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <br />
      <div className="grid__flex">
      <label className="btn-text">
          Save
          <input
            name="saveAlbum"
            type="button"
            hidden
            onClick={handleSubmit}
          />
        </label></div>
    </form>
  </div>
  );
};

export default ProductUpdateForm;
