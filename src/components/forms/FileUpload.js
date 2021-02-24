import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const FileUploadFunction = (e) => {
    let files = e.target.files[0]; // 3
    let allUploadedFiles = values.images;
    const formData = new FormData()
    formData.append('image', files)

    const config = {
      headers: {
        authtoken: user ? user.token : "",
        'Content-Type': 'multipart/form-data',
      },
    }

    if (files) {
      setLoading(true);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`, formData, config
              )
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.error("IMAGE UPLOAD ERR", err);
              });
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    axios
      .delete(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="grid__flex">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="grid__flex">
        <label className="btn-text">
          Upload Album Cover File
          <input
            name="ImgUploader"
            type="file"
            
            hidden
            accept="images/*"
            onChange={FileUploadFunction}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
