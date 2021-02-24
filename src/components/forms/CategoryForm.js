import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="input-holder">
      <label>Name</label>
      <input
        type="text"
        className="input-3"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
      </div>
      <div className="grid__flex u-margin-bottom-small">
      <label className="btn-text">
          Save
          <input
            name="newCat"
            type="submit"
            hidden
          />
        </label></div>
    
  </form>
);

export default CategoryForm;
