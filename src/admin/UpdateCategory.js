import React, { useState ,useEffect} from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import {getCategories, updateCategory}  from "./helper/adminapicall";

const UpdateCategory = ({match}) => {
    const { user, token } = isAuthenticated();
  
    const [values, setValues] = useState({
      name: "",
      categories: [],
      category: "",
      loading: false,
      error: "",
      createdCategory: "",
      getaRedirect: false,
      formData: ""
    });
  
    const {
      name,
      categories,
      category,
      loading,
      error,
      createdCategory,
      getaRedirect,
      formData
    } = values;
  
    const preload = (categoryId) => {
      getCategories(categoryId).then(data => {
        //console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          preloadCategories();
            setValues({
                ...values,
                name: data.name,
                category: data.category._id,
                formData: new FormData()
               
            });
        }
      });
    };
  
      const preloadCategories = () => {
          getCategories().then(data => {
              if (data.error) {
                  setValues({ ...values, error: data.error });
              }
              else
              {
                  setValues({
                      categories: data,
                      formData: new FormData()
                  });
              }
            
          });
    }
      
    useEffect(() => {
      preload(match.params.categoryId);
    }, []);
  
    
  //TODO:
    const onSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: "", loading: true });
      updateCategory(match.params.categoryId,user._id, token, formData).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            loading: false,
            createdCategory: data.name
          });
        }
      });
    };
  
    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
      };
    const errorMessage = () => (
      <div className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
    const successMessage = () => (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdCategory ? "" : "none" }}
      >
        <h4>{createdCategory} updated successfully</h4>
      </div>
    );
    
    const myCategoryForm = () => (
        <form>
          <div className="form-group">
            <p className="lead">Enter the category</p>
            <input
              type="text"
              className="form-control my-3"
              onChange={handleChange}
              value={name}
              autoFocus
              required
              placeholder="For Ex. summer"
            ></input>
            <button onClick={onSubmit} className="btn btn-outline-info">
              Create Category
            </button>
          </div>
        </form>
      );
  
    return (
      <Base
        title="Add a category here!"
        description="Welcome to category update section"
        className="container bg-info p-4"
      >
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
          Admin Home
        </Link>
        <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
           {errorMessage()}
            {successMessage()}
            {myCategoryForm()}
          </div>
        </div>
      </Base>
    );
  };
  
  export default UpdateCategory;
  