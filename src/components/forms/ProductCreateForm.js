import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
}) => {
  // destructure
  const {
    artist,
    release,
    title,
    description,
    price,
    categories,
    subs,
    quantity,
    streaming
  } = values;

  return (

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
        >
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {showSub && (
        <div className="input-holder">
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

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
  );
};

export default ProductCreateForm;
